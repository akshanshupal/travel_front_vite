import { DefaultLayout } from "@/layouts/DefaultLayout";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { Badge } from "@/components/base/badges/badges";
import { useStoreSnackbar } from "@/store/snackbar";
import { useAccess } from "@/hooks/use-access";
import { addMailTemplate } from "@/utils/services/mailtemplateService";
import { getFileUploadUrl } from "@/utils/services/fileService";
import { ArrowLeft, Plus, Trash01, X } from "@untitledui/icons";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function TemplateAddPage() {
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const { can } = useAccess();
    const canAdd = can("template", "add");
    const [isLoading, setIsLoading] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const formRef = useRef<HTMLFormElement>(null);
    const breadcrumbsList = useMemo(
        () => [
            { label: "Settings", link: "/additional-data/settings/template" },
            { label: "Template", link: "/additional-data/settings/template" },
            { label: "Add" },
        ],
        [],
    );

    const [formData, setFormData] = useState({
        title: "",
        website: "",
        hotlineNumber: "",
        mailId: [] as string[],
        logo: null as File | string | null,
        userIcon: null as File | string | null,
        emailIcon: null as File | string | null,
        paymentType: [] as { paymentTitle: string; paymentImage: File | string | null; url: string }[],
        disclaimer: "",
    });

    const stripHtmlTags = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '').trim();
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.website) newErrors.website = "Website is required";
        if (!formData.hotlineNumber) newErrors.hotlineNumber = "Hotline Number is required";
        if (formData.mailId.length === 0) newErrors.mailId = "At least one Mail ID is required";
        if (!formData.logo) newErrors.logo = "Logo is required";
        if (!formData.emailIcon) newErrors.emailIcon = "Email Icon is required";
        if (!formData.userIcon) newErrors.userIcon = "User Icon is required";
        if (!formData.disclaimer || !stripHtmlTags(formData.disclaimer)) newErrors.disclaimer = "Disclaimer is required";

        formData.paymentType.forEach((item, index) => {
            if (!item.paymentTitle) newErrors[`paymentTitle${index}`] = "Payment Title is required";
            if (!item.paymentImage) newErrors[`paymentImage${index}`] = "Image is required";
            if (!item.url) newErrors[`url${index}`] = "URL is required";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const handlePaymentChange = (index: number, key: string, value: any) => {
        const updatedPaymentType = [...formData.paymentType];
        updatedPaymentType[index] = { ...updatedPaymentType[index], [key]: value };
        setFormData(prev => ({ ...prev, paymentType: updatedPaymentType }));
        
        const errorKey = `${key}${index}`;
        if (errors[errorKey]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[errorKey];
                return newErrors;
            });
        }
    };

    const addPaymentMethod = () => {
        setFormData(prev => ({
            ...prev,
            paymentType: [...prev.paymentType, { paymentTitle: "", paymentImage: null, url: "" }]
        }));
    };

    const removePaymentMethod = (index: number) => {
        setFormData(prev => ({
            ...prev,
            paymentType: prev.paymentType.filter((_, i) => i !== index)
        }));
    };

    const addNewEmail = () => {
        if (currentEmail && !formData.mailId.includes(currentEmail)) {
            setFormData(prev => ({
                ...prev,
                mailId: [...prev.mailId, currentEmail]
            }));
            setCurrentEmail("");
            if (errors.mailId) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.mailId;
                    return newErrors;
                });
            }
        }
    };

    const removeEmail = (email: string) => {
        setFormData(prev => ({
            ...prev,
            mailId: prev.mailId.filter(id => id !== email)
        }));
    };

    const uploadFile = async (file: File | string | null) => {
        if (!file || typeof file === "string") return file;
        const fd = new FormData();
        fd.append("fmFile", file, file.name);
        const res = await getFileUploadUrl(fd);
        return res?.data || res?.url || res;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canAdd) return;
        if (!validateForm()) {
            showSnackbar({ title: "Error", description: "Please fix the errors in the form", color: "danger" });
            return;
        }

        setIsLoading(true);
        try {
            const logoUrl = await uploadFile(formData.logo);
            const emailIconUrl = await uploadFile(formData.emailIcon);
            const userIconUrl = await uploadFile(formData.userIcon);
            
            const paymentTypeWithUrls = await Promise.all(
                formData.paymentType.map(async (item) => ({
                    ...item,
                    paymentImage: await uploadFile(item.paymentImage)
                }))
            );

            const finalData = {
                ...formData,
                logo: logoUrl,
                emailIcon: emailIconUrl,
                userIcon: userIconUrl,
                paymentType: paymentTypeWithUrls,
            };

            const response = await addMailTemplate(finalData);
            if (response && !response.error) {
                showSnackbar({ title: "Success", description: "Template added successfully", color: "success" });
                navigate("/additional-data/settings/template");
            } else {
                throw new Error(response.error || "Failed to add template");
            }
        } catch (error: any) {
            console.error("Error adding template:", error);
            showSnackbar({ title: "Error", description: error.message || "Failed to add template", color: "danger" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DefaultLayout>
            <div className="space-y-4">
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Add Template"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/additional-data/settings/template")}>
                                    Back
                                </Button>
                                <Button color="primary" isLoading={isLoading} isDisabled={!canAdd} onClick={() => formRef.current?.requestSubmit()}>
                                    Save
                                </Button>
                            </div>
                        }
                    />

                    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-primary px-4 py-5 md:px-6 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" isRequired>Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter template title"
                                value={formData.title}
                                onChange={(val) => handleChange("title", val)}
                                isInvalid={!!errors.title}
                                hint={errors.title}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="website" isRequired>Website</Label>
                            <Input
                                id="website"
                                placeholder="Enter website URL"
                                value={formData.website}
                                onChange={(val) => handleChange("website", val)}
                                isInvalid={!!errors.website}
                                hint={errors.website}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="hotlineNumber" isRequired>Hotline Number</Label>
                            <Input
                                id="hotlineNumber"
                                placeholder="Enter hotline number"
                                value={formData.hotlineNumber}
                                onChange={(val) => handleChange("hotlineNumber", val)}
                                isInvalid={!!errors.hotlineNumber}
                                hint={errors.hotlineNumber}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label isRequired>Mail IDs</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter email address"
                                    value={currentEmail}
                                    onChange={(val) => setCurrentEmail(val)}
                                    isInvalid={!!errors.mailId}
                                />
                                <Button type="button" onClick={addNewEmail}>Add</Button>
                            </div>
                            {errors.mailId && <span className="text-xs text-error-primary">{errors.mailId}</span>}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.mailId.map((email) => (
                                    <Badge key={email} color="brand">
                                        {email}
                                        <button type="button" onClick={() => removeEmail(email)} className="ml-1 hover:text-error-primary">
                                            <X className="size-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label isRequired>Disclaimer</Label>
                            <RichTextEditor
                                value={formData.disclaimer}
                                onChange={(val) => handleChange("disclaimer", val)}
                            />
                            {errors.disclaimer && <span className="text-xs text-error-primary">{errors.disclaimer}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label isRequired>Logo</Label>
                                <FileUploadDropZone
                                    onDropFiles={(files) => handleChange("logo", files[0])}
                                    allowsMultiple={false}
                                    accept="image/*"
                                />
                                {formData.logo && typeof formData.logo !== 'string' && <span className="text-xs text-tertiary">Selected: {formData.logo.name}</span>}
                                {errors.logo && <span className="text-xs text-error-primary">{errors.logo}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label isRequired>Email Icon</Label>
                                <FileUploadDropZone
                                    onDropFiles={(files) => handleChange("emailIcon", files[0])}
                                    allowsMultiple={false}
                                    accept="image/*"
                                />
                                {formData.emailIcon && typeof formData.emailIcon !== 'string' && <span className="text-xs text-tertiary">Selected: {formData.emailIcon.name}</span>}
                                {errors.emailIcon && <span className="text-xs text-error-primary">{errors.emailIcon}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label isRequired>User Icon</Label>
                                <FileUploadDropZone
                                    onDropFiles={(files) => handleChange("userIcon", files[0])}
                                    allowsMultiple={false}
                                    accept="image/*"
                                />
                                {formData.userIcon && typeof formData.userIcon !== 'string' && <span className="text-xs text-tertiary">Selected: {formData.userIcon.name}</span>}
                                {errors.userIcon && <span className="text-xs text-error-primary">{errors.userIcon}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Label>Payment Options</Label>
                                <Button type="button" color="tertiary" size="sm" onClick={addPaymentMethod}>
                                    <Plus className="size-4" /> Add Payment
                                </Button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {formData.paymentType.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-4 p-4 border rounded-lg border-secondary relative">
                                        <button
                                            type="button"
                                            onClick={() => removePaymentMethod(index)}
                                            className="absolute top-2 right-2 text-tertiary hover:text-error-primary"
                                        >
                                            <Trash01 className="size-4" />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <Label isRequired>Title</Label>
                                                <Input
                                                    placeholder="Payment Title"
                                                    value={item.paymentTitle}
                                                    onChange={(val) => handlePaymentChange(index, "paymentTitle", val)}
                                                    isInvalid={!!errors[`paymentTitle${index}`]}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label isRequired>URL</Label>
                                                <Input
                                                    placeholder="Payment URL"
                                                    value={item.url}
                                                    onChange={(val) => handlePaymentChange(index, "url", val)}
                                                    isInvalid={!!errors[`url${index}`]}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label isRequired>Image</Label>
                                            <FileUploadDropZone
                                                onDropFiles={(files) => handlePaymentChange(index, "paymentImage", files[0])}
                                                allowsMultiple={false}
                                                accept="image/*"
                                            />
                                            {item.paymentImage && typeof item.paymentImage !== 'string' && <span className="text-xs text-tertiary">Selected: {item.paymentImage.name}</span>}
                                            {errors[`paymentImage${index}`] && <span className="text-xs text-error-primary">{errors[`paymentImage${index}`]}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    </form>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}

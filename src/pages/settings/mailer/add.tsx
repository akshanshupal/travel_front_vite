import { DefaultLayout } from "@/layouts/DefaultLayout";
import { TableCard } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import CustomEditor from "@/components/utils/CustomEditor";
import { CustomBreadscrumbs } from "@/components/application/breadcrumbs/custom-breadcrumbs";
import { useAvailableTableWidth } from "@/hooks/use-available-table-width";
import { useStoreSnackbar } from "@/store/snackbar";
import { addMailer } from "@/utils/services/mailerService";
import { getCompanyConfig } from "@/utils/services/userService";
import { ArrowLeft } from "@untitledui/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

type MailerForm = {
    title: string;
    host: string;
    email: string;
    password: string;
    emailFunction: string;
    subject: string;
    html: string;
    status: string;
};

type MailerTemplate = {
    title: string;
    emailFunction: string;
    subject: string;
    html: string;
    dynamicFields: string[];
};

export default function SettingsMailerAddPage() {
    const availableWidth = useAvailableTableWidth();
    const navigate = useNavigate();
    const { showSnackbar } = useStoreSnackbar();
    const subjectRef = useRef<HTMLTextAreaElement | null>(null);

    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [companyConfig, setCompanyConfig] = useState<any>(null);

    const [form, setForm] = useState<MailerForm>({
        title: "",
        host: "",
        email: "",
        password: "",
        emailFunction: "",
        subject: "",
        html: "",
        status: "true",
    });

    useEffect(() => {
        const run = async () => {
            try {
                const response: any = await getCompanyConfig({ populate: "company" });
                const resolved = response?.data ?? response;
                setCompanyConfig(Array.isArray(resolved) ? resolved[0] : resolved);
            } catch {
                setCompanyConfig(null);
            }
        };
        run();
    }, []);

    const templates = useMemo<MailerTemplate[]>(() => {
        const companyName = companyConfig?.company?.name || "Company";
        const companyEmail = companyConfig?.email || "";
        const companyAddress = companyConfig?.address || "";
        const companyLogo = companyConfig?.logo || "";

        return [
            {
                title: "Quotation Mail",
                emailFunction: "sendItineraryMail",
                subject: "Company Name Itinerary for Domestic Package -Ms Executive Name-Executive Mobile-Tour Date",
                html: `<div style="max-width: 600px; margin: 0 auto; text-align: center; border: 1px solid #ccc; padding: 20px;">
<h1 style="color: #555; font-size: 24px; font-weight: bold;">Here is the quotation you requested from us!!</h1>
<div style="margin: 20px 0;">
<button type="button" style="background-color: #1a73e8; color: #fff; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">
<a href="https://admin.thetripbliss.com/package-mail/test" style="color: #fff; text-decoration: none;"><span>Click here to View Package!!</span></a>
</button>
</div>
<p style="color: #1a73e8; font-size: 14px; margin-top: 0;">This package is valid for 24 Hrs. Freeze your Package by Paying immediately INR 5000/-</p>
<h2 style="color: #1a73e8; font-size: 20px; font-weight: bold;">Seal the deal now!</h2>
<p style="color: #333; font-size: 14px;">Make the payment today to get the best deal possible</p>
<div style="margin: 20px 0;">
<button type="button" style="background-color: #1a73e8; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">
<a href="https://thetripbliss.com/payment" style="color: #fff; text-decoration: none;">Pay Now</a>
</button>
</div>
<p style="color: #555; font-size: 14px; margin-top: 20px;">For any queries please contact your Travel Expert.</p>
<p style="color: #333; font-size: 14px;"><strong>Executive Name</strong><br/>Phone Number: +91 Executive Mobile<br/>Email: <a href="mailto:sales@thetripbliss" style="color: #1a73e8;">sales@thetripbliss</a></p>
</div>`,
                dynamicFields: [
                    "mobile",
                    "clientName",
                    "packageCost",
                    "tourDate",
                    "salesExecutive.name",
                    "salesExecutive.email",
                    "salesExecutive.mobile",
                    "clientItinerary.title",
                    "packageLink",
                ],
            },
            {
                title: "Welcome Mail",
                emailFunction: "sendWelcomeMail",
                subject: `🎉 Booking Confirmation - Booking ID: #bookingId |  ${companyName}`,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
<img src="${companyLogo}" alt="Company Logo" style="width: 120px; margin-bottom: 10px;">
<h1 style="color: #28a745; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Your Booking is Confirmed! 🎉</h1>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Package Id #packageId</p>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Thank you for choosing <strong>${companyName}</strong>.<br/>Your booking has been successfully confirmed.</p>
<p style="color: #555; font-size: 14px; margin-bottom: 20px;"><strong>Booking ID:</strong> #assignmentId <br/><strong>Booking Date:</strong> #bookingDate</p>
<div style="background: #f1f1f1; padding: 15px; border-radius: 8px; margin-top: 20px;">
<h2 style="color: #1a73e8; font-size: 18px; font-weight: bold; margin-bottom: 5px;">Meet Your Support Coordinator</h2>
<p style="color: #333; font-size: 14px; margin-bottom: 10px;">Hi Travelers, I'm <strong>#agentName</strong>, your dedicated Support Coordinator.</p>
<p style="color: #555; font-size: 14px; margin-bottom: 5px;"><strong>Contact:</strong> #agentNo<br/><strong>Email:</strong> <a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail}</a></p>
</div>
<p style="color: #555; font-size: 14px; margin-top: 15px;"><strong>${companyName}</strong><br/>Address: ${companyAddress}<br/>Email: <a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail}</a></p>
</div>
</div>`,
                dynamicFields: ["packageId", "assignmentId", "bookingDate", "agentName.name", "agentName.mobile"],
            },
            {
                title: "Payment Confirmation Mail",
                emailFunction: "sendPaymentMail",
                subject: `🎉 Payment Successful - Receipt #receiptNo | ${companyName} | #paymentDate`,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
<img src="${companyLogo}" alt="Company Logo" style="width: 120px; margin-bottom: 10px;">
<h1 style="color: #28a745; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Payment Successful!</h1>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Package Id #packageId</p>
<h1 style="color: #1a73e8; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Dear Mr #clientName,</h1>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Thank you for your payment.<br/>We have received your payment successfully.</p>
<button type="button" style="background-color: #1a73e8; color: #fff; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">
<a href="https://payments-receipt/paymentId" style="color: #fff; text-decoration: none;">Click here to View Payment Receipt</a>
</button>
<h2 style="color: #1a73e8; font-size: 20px; font-weight: bold; margin-top: 20px;">Need Assistance?</h2>
<p style="color: #333; font-size: 16px; margin-bottom: 10px;">If you have any questions, feel free to reach out to your Travel Expert.</p>
<p style="color: #555; font-size: 14px; margin-top: 15px;"><strong>${companyName}</strong><br/>Address: ${companyAddress}<br/>Email: <a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail}</a></p>
</div>
</div>`,
                dynamicFields: ["assignment.packageId", "assignment.clientName", "receiptNo", "paymentDate", "paymentReceipt"],
            },
            {
                title: "Booking Voucher Mail",
                emailFunction: "sendVoucherMail",
                subject: `🎉 Booking Voucher - #paymentVoucherId  | ${companyName}`,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
<img src="${companyLogo}" alt="Company Logo" style="width: 120px; margin-bottom: 10px;">
<h1 style="color: #28a745; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Your Package Voucher</h1>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Package Id #packageId</p>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Thank you for your Package voucher. Your transaction has been successfully completed.</p>
<button type="button" style="display: inline-block; background-color: #1a73e8; color: #fff; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: bold; text-decoration: none;">
<a href="/package-voucher/testId" style="color: #fff; text-decoration: none;">Click here to View Package Voucher</a>
</button>
<h2 style="color: #1a73e8; font-size: 20px; font-weight: bold; margin-top: 20px;">Need Assistance?</h2>
<p style="color: #333; font-size: 16px; margin-bottom: 10px;">If you have any questions, feel free to reach out to your Travel Expert.</p>
<p style="color: #555; font-size: 14px; margin-top: 15px;"><strong>${companyName}</strong><br/>Address: ${companyAddress}<br/>Email: <a href="mailto:${companyEmail}" style="color: #1a73e8;">${companyEmail}</a></p>
</div>
</div>`,
                dynamicFields: [
                    "packageId",
                    "assignmentId",
                    "packageVoucherLink",
                    "paymentVoucherId",
                    "title",
                    "bookingDate",
                    "tourDate",
                    "packageCost",
                    "mobile",
                    "email",
                    "noOfAdult",
                    "noOfRooms",
                    "noOfPackageDays",
                    "noOfPackageNights",
                    "packageLink",
                ],
            },
            {
                title: "Payment Reminder Mail",
                emailFunction: "sendPaymentReminderMail",
                subject: `⚠️ Payment Reminder - Package #assignmentId | ${companyName} | Due by #dueDate`,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
<img src="${companyLogo}" alt="Company Logo" style="width: 120px; margin-bottom: 10px;text-align: center;">
<h1 style="color: #e63946; font-size: 24px; font-weight: bold; margin-bottom: 10px;">Payment Reminder</h1>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">Package Id #packageId</p>
<h2 style="color: #1a73e8; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Dear Mr #clientName,</h2>
<p style="color: #333; font-size: 16px; margin-bottom: 20px;">We hope this email finds you well. This is a kind reminder that your payment for #assignmentId is due on <strong>#dueDate</strong>.</p>
<p style="color: #555; font-size: 14px; margin-top: 15px;"><strong>${companyName}</strong><br/>Address: ${companyAddress}<br/>Email: <a href="mailto:${companyEmail}" style="color: #1a73e8; text-decoration: none;">${companyEmail}</a></p>
</div>
</div>`,
                dynamicFields: ["packageId", "clientName", "assignmentId", "dueDate", "amount"],
            },
        ];
    }, [companyConfig]);

    const selectedTemplate = useMemo(() => templates.find((t) => t.title === form.title) || null, [form.title, templates]);

    const applyTemplate = (templateTitle: string) => {
        if (templateTitle === "__none__") {
            setForm((prev) => ({
                ...prev,
                title: "",
                emailFunction: "",
                subject: "",
                html: "",
            }));
            return;
        }
        const template = templates.find((t) => t.title === templateTitle);
        if (!template) {
            setForm((prev) => ({ ...prev, title: templateTitle }));
            return;
        }
        setForm((prev) => ({
            ...prev,
            title: template.title,
            emailFunction: template.emailFunction,
            subject: template.subject,
            html: template.html,
        }));
    };

    const insertTokenIntoSubject = (token: string) => {
        const el = subjectRef.current;
        if (!el) {
            setForm((prev) => ({ ...prev, subject: `${prev.subject}${token}` }));
            return;
        }
        const start = typeof el.selectionStart === "number" ? el.selectionStart : 0;
        const end = typeof el.selectionEnd === "number" ? el.selectionEnd : start;
        setForm((prev) => {
            const next = `${prev.subject.slice(0, start)}${token}${prev.subject.slice(end)}`;
            return { ...prev, subject: next };
        });
        setTimeout(() => {
            try {
                el.focus();
                const pos = start + token.length;
                el.selectionStart = pos;
                el.selectionEnd = pos;
            } catch {
                //
            }
        }, 0);
    };

    const handleDragStart = (event: React.DragEvent, field: string) => {
        event.dataTransfer.setData("text/plain", `[[${field}]]`);
    };

    const handleDrop = (event: React.DragEvent, target: "subject" | "html") => {
        event.preventDefault();
        const droppedText = event.dataTransfer.getData("text/plain");
        if (!droppedText) return;
        if (target === "subject") {
            insertTokenIntoSubject(droppedText);
            return;
        }
        setForm((prev) => ({ ...prev, html: `${prev.html}${droppedText}` }));
    };

    const insertToken = (field: string) => {
        const token = `[[${field}]]`;
        insertTokenIntoSubject(token);
    };

    const validate = () => {
        const next: Record<string, string> = {};
        if (!form.title.trim()) next.title = "Title is required";
        if (!form.host.trim()) next.host = "Host is required";
        if (!form.email.trim()) next.email = "Email is required";
        if (!form.subject.trim()) next.subject = "Subject is required";
        if (!form.password.trim()) next.password = "Password is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSave = async () => {
        setDirty({
            title: true,
            host: true,
            email: true,
            password: true,
            subject: true,
        });
        if (!validate()) return;
        if (saving) return;
        setSaving(true);
        try {
            const payload = {
                ...form,
                status: form.status === "true",
            };
            const response: any = await addMailer(payload);
            if (response?.error) throw new Error(response.error);
            showSnackbar({ title: "Success", description: "Mailer added successfully", color: "success" });
            navigate("/settings/mailer");
        } catch (error: any) {
            showSnackbar({ title: "Error", description: error?.message || "Failed to add mailer", color: "danger" });
        } finally {
            setSaving(false);
        }
    };

    const breadcrumbsList = [
        { label: "Settings", link: "/settings/mailer" },
        { label: "Mailer", link: "/settings/mailer" },
        { label: "Add" },
    ];

    return (
        <DefaultLayout>
            <div className="space-y-4" style={{ width: availableWidth }}>
                <CustomBreadscrumbs list={breadcrumbsList} />
                <TableCard.Root>
                    <TableCard.Header
                        title="Add Mailer"
                        contentTrailing={
                            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:justify-end">
                                <Button color="secondary" iconLeading={ArrowLeft} onClick={() => navigate("/settings/mailer")}>
                                    Back
                                </Button>
                                <Button color="primary" onClick={handleSave} isDisabled={saving}>
                                    {saving ? "Saving..." : "Submit"}
                                </Button>
                            </div>
                        }
                    />
                    <div className="space-y-6 bg-primary px-4 py-5 md:px-6">
                        <div className="grid grid-cols-1 gap-2">
                            <Select
                                label="Mail Title"
                                selectedKey={form.title || "__none__"}
                                onSelectionChange={(key) => applyTemplate(String(key))}
                                items={[
                                    { id: "__none__", label: "Select Mailer" },
                                    ...templates.map((t) => ({ id: t.title, label: t.title })),
                                ]}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                            {dirty.title && errors.title ? <p className="text-xs text-error">{errors.title}</p> : null}
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row">
                            <div
                                className="flex-1 rounded-lg border border-secondary bg-secondary p-4"
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={(event) => handleDrop(event, "html")}
                            >
                                <CustomEditor value={form.html} onContentChange={(value) => setForm((prev) => ({ ...prev, html: value }))} />

                                <div className="mt-4">
                                    <Label isRequired>Subject</Label>
                                    <textarea
                                        ref={(node) => {
                                            subjectRef.current = node;
                                        }}
                                        className="w-full rounded-lg bg-primary px-3.5 py-3 text-md text-primary shadow-xs ring-1 ring-primary ring-inset placeholder:text-placeholder focus:outline-hidden focus:ring-2 focus:ring-brand"
                                        placeholder="Enter subject"
                                        value={form.subject}
                                        onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                                        onDragOver={(event) => event.preventDefault()}
                                        onDrop={(event) => handleDrop(event, "subject")}
                                        rows={2}
                                    />
                                    {dirty.subject && errors.subject ? <p className="text-xs text-error mt-1">{errors.subject}</p> : null}
                                </div>
                            </div>

                            <div className="w-full rounded-lg border border-secondary bg-secondary p-4 md:w-[380px]">
                                <div className="text-sm font-semibold text-primary">Dynamic Fields</div>
                                <div className="mt-3 space-y-2">
                                    {(selectedTemplate?.dynamicFields || []).length > 0 ? (
                                        selectedTemplate!.dynamicFields.map((field, index) => (
                                            <div
                                                key={field}
                                                draggable
                                                onDragStart={(event) => handleDragStart(event, field)}
                                                onClick={() => insertToken(field)}
                                                className="cursor-grab rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-tertiary shadow-xs hover:bg-secondary"
                                            >
                                                <span className="font-medium">{index + 1}:</span> {`[[${field}]]`}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-tertiary">No dynamic fields available.</div>
                                    )}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge size="sm" color="gray">
                                        Drag to Subject/HTML
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Host"
                                placeholder="Enter host"
                                value={form.host}
                                onChange={(value) => setForm((prev) => ({ ...prev, host: value }))}
                                isInvalid={Boolean(dirty.host && errors.host)}
                                hint={dirty.host && errors.host ? errors.host : undefined}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                                isInvalid={Boolean(dirty.email && errors.email)}
                                hint={dirty.email && errors.email ? errors.email : undefined}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter password"
                                value={form.password}
                                type="password"
                                onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
                                isInvalid={Boolean(dirty.password && errors.password)}
                                hint={dirty.password && errors.password ? errors.password : undefined}
                            />
                            <Select
                                label="Status"
                                selectedKey={form.status}
                                onSelectionChange={(key) => setForm((prev) => ({ ...prev, status: String(key) }))}
                                items={[
                                    { id: "true", label: "Active" },
                                    { id: "false", label: "Inactive" },
                                ]}
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                    </div>
                </TableCard.Root>
            </div>
        </DefaultLayout>
    );
}

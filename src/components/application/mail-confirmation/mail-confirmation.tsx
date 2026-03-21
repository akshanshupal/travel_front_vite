import { useEffect, useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useStoreSnackbar } from "@/store/snackbar";
import {
    getSentMailById,
    sendItineraryMail,
    sendVoucherMail,
    sendPaymentMail,
    sendAssignmentMail,
    sendPaymentReminderMail,
    sendWelcomeMail,
} from "@/utils/services/mailService";
import { RichTextEditor } from "@/components/application/rich-text-editor/rich-text-editor";
import { Table } from "@/components/application/table/table";

interface MailConfirmationProps {
    email?: string;
    selectedId: string;
    modalClose: () => void;
    sendMailFnName: string;
    mailAddData?: any[];
    showPreview?: boolean;
    header?: string;
}

const mailFunctions: Record<string, any> = {
    sendItineraryMail,
    sendPaymentMail,
    sendVoucherMail,
    sendAssignmentMail,
    sendPaymentReminderMail,
    sendWelcomeMail,
};

export default function MailConfirmation({
    email,
    selectedId,
    modalClose,
    sendMailFnName,
    mailAddData,
    showPreview,
    header,
}: MailConfirmationProps) {
    const { showSnackbar } = useStoreSnackbar();
    const [data, setData] = useState<any>(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showHtmlData, setShowHtmlData] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        email: "",
    });
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [tabBtn, setTabBtn] = useState("Send Mail");
    const [mailScreen, setMailScreen] = useState<"input" | "preview">("input");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isEmailEmpty = !formData.email?.trim();
    const mailFields = mailAddData ?? [];
    const additionalFieldValidationErrors = mailFields.reduce<Record<string, string | null>>((acc, field) => {
        const fieldName = Object.keys(field)[0];
        const fieldType = field.type || "text";
        const label = fieldName
            .replace(/([A-Z])/g, " $1")
            .trim()
            .replace(/^./, (str) => str.toUpperCase());
        const value = formData[fieldName];
        const stringValue = String(value ?? "").trim();
        const isEmpty = stringValue.length === 0;
        const isNumberField = fieldType === "number";
        const required = Boolean(field.required);

        if (required && isEmpty) {
            acc[fieldName] = `${label} is required`;
            return acc;
        }

        if (isNumberField && !isEmpty) {
            const numericValue = Number(value);
            if (Number.isNaN(numericValue) || numericValue <= 0) {
                acc[fieldName] = `${label} must be greater than 0`;
                return acc;
            }
        }

        acc[fieldName] = null;
        return acc;
    }, {});
    const additionalFieldErrors = mailFields.reduce<Record<string, string | null>>((acc, field) => {
        const fieldName = Object.keys(field)[0];
        const errorMessage = additionalFieldValidationErrors[fieldName];
        acc[fieldName] = touchedFields[fieldName] ? errorMessage : null;
        return acc;
    }, {});
    const hasAdditionalFieldErrors = Object.values(additionalFieldValidationErrors).some(Boolean);
    const emailTouched = Boolean(touchedFields.email);
    const emailError = emailTouched
        ? isEmailEmpty
            ? "Recipient Email is required"
            : !isEmailValid
              ? "Please enter a valid email address"
              : null
        : null;
    const shouldDisableActions = isEmailEmpty || !isEmailValid || hasAdditionalFieldErrors;

    const handleChange = (key: string, value: string) => {
        setTouchedFields((prevData) => ({
            ...prevData,
            [key]: true,
        }));
        setFormData((prevData: any) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleChangeMailContent = (key: string, value: string) => {
        setShowHtmlData((prevData: any) => {
            if (prevData?.[key] === value) return prevData;
            return {
                ...prevData,
                [key]: value,
            };
        });
    };

    useEffect(() => {
        if (mailAddData && mailAddData.length > 0) {
            setFormData((prevData: any) => {
                const newFormData = { ...prevData };
                mailAddData.forEach((field) => {
                    const fieldName = Object.keys(field)[0];
                    if (!(fieldName in newFormData)) {
                        newFormData[fieldName] = "";
                    }
                });
                return newFormData;
            });
        }
    }, [mailAddData]);

    useEffect(() => {
        if (email) {
            setFormData({ email: email });
        }
    }, [email]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const params = {
                    totalCount: true,
                    limit: "all",
                    emailFunction: sendMailFnName, // Use the passed function name
                    modelId: selectedId,
                };

                const response: any = await getSentMailById(params);
                setData(response || []);
                setTotalRecords(response?.totalCount || 0);
            } catch (error: any) {
                console.error("Error fetching mail history:", error);
                showSnackbar({
                    description: error.message,
                    title: "Invalid Input",
                    color: "danger",
                });
            } finally {
                setIsLoading(false);
            }
        };
        if (selectedId && tabBtn === "Mail History") {
            fetchData();
        }
    }, [selectedId, tabBtn, sendMailFnName]);

    const showPreviewFunction = async () => {
        setIsLoading(true);
        try {
            if (!mailFunctions[sendMailFnName]) {
                throw new Error("Invalid mail type");
            }
            const response = await mailFunctions[sendMailFnName](selectedId, { ...formData, showPreview: showPreview });
            debugger
            if (response) {
                setShowHtmlData(response);
                setMailScreen("preview");
            }
        } catch (error: any) {
            console.error("Error sending mail:", error);
            showSnackbar({ description: error.message, title: "Error", color: "danger" });
            modalClose();
        } finally {
            setIsLoading(false);
        }
    };

    const sendDirectly = async () => {
        setIsLoading(true);
        try {
            if (!mailFunctions[sendMailFnName]) {
                throw new Error("Invalid mail type");
            }

            // 1. Generate the content (same as preview)
            const previewResponse = await mailFunctions[sendMailFnName](selectedId, { ...formData, showPreview: true });
            if (!previewResponse || !previewResponse.html) {
                throw new Error("Failed to generate email content");
            }

            // 2. Send immediately
            await mailFunctions[sendMailFnName](selectedId, {
                ...formData,
                html: previewResponse.html,
                subject: previewResponse.subject,
            });

            modalClose();
            showSnackbar({ description: "Email sent successfully", title: "Success", color: "success" });
        } catch (error: any) {
            showSnackbar({ description: error.message, title: "Error", color: "danger" });
            modalClose();
        } finally {
            setIsLoading(false);
        }
    };

    const sendEmail = async () => {
        setIsLoading(true);
        try {
            if (!mailFunctions[sendMailFnName]) {
                throw new Error("Invalid mail type");
            }

            await mailFunctions[sendMailFnName](selectedId, {
                ...formData,
                html: showHtmlData?.html,
                subject: showHtmlData?.subject,
            });
            modalClose();
            showSnackbar({ description: "Email sent successfully", title: "Success", color: "success" });
        } catch (error: any) {
            console.error("Error sending mail:", error);
            showSnackbar({ description: error.message, title: "Error", color: "danger" });
            modalClose();
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        //dd-mmm-yyyy hh:mm:ss
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const mailHistorySkeletonRows = Array.from({ length: 1 }).map((_, index) => ({ id: `mail-history-skeleton-${index}` }));

    return (
        <div className="flex w-full flex-col gap-6">
            {header && <div className="text-lg font-semibold text-primary">{header}</div>}
            <div className="flex w-full">
                <ButtonGroup
                    selectedKeys={[tabBtn]}
                    onSelectionChange={(keys) => {
                        const selected = [...keys][0] as string;
                        if (selected) setTabBtn(selected);
                    }}
                >
                    <ButtonGroupItem id="Send Mail">Send Mail</ButtonGroupItem>
                    <ButtonGroupItem id="Mail History">Mail History</ButtonGroupItem>
                </ButtonGroup>
            </div>

            {tabBtn === "Send Mail" && (
                <div className="flex flex-col gap-4">
                    {mailScreen === "input" ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {mailAddData &&
                                    mailAddData.map((field, index) => {
                                        const fieldName = Object.keys(field)[0];
                                        const fieldType = field.type || "text";
                                        const errorMessage = additionalFieldErrors[fieldName];
                                        return (
                                            <div key={index} className="w-full">
                                                <Input
                                                    id={fieldName}
                                                    name={fieldName}
                                                    type={fieldType}
                                                    placeholder={`Enter ${fieldName}`}
                                                    value={formData[fieldName] || ""}
                                                    onChange={(val) => handleChange(fieldName, val)}
                                                    label={fieldName
                                                        .replace(/([A-Z])/g, " $1")
                                                        .trim()
                                                        .replace(/^./, (str) => str.toUpperCase())}
                                                    isInvalid={Boolean(errorMessage)}
                                                    hint={errorMessage ?? undefined}
                                                />
                                            </div>
                                        );
                                    })}
                                <div className="col-span-full">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={(val) => handleChange("email", val)}
                                        label="Recipient Email"
                                        isInvalid={Boolean(emailError)}
                                        hint={emailError ?? undefined}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-secondary">
                                <Button color="secondary" size="sm" onClick={showPreviewFunction} isDisabled={shouldDisableActions}>
                                    Show Preview
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={sendDirectly}
                                    isDisabled={shouldDisableActions || isLoading}
                                    isLoading={isLoading}
                                    showTextWhileLoading
                                >
                                    Send Mail
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full w-full space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-secondary">
                                <h3 className="text-lg font-semibold text-primary">Email Preview</h3>
                                <div>

                                    <Button color="secondary" size="sm" onClick={() => setMailScreen("input")}>
                                        Back to Email
                                    </Button>
                                    <Button color="secondary" size="md" onClick={sendEmail} isDisabled={isLoading} isLoading={isLoading} showTextWhileLoading>
                                        Send Mail
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Enter subject"
                                    value={showHtmlData?.subject || ""}
                                    onChange={(value) => handleChangeMailContent("subject", value)}
                                    label="Subject"
                                />
                                <div className="flex-1 rounded-md border border-secondary overflow-scroll">
                                    <RichTextEditor
                                        value={showHtmlData?.html || ""}
                                        onChange={(value) => handleChangeMailContent("html", value)}
                                        className="h-[400px]"
                                    />
                                </div>
                            </div>
                        
                        </div>
                    )}
                </div>
            )}

            {tabBtn === "Mail History" && (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-primary">Total Sent Mails: {totalRecords}</p>
                    </div>
                    <div className="w-full overflow-hidden rounded-lg border border-secondary shadow-sm">
                        <Table>
                            <Table.Header>
                                <Table.Head label="Email ID" isRowHeader></Table.Head>
                                <Table.Head label="Details"></Table.Head>
                                <Table.Head label="Status"></Table.Head>
                            </Table.Header>
                            <Table.Body>
                                {isLoading ? (
                                    mailHistorySkeletonRows.map((item) => (
                                        <Table.Row key={item.id}>
                                            <Table.Cell className="p-3">
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="p-3">
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="p-3">
                                                <div className="animate-pulse">
                                                    <div className="h-4 w-full rounded bg-secondary" />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : data?.data?.length ? (
                                    data.data.map((item: any, index: number) => (
                                        <Table.Row key={index}>
                                            <Table.Cell className="p-3 text-sm text-primary">{item.email}</Table.Cell>
                                            <Table.Cell className="p-3 text-sm text-primary">{formatDate(item.createdAt)}</Table.Cell>
                                            <Table.Cell className={`p-3 text-sm font-medium ${item.status ? "text-success-primary" : "text-error-primary"}`}>{item.status ? "Success" : "Failed"}</Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={3} className="p-8 text-center text-sm text-tertiary">
                                            No mail history found
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}

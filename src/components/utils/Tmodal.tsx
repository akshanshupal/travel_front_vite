import React, { useState } from 'react';
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";

interface TmodalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    content: React.ReactNode | string;
    header?: string;
    footerActions?: React.ReactNode;
    size?: string; // "sm" | "md" | "lg"
    scrollBehavior?: string; // Ignored for now
    placement?: string; // Ignored for now
    hideCloseButton?: boolean;
    hideCancelButton?: boolean;
}

export default function Tmodal({ isOpen, onClose, onConfirm, content, header, footerActions, hideCloseButton, hideCancelButton, size }: TmodalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (!onConfirm) return;
        setIsLoading(true);
        try {
            await onConfirm();
        } catch (error) {
            console.error("Error executing confirm action:", error);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose}>
            <Modal className={`relative w-full ${size === "sm" ? "max-w-md" : size === "md" ? "max-w-lg" : size === "lg" ? "max-w-2xl" : size === "xl" ? "max-w-4xl" : size === "full" ? "max-w-none" : "max-w-lg"} rounded-xl bg-primary p-5 ring-1 ring-secondary`}>
                <Dialog className="flex flex-col gap-4">
                    {({ close }) => (
                        <>
                            {!hideCloseButton && <CloseButton onPress={close} size="sm" className="absolute right-4 top-4" />}
                            <div className="pr-10 text-lg font-semibold text-primary">
                                {header || "Confirmation"}
                            </div>
                            <div className="w-full flex-1 overflow-y-auto max-h-[80vh]">
                                {typeof content === "string" ? (
                                    <div className="text-primary" dangerouslySetInnerHTML={{ __html: content }} />
                                ) : (
                                    content
                                )}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                {!hideCancelButton && (
                                    <Button color="secondary-destructive" onClick={close}>
                                        Cancel
                                    </Button>
                                )}
                                {footerActions}
                                {onConfirm && (
                                    <Button color="primary" onClick={handleConfirm} disabled={isLoading}>
                                        {isLoading ? "Loading..." : "Confirm"}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

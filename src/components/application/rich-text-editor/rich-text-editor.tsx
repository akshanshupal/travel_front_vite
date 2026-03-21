import "jodit/es2021/jodit.min.css";
import JoditEditor from "jodit-react";
import { useEffect, useMemo } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
};

export const RichTextEditor = ({ value, onChange, className }: Props) => {
    // Fix for Jodit popup clickability issue when inside a Modal.
    // React Aria Components (or similar) might add 'inert' to the body or siblings
    // when a modal is open. Since Jodit appends popups to the body, they might
    // inherit this 'inert' state, making them unclickable.
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const popupContainers = document.querySelectorAll(".jodit-popup-container");
            popupContainers.forEach((container) => {
                if (container.hasAttribute("inert")) {
                    container.removeAttribute("inert");
                }
            });
        });

        // Observe the body for changes (popup addition/modification)
        observer.observe(document.body, {
            childList: true,
            attributes: true,
            subtree: true,
            attributeFilter: ["inert"],
        });

        return () => observer.disconnect();
    }, []);

    const config = useMemo(
        () => ({
            readonly: false,
            iframe: false,
            style: "background-color: var(--color-bg-primary); color: var(--color-text-primary);",
            iframeStyle: "body{background-color: var(--color-bg-primary); color: var(--color-text-primary);}",
            uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            },
            zIndex: 100005,
        }),
        [],
    );

    return (
        <div className={["tz-rich-text-editor", className].filter(Boolean).join(" ")}>
            <JoditEditor value={value} config={config as any} onChange={(next) => onChange(String(next ?? ""))} />
        </div>
    );
};

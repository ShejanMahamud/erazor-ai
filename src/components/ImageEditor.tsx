"use client";
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';


export function ImageEditor({
    handleClose,
    imageSource,
}: {
    handleClose: () => void;
    imageSource: string;
}) {
    const { theme } = useTheme()
    const handleSaveImage = (editedImageObject: any) => {
        const { canvasBase64 } = editedImageObject;

        if (!canvasBase64) return;

        const link = document.createElement("a");
        link.href = canvasBase64; // base64 image URL
        link.download = "erazor_edited-image.png";
        link.click();
    }

    useEffect(() => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        if (theme === 'dark') {
            root.style.setProperty('--fil-image-editor-bg', computedStyle.getPropertyValue('--background').trim());
            root.style.setProperty('--fil-toolbar-bg', computedStyle.getPropertyValue('--card').trim());
            root.style.setProperty('--fil-toolbar-btn-bg', computedStyle.getPropertyValue('--secondary').trim());
            root.style.setProperty('--fil-toolbar-btn-color', computedStyle.getPropertyValue('--foreground').trim());
        } else {
            root.style.setProperty('--fil-image-editor-bg', computedStyle.getPropertyValue('--background').trim());
            root.style.setProperty('--fil-toolbar-bg', computedStyle.getPropertyValue('--muted').trim());
            root.style.setProperty('--fil-toolbar-btn-bg', computedStyle.getPropertyValue('--accent').trim());
            root.style.setProperty('--fil-toolbar-btn-color', computedStyle.getPropertyValue('--foreground').trim());
        }
    }, [theme]);


    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                background: "#000000cc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ width: "90%", height: "90%" }}>
                <FilerobotImageEditor
                    source={imageSource}
                    onSave={(editedImageObject) =>
                        handleSaveImage(editedImageObject)
                    }
                    onClose={handleClose}
                    annotationsCommon={{ fill: "#ff0000" }}
                    Text={{ text: "Erazor AI" }}
                    Rotate={{ angle: 90, componentType: "slider" }}
                    tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.RESIZE]}
                    defaultTabId={TABS.ANNOTATE}
                    defaultToolId={TOOLS.TEXT}
                    savingPixelRatio={1}
                    previewPixelRatio={1}
                />
            </div>
        </div>

    );
}

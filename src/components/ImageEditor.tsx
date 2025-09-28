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
        if (theme === 'dark') {
            root.style.setProperty('--fil-image-editor-bg', '#0d1117');
            root.style.setProperty('--fil-toolbar-bg', '#161b22');
            root.style.setProperty('--fil-toolbar-btn-bg', '#21262d');
            root.style.setProperty('--fil-toolbar-btn-color', '#c9d1d9');
        } else {
            root.style.setProperty('--fil-image-editor-bg', '#fff');
            root.style.setProperty('--fil-toolbar-bg', '#f5f5f5');
            root.style.setProperty('--fil-toolbar-btn-bg', '#eee');
            root.style.setProperty('--fil-toolbar-btn-color', '#333');
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

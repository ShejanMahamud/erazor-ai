"use client";
import dynamic from 'next/dist/shared/lib/dynamic';
import { TABS, TOOLS } from 'react-filerobot-image-editor';
const FilerobotImageEditor = dynamic(
    () => import("react-filerobot-image-editor"),
    { ssr: false } // 🚀 disables SSR so canvas isn't loaded server-side
);


export function ImageEditor({
    handleClose,
    imageSource,
}: {
    handleClose: () => void;
    imageSource: string;
}) {
    const handleSaveImage = (editedImageObject: any) => {
        const { canvasBase64 } = editedImageObject;

        if (!canvasBase64) return;

        const link = document.createElement("a");
        link.href = canvasBase64; // base64 image URL
        link.download = "erazor_edited-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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
                    tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.RESIZE, TABS.FINETUNE]}
                    defaultTabId={TABS.ANNOTATE}
                    defaultToolId={TOOLS.TEXT}
                    savingPixelRatio={1}
                    previewPixelRatio={1}
                />
            </div>
        </div>

    );
}
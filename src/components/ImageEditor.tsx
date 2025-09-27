"use client";
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

export default function ImageEditor({
    handleClose,
    imageSource,
}: {
    handleClose: () => void;
    imageSource: string;
}) {

    const handleSaveImage = (editedImageObject: any, designState: any) => {
        const { canvasBase64 } = editedImageObject;

        if (!canvasBase64) return;

        const link = document.createElement("a");
        link.href = canvasBase64; // base64 image URL
        link.download = "erazor_edited-image.png";
        link.click();
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 50, // keep it above
                background: "#000000cc", // dark overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ width: "90%", height: "90%" }}>
                <FilerobotImageEditor
                    source={imageSource}
                    onSave={(editedImageObject, designState) =>
                        handleSaveImage(editedImageObject, designState)
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

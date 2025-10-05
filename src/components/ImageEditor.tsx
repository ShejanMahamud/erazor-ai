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
    const handleSaveImage = (imageData: any, imageDesignState: any) => {
        console.log('Image data:', imageData);
        console.log('Image design state:', imageDesignState);

        if (!imageData) {
            console.error('No image data provided');
            return;
        }

        let base64Data: string;

        // Handle different formats of imageData
        if (imageData instanceof HTMLCanvasElement) {
            // If imageData is a canvas element, convert it to base64
            base64Data = imageData.toDataURL('image/png');
        } else if (typeof imageData === 'string') {
            // If imageData is already a base64 string
            base64Data = imageData;
        } else if (imageData.canvas instanceof HTMLCanvasElement) {
            // If imageData has a canvas property
            base64Data = imageData.canvas.toDataURL('image/png');
        } else if (imageData.base64) {
            // If imageData has a base64 property
            base64Data = imageData.base64;
        } else {
            console.error('Unable to process image data format:', typeof imageData);
            return;
        }

        // Create download link
        const link = document.createElement("a");
        link.href = base64Data;
        link.download = "erazor_edited-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Image saved successfully');
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
                    onSave={(imageData, imageDesignState) =>
                        handleSaveImage(imageData, imageDesignState)
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
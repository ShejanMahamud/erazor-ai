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

        try {
            let downloadUrl: string;
            let filename: string = "erazor_edited-image.png";

            // Handle different formats of imageData from react-filerobot-image-editor
            if (imageData.imageBase64) {
                // Most common format returned by react-filerobot-image-editor
                downloadUrl = imageData.imageBase64;
            } else if (imageData.canvas instanceof HTMLCanvasElement) {
                // If imageData has a canvas property
                downloadUrl = imageData.canvas.toDataURL('image/png');
            } else if (imageData instanceof HTMLCanvasElement) {
                // If imageData is a canvas element
                downloadUrl = imageData.toDataURL('image/png');
            } else if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
                // If imageData is already a base64 string
                downloadUrl = imageData;
            } else if (imageData.base64) {
                // If imageData has a base64 property
                downloadUrl = imageData.base64;
            } else if (imageData.blob) {
                // If imageData has a blob property
                downloadUrl = URL.createObjectURL(imageData.blob);
                filename = imageData.name || filename;
            } else {
                console.error('Unable to process image data format:', imageData);
                console.error('Available properties:', Object.keys(imageData));
                return;
            }

            // Ensure the URL starts with data: or blob: or http
            if (!downloadUrl.startsWith('data:') && !downloadUrl.startsWith('blob:') && !downloadUrl.startsWith('http')) {
                console.error('Invalid download URL format:', downloadUrl);
                return;
            }

            // Create and trigger download
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up blob URL if created
            if (downloadUrl.startsWith('blob:')) {
                setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
            }

            console.log('Image saved successfully');
        } catch (error) {
            console.error('Error saving image:', error);
        }
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
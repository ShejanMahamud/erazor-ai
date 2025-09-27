"use client";
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

export default function ImageEditor() {

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
                    source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
                    onSave={(editedImageObject, designState) =>
                        console.log("saved", editedImageObject, designState)
                    }
                    annotationsCommon={{ fill: "#ff0000" }}
                    Text={{ text: "Filerobot..." }}
                    Rotate={{ angle: 90, componentType: "slider" }}
                    tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
                    defaultTabId={TABS.ANNOTATE}
                    defaultToolId={TOOLS.TEXT}
                    savingPixelRatio={1}
                    previewPixelRatio={1}
                />
            </div>
        </div>

    );
}

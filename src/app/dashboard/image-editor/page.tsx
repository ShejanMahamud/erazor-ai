// Import the editor styles
import '@pqina/pintura/pintura.css';

// Import the editor default configuration
import { getEditorDefaults } from '@pqina/pintura';

// Import the editor component from `react-pintura`
import { PinturaEditor } from '@pqina/react-pintura';

// get default properties
const editorConfig = getEditorDefaults();

export default function ImageEditor() {
    return (
        <div className="App" style={{ height: '600px' }}>
            <PinturaEditor
                {...editorConfig}
                src="image.jpeg"
                imageCropAspectRatio={1}
            ></PinturaEditor>
        </div>
    );
}

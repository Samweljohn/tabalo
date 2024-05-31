import JoditEditor from "jodit-react";
import { useState, useRef} from "react";
export default function TextArea(){
       const editor = useRef(null);
	   const [content, setContent] = useState('');
    return(
        
        <div>
            <JoditEditor
            ref={editor}
			value={content}
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
            />
        </div>
    )
}
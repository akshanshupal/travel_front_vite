import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

interface CustomEditorProps {
  value: string;
  onContentChange: (value: string) => void;
}

export default function CustomEditor({ value, onContentChange }: CustomEditorProps) {
  const editor = useRef(null); 
  const [content, setContent] = useState(value || '');
  
  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
      },
    }),
    []
  );

  const handleChange = (value: string) => {
    setContent(value);
    if (onContentChange) {
      onContentChange(value); 
    }
  };

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    const handleButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if ((target.tagName === 'BUTTON' || target.tagName === 'A') && target.closest('.jodit-wysiwyg')) {
        event.preventDefault(); // Prevent default form submission
        event.stopPropagation(); // Stop event propagation
      }
    };

    // Attach event listener to the document (form-level interception)
    document.addEventListener('click', handleButtonClick, true);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('click', handleButtonClick, true);
    };
  }, []);


  return (
    <main>
      <div ref={editor} className="h-auto">
        <JoditEditor
          value={content}
          config={config as any}
          onBlur={handleChange} // prefer onBlur for performance or onChange
          className="w-full h-[70%] mt-10 bg-white"
        />
      </div>
    </main>
  );
}

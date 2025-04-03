import React, { useRef, useMemo, useCallback, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";
import { debounce } from "lodash";

// Image upload function (needs to be replaced with actual server API)
async function uploadImage(file: File): Promise<string> {
  // Image validation
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  // File size limit (5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size cannot exceed 5MB.");
  }

  // Return simulated image URL (should be replaced with actual server upload)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/images/${file.name}`);
    }, 1000);
  });
}

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  onError?: (error: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onError }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Debounced onChange handler
  const debouncedOnChange = useMemo(
    () =>
      debounce((content: string) => {
        onChange(content);
      }, 500),
    [onChange]
  );

  const handleImage = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];

      try {
        setIsUploading(true);
        const imageUrl = await uploadImage(file);

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Image upload failed.";
        onError?.(errorMessage);
      } finally {
        setIsUploading(false);
      }
    };
  }, [onError]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link"],
          ["clean"],
        ],
        handlers: {
          image: handleImage,
        },
      },
    }),
    [handleImage]
  );

  return (
    <div className='relative'>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={debouncedOnChange}
        modules={modules}
        theme='snow'
        className='custom-quill'
      />
      {isUploading && (
        <div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;

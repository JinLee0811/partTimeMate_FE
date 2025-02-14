import React, { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    };
  }, []);

  return (
    <div className='border border-gray-300 rounded-md bg-white p-2'>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        theme='snow'
        // 아래 className에서 .ql-editor에 min-height를 적용
        className='custom-quill'
      />
      <style jsx>{`
        /* local scope로 .custom-quill 아래의 .ql-editor에만 적용 */
        .custom-quill .ql-editor {
          min-height: 200px; /* 원하는 높이 */
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

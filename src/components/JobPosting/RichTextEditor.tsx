import React, { useRef, useMemo, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css"; // 추가

// 이미지 업로드를 위한 예제 함수 (실제 서비스에서는 서버 업로드 방식 필요)
async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Props 타입 정의
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  // ✅ useCallback을 사용하여 이미지 핸들러 함수가 재생성되지 않도록 최적화
  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      try {
        const imageUrl = await uploadImage(file);

        // ✅ quillRef가 안전하게 초기화된 후 getEditor()를 호출
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range?.index ?? 0, "image", imageUrl, "user");
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    };
  }, []);

  // ✅ useMemo를 사용하여 불필요한 리렌더링 방지 (modules가 매번 새로 생성되지 않도록)
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: handleImage, // ✅ 이미지 버튼 클릭 시 handleImage 실행
        },
      },
    }),
    [handleImage]
  );

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      theme='snow'
      className='custom-quill'
    />
  );
};

export default RichTextEditor;

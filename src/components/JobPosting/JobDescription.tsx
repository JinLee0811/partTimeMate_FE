import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import FileUploader from "./FileUploader";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function JobDescription() {
  const { formData, setFormData } = useJobPostingStore();

  // RichTextEditor의 초기값은 global store의 description 값 사용
  const [editorContent, setEditorContent] = useState(formData.description || "");

  // 미리보기 토글
  const [showPreview, setShowPreview] = useState(false);

  // 에디터 내용이 바뀔 때마다 global store에 업데이트
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    setFormData({ description: content });
  };

  // 파일 업로드 로직 (PDF, etc.)
  const handleFileUpload = async (file: File) => {
    try {
      console.log("Uploading file:", file.name);
      // 실제 업로드 로직...
      // 업로드 후 받은 URL을 store에 저장하거나,
      // formData.attachments 배열에 push하는 식으로 처리 가능.
      // 예: setFormData({ attachments: [...(formData.attachments || []), fileUrl] });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  // store의 description이 외부에서 변경되면 editorContent 동기화
  useEffect(() => {
    setEditorContent(formData.description || "");
  }, [formData.description]);

  return (
    <div>
      {/* ✅ 상단 섹션 제목 및 설명 */}
      <div className='bg-gray-100 p-4 rounded-lg mb-3'>
        <h2 className='text-xl font-bold text-blue-600'>Job Description</h2>
        <p className='text-gray-600 text-sm mt-1'>
          This form is for you to provide any additional information or a detailed description about
          the job. Feel free to write your own text or attach images if you have them.
        </p>
      </div>

      <label className='block mb-2 text-sm font-medium text-gray-700'>HTML Text Editor *</label>

      {/* WYSIWYG 에디터 */}
      <RichTextEditor value={editorContent} onChange={handleEditorChange} />

      {/* 파일 업로더 (예: PDF 등 별도 첨부) */}
      <div className='mt-4'>
        <p>If you have Design Image, you can upload without Text Editor</p>
        <FileUploader onFileUpload={handleFileUpload} />
      </div>

      {/* 미리보기 토글 버튼 */}
      <div className='mt-4'>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'>
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {/* 미리보기 영역 (HTML) */}
      {showPreview && (
        <div className='mt-4 border p-3 rounded-md bg-gray-50'>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} className='prose max-w-none' />
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import FileUploader from "./FileUploader";
import { useJobPostingStore } from "../../store/jobPostingStore";

export default function JobDescription() {
  const { formData, setFormData } = useJobPostingStore();
  // RichTextEditor의 초기값은 global store의 description 값 사용
  const [editorContent, setEditorContent] = useState(formData.description || "");

  // 에디터 내용이 바뀔 때마다 global store에 업데이트
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    // 직접 Partial 객체를 전달 (함수형 업데이트 대신 객체 전달)
    setFormData({ description: content });
  };

  // 파일 업로드 후 서버로 전송 & URL 받아오는 로직 (예시)
  const handleFileUpload = async (file: File) => {
    try {
      console.log("Uploading file: ", file.name);
      // 실제 업로드 로직을 구현 후, 반환받은 URL을 global store에 업데이트할 수 있음.
      // 예: setFormData({ attachedFileUrl: fileUrl });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  // 만약 글로벌 스토어의 description 값이 변경되었을 경우, 로컬 editorContent도 동기화
  useEffect(() => {
    setEditorContent(formData.description);
  }, [formData.description]);

  return (
    <div>
      {/* 안내 문구 (영어) */}
      <p className='text-sm text-gray-600 mb-4'>
        This form is for you to provide any additional information or a detailed description about
        the job. Feel free to write your own text or attach images if you have them.
      </p>

      <label className='block mb-2 text-sm font-medium text-gray-700'>Job Description *</label>
      {/* WYSIWYG 에디터 */}
      <RichTextEditor value={editorContent} onChange={handleEditorChange} />

      {/* 파일 업로더 (PDF, 기타 파일 첨부) */}
      <div className='mt-4'>
        <FileUploader onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
}

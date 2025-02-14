import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import FileUploader from "./FileUploader";

export default function JobDescription({ formData, handleChange }) {
  // 만약 formData.description이 이미 HTML/문자열 형태라면
  // 해당 값을 기본값으로 세팅해둡니다.
  const [editorContent, setEditorContent] = useState(formData.description || "");

  // 파일 업로드 후 서버로 전송 & URL 받아오는 로직(가정)
  const handleFileUpload = async (file: File) => {
    try {
      console.log("Uploading file: ", file.name);
      // 실제 업로드 로직 (예시)
      // const formData = new FormData();
      // formData.append("file", file);
      // const response = await axios.post("/api/upload", formData);
      // const fileUrl = response.data.url;
      // ...
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  // 에디터 내용이 바뀔 때마다 formData에도 반영
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    // handleChange 이벤트를 통해 상위 formData로 전달
    handleChange({
      target: { name: "description", value: content },
    } as React.ChangeEvent<HTMLInputElement>);
  };

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

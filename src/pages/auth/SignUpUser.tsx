import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import InputField from "../../components/InputField";

export default function SignUpUser() {
  const { signUp, loading, error } = useSignUp();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    preferredLanguage: "ENG",
    role: "BUSINESS",
    terms: {
      all: false,
      age: false,
      termsOfService: false,
      privacyPolicy: false,
      promotions: false,
    },
  });

  // ✅ 필수 약관 체크 여부 확인
  const isRequiredTermsChecked =
    formData.terms.age && formData.terms.termsOfService && formData.terms.privacyPolicy;

  // ✅ 모든 체크박스 토글
  const handleAllTermsToggle = () => {
    const newState = !formData.terms.all;
    setFormData((prev) => ({
      ...prev,
      terms: {
        all: newState,
        age: newState,
        termsOfService: newState,
        privacyPolicy: newState,
        promotions: newState,
      },
    }));
  };

  // ✅ 개별 체크박스 토글
  const handleTermsChange = (key: string) => {
    setFormData((prev) => {
      const newTerms = { ...prev.terms, [key]: !prev.terms[key as keyof typeof prev.terms] };

      // 전체 동의 상태 업데이트
      const allChecked = Object.keys(newTerms)
        .filter((k) => k !== "all")
        .every((k) => newTerms[k as keyof typeof newTerms]);

      return {
        ...prev,
        terms: { ...newTerms, all: allChecked },
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRequiredTermsChecked) return; // 필수 약관 체크되지 않으면 회원가입 진행 X
    const formattedPhoneNumber = `+61${formData.phoneNumber}`;

    await signUp(
      {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formattedPhoneNumber,
        preferredLanguage: formData.preferredLanguage,
        role: "JOB_SEEKER",
      },
      formData.confirmPassword
    );
  };

  return (
    <div className='flex flex-col items-center bg-gray-50 py-10 px-4'>
      <div className='w-full max-w-lg bg-white shadow-md p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Business Sign Up</h2>

        {/* ✅ 약관 동의 섹션 */}
        <div className='border p-4 rounded-md mb-6 bg-gray-50'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Terms & Conditions *</h3>
          <div className='space-y-2'>
            {/* 개별 약관 동의 */}
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.terms.age}
                onChange={() => handleTermsChange("age")}
              />
              <span className='text-gray-700'>(Required) I am over 15 years old</span>
            </label>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.terms.termsOfService}
                onChange={() => handleTermsChange("termsOfService")}
              />
              <span className='text-gray-700'>(Required) Agree to Terms of Service</span>
            </label>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.terms.privacyPolicy}
                onChange={() => handleTermsChange("privacyPolicy")}
              />
              <span className='text-gray-700'>(Required) Agree to Privacy Policy</span>
            </label>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.terms.promotions}
                onChange={() => handleTermsChange("promotions")}
              />
              <span className='text-gray-700'>(Optional) Receive promotional emails/SMS</span>
            </label>
            {/* 전체 동의 */}
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input type='checkbox' checked={formData.terms.all} onChange={handleAllTermsToggle} />
              <span className='text-gray-700 font-medium'>Agree to all terms</span>
            </label>
          </div>
        </div>

        {/* ✅ 회원가입 폼 (필수 약관 동의 안 하면 입력 비활성화) */}
        <form className='w-full space-y-3' onSubmit={handleSubmit}>
          {/* Phone Number */}
          <div className='mb-4'>
            <label className='text-gray-800 text-sm mb-2 block'>Phone Number *</label>
            <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
              <span className='bg-gray-200 text-sm px-3 py-2 text-gray-600'>+61</span>
              <input
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({ ...prev, phoneNumber: onlyNumbers }));
                }}
                placeholder='Enter phone number (e.g. 435233222)'
                className='flex-1 p-2 focus:outline-none text-sm'
                disabled={!isRequiredTermsChecked}
              />
            </div>
          </div>

          {/* Email */}
          <InputField
            label='Email *'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
            disabled={!isRequiredTermsChecked}
          />
          {/* First Name & Last Name */}
          <InputField
            label='First Name *'
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            placeholder='Enter your First Name'
            disabled={!isRequiredTermsChecked}
          />
          <InputField
            label='Last Name *'
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Enter your Last Name'
            disabled={!isRequiredTermsChecked}
          />
          {/* Password */}
          <InputField
            label='Password *'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter a secure password'
            disabled={!isRequiredTermsChecked}
          />
          <InputField
            label='Confirm Password *'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Re-enter your password'
            disabled={!isRequiredTermsChecked}
          />
          {error && <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>}
          {/* ✅ 회원가입 버튼 (필수 약관 미동의 시 비활성화) */}
          <button
            type='submit'
            className={`w-full py-3 rounded-md font-semibold transition ${
              !isRequiredTermsChecked || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            disabled={!isRequiredTermsChecked || loading}>
            {loading ? "Signing Up..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

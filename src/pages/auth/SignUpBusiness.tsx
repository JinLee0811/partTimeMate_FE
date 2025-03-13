import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

export default function SignUpBusiness() {
  const { signUp, isPending } = useSignUp();
  const [localError, setLocalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    preferredLanguage: "ENG",
    business_name: "",
    business_address: "",
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

      const allChecked = Object.keys(newTerms)
        .filter((k) => k !== "all")
        .every((k) => newTerms[k as keyof typeof newTerms]);

      return {
        ...prev,
        terms: { ...newTerms, all: allChecked },
      };
    });
  };

  // ✅ 비밀번호 유효성 검사 상태
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // ✅ 대문자, 소문자, 숫자, 특수문자가 각각 하나 이상 포함 & 8~32자
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return passwordRegex.test(password);
  };

  // ✅ onChange 이벤트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setIsPasswordValid(validatePassword(value));
    }
  };

  // ✅ 전화번호 입력 핸들러 (+61 고정 유지)
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    setFormData((prev) => ({ ...prev, phoneNumber: onlyNumbers }));
  };

  // ✅ 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!isRequiredTermsChecked) {
      setLocalError("⚠️ You must agree to the required terms.");
      return;
    }

    const formattedPhoneNumber = `+61${formData.phoneNumber}`;

    signUp(
      {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formattedPhoneNumber,
        preferredLanguage: formData.preferredLanguage,
        role: "BUSINESS",
      },
      {
        onError: (signupError: any) => {
          setLocalError(signupError.message || "⚠️ Registration failed. Please try again.");
        },
      }
    );
  };

  return (
    <div className='flex flex-col items-center bg-gray-50 py-10 px-4'>
      <div className='w-full max-w-lg bg-white shadow-md p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Business Sign Up</h2>

        {/* 오류 메시지 표시 */}
        {localError && <p className='text-red-500 text-sm mb-4 text-center'>{localError}</p>}

        {/* 약관 동의 섹션 */}
        <div className='border p-4 rounded-md mb-6 bg-gray-50'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Terms & Conditions *</h3>
          <div className='space-y-2'>
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
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input type='checkbox' checked={formData.terms.all} onChange={handleAllTermsToggle} />
              <span className='text-gray-700 font-medium'>Agree to all terms</span>
            </label>
          </div>
        </div>

        {/* 회원가입 폼 */}
        <form className='w-full space-y-3' onSubmit={handleSubmit}>
          {/* Phone Number (+61 고정) */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Phone Number *</label>
            <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
              <span className='bg-gray-200 px-3 py-2 text-gray-600'>+61</span>
              <input
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder='Enter phone number (e.g. 123456789)'
                className='flex-1 p-2 text-sm focus:outline-none'
                disabled={!isRequiredTermsChecked}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Email *</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              disabled={!isRequiredTermsChecked}
              className='bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 border-gray-300'
            />
          </div>

          {/* First Name */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>First Name *</label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              placeholder='Enter your First Name'
              disabled={!isRequiredTermsChecked}
              className='bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 border-gray-300'
            />
          </div>

          {/* Last Name */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Last Name *</label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Enter your Last Name'
              disabled={!isRequiredTermsChecked}
              className='bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 border-gray-300'
            />
          </div>

          {/* Password */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Password *</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter a secure password'
              disabled={!isRequiredTermsChecked}
              className='bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 border-gray-300'
            />
            <p className={`text-sm mt-1 ${isPasswordValid ? "text-gray-500" : "text-red-500"}`}>
              Password must be 8-32 characters long and include letters, numbers, and special
              characters (including uppercase and lowercase).
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Confirm Password *</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Re-enter your password'
              disabled={!isRequiredTermsChecked}
              className='bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 border-gray-300'
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type='submit'
            className={`w-full py-3 rounded-md font-semibold transition ${
              !isRequiredTermsChecked || isPending
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            disabled={!isRequiredTermsChecked || isPending}>
            {isPending ? "Signing Up..." : "Create Business Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

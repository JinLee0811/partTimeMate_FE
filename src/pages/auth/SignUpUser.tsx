import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import InputField from "../../components/InputField";

export default function SignUpUser() {
  const { signUp, loading, error } = useSignUp();
  const [formData, setFormData] = useState({
    phone: "",
    verificationCode: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    email: "",
    referral: "",
    preferred_language: "ENG",
    terms: {
      all: false,
      age: false,
      termsOfService: false,
      privacyPolicy: false,
      promotions: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      terms: {
        ...prev.terms,
        [key]: !prev.terms[key as keyof typeof prev.terms],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(
      {
        // phone: formData.phone,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        preferred_language: formData.preferred_language,
        role: "JOB_SEEKER",
      },
      formData.confirmPassword
    );
  };

  return (
    <div className='flex flex-col items-center bg-gray-50 py-10 px-4'>
      <div className='w-full max-w-lg bg-white shadow-md p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Sign Up</h2>

        {/* Terms Agreement Section */}
        <div className='border p-4 rounded-md mb-6 bg-gray-50'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Terms & Conditions *</h3>
          <div className='space-y-2'>
            <label className='flex items-center space-x-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.terms.all}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    terms: {
                      all: !prev.terms.all,
                      age: !prev.terms.all,
                      termsOfService: !prev.terms.all,
                      privacyPolicy: !prev.terms.all,
                      promotions: !prev.terms.all,
                    },
                  }))
                }
              />
              <span className='text-gray-700 font-medium'>Agree to all terms</span>
            </label>
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
          </div>
        </div>

        {/* Sign Up Form */}
        <form className='w-full space-y-3' onSubmit={handleSubmit}>
          {/* Phone Number & Verification */}
          {/* <div className='flex items-center space-x-3'>
            <InputField
              label='Phone *'
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter phone number'
            />
            <button className='px-3 mt-7 py-2 bg-gray-300 text-gray-600 rounded-md h-[40px]'>
              Verify
            </button>
          </div> */}

          {/* <InputField
            label='Verification Code'
            type='text'
            name='verificationCode'
            value={formData.verificationCode}
            onChange={handleChange}
            placeholder='Enter verification code'
          /> */}

          {/* Email */}
          <InputField
            label='Email *'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
          />

          {/* Username */}
          <InputField
            label='First Name *'
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            placeholder='Enter your First Name'
          />
          <InputField
            label='Last Name *'
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            placeholder='Enter your Last Name'
          />

          {/* Password */}
          <InputField
            label='Password *'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter a secure password'
          />
          <InputField
            label='Confirm Password *'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Re-enter your password'
          />

          {/* Preferred Language Selection */}
          <div>
            <label className='text-gray-800 text-sm mb-2 block'>Preferred Language *</label>
            <select
              name='preferred_language'
              value={formData.preferred_language}
              onChange={handleChange}
              className='w-full p-3 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400'>
              <option value='ENG'>English (ENG)</option>
              <option value='KOR'>Korean (KOR)</option>
            </select>
          </div>

          {/* Referral
          <InputField
            label='Referral (Optional)'
            type='text'
            name='referral'
            value={formData.referral}
            onChange={handleChange}
            placeholder='Where did you hear about us?'
          /> */}

          {error && <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>}

          {/* Sign Up Button */}
          <button
            type='submit'
            className={`w-full py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            disabled={loading}>
            {loading ? "Signing Up..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

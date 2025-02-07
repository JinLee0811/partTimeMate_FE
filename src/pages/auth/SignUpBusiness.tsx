import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import InputField from "../../components/InputField";

export default function SignUpBusiness() {
  const { signUp, loading, error } = useSignUp();
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    businessAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(
      {
        email: formData.email,
        password: formData.password,
        first_name: formData.ownerName.split(" ")[0] || "",
        last_name: formData.ownerName.split(" ")[1] || "",
        role: "BUSINESS",
        preferred_language: "ENG",
        business_name: formData.businessName,
        business_address: formData.businessAddress,
        phone: formData.phone,
      },
      formData.confirmPassword
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-md'>
        <h2 className='text-2xl mb-10 font-bold text-center text-gray-800'>Sign Up as Business</h2>
        <GoogleSignInButton />
        <form className='mt-6' onSubmit={handleSubmit}>
          <InputField
            type='text'
            name='businessName'
            value={formData.businessName}
            onChange={handleChange}
            placeholder='Business Name'
          />
          <InputField
            type='text'
            name='ownerName'
            value={formData.ownerName}
            onChange={handleChange}
            placeholder='Owner Name'
          />
          <InputField
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
          <InputField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <InputField
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm Password'
          />
          <InputField
            type='text'
            name='businessAddress'
            value={formData.businessAddress}
            onChange={handleChange}
            placeholder='Business Address'
          />
          <InputField
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Phone'
          />

          {error && <p className='text-red-500 text-center mb-3'>{error}</p>}

          <button
            type='submit'
            className='w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition'
            disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

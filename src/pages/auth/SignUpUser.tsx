import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import InputField from "../../components/InputField";

export default function SignUpUser() {
  const { signUp, loading, error } = useSignUp();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferredLanguage: "ENG",
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
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: "JOB_SEEKER",
        preferred_language: formData.preferredLanguage,
      },
      formData.confirmPassword
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-md'>
        <h2 className='text-2xl mb-10 font-bold text-center text-gray-800'>
          Sign Up as Job Seeker
        </h2>
        <GoogleSignInButton />
        <form className='mt-6' onSubmit={handleSubmit}>
          <InputField
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            placeholder='First Name'
          />
          <InputField
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Last Name'
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

          {error && <p className='text-red-500 text-center mb-3'>{error}</p>}

          <button
            type='submit'
            className='w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition'
            disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

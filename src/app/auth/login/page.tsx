// src/app/auth/login/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/store/features/user/authThunks";
import { resetStatus } from "@/store/features/user/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GenericForm from "@/components/genericForm";
import { FiLoader } from "react-icons/fi";
import { mockLogin } from "@/lib/mockAuth";

interface UserData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<UserData>({
    email: '',
    password: '',
  });
  
  // Local error state for mock login
  const [localError, setLocalError] = useState<string | null>(null);
  
  const dispatch: AppDispatch = useDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  // Integrated handleSubmit: use mock login for demo users, and otherwise the real login flow.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Define demo emails for mock authentication.
    const demoEmails = new Set(["demo.user@example.com", "partner@example.com"]);

    if (demoEmails.has(formData.email)) {
      // Use the mock login logic for demo users.
      const result = mockLogin(formData.email, formData.password);
      if (result.success) {
        console.log("Mock login successful:", result.user);
        setLocalError(null);
        router.replace("/");
      } else {
        setLocalError(result.message || "Mock login failed.");
      }
    } else {
      // Use the real login flow.
      const payload = {
        email: formData.email,
        password: formData.password
      };
      dispatch(signIn(payload));
    }
  };

  // When real login is successful, navigate to home.
  useEffect(() => {
    if (success) {
      router.replace("/");
    }
  }, [success, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <GenericForm onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="field-wrap">
        <label htmlFor="email">Email</label>
        <input 
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="field-wrap">
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <p className="microcopy pt-2">Forgot password</p>
      
      {error && <p className="error">{error}</p>}
      {localError && <p className="error">{localError}</p>}
      
      <button type="submit" className="btn mt-9 w-full">
        {loading ? <FiLoader /> : "Login"}
      </button>
      <p className="pt-2 microcopy">
        Don&apos;t have an account yet?{" "}
        <Link href="/auth/signUp" className="underline">
          Sign Up
        </Link>
      </p>
    </GenericForm>
  );
}

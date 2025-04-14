'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/features/user/authThunks";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GenericForm from "@/components/genericForm";
import Toast from "@/components/toast";
import { FiLoader } from "react-icons/fi";
import { mockSignUp, DemoUser } from "@/lib/mockAuth";

interface UserData {
  email: string;
  password: string;
  role: string;
  address: string;
  // fields specific to business partners
  business_name?: string;
  business_id?: string;
  business_type?: string;
  inventory_count?: number;
  // fields specific to customers
  coins?: number;
  completed_module?: number;
  name?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
    role: "",
    address: "",
    business_name: "",
    business_id: "",
    business_type: "",
    inventory_count: 0,
    coins: 0,
    completed_module: 0,
    name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");
  const [userRole, setuserRole] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { loading, success } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // Clears the form fields.
  const clearInput = () => {
    setFormData({
      email: "",
      password: "",
      address: "",
      role: "",
      business_name: "",
      business_id: "",
      business_type: "",
      inventory_count: 0,
      coins: 0,
      completed_module: 0,
      name: "",
    });
  };

  // Integrated handleSubmit.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== confirmPassword) {
      setPwError("Passwords do not match!");
      return;
    } else {
      setPwError("");
    }

    // Define demo emails for the mock flow.
    const demoEmails = new Set(["demo.user@example.com", "partner@example.com"]);

    if (demoEmails.has(formData.email)) {
      // Use the mock sign-up function.
      const result = mockSignUp(formData as DemoUser);
      if (result.success) {
        console.log("Mock sign-up successful:", result.user);
        setToastMsg("Registration is successful! (Demo Account)");
      } else {
        setSignupError(result.message || "Mock sign-up failed");
      }
    } else {
      // Otherwise, use the real registration flow.
      const payload = {
        email: formData.email,
        password: formData.password,
        address: formData.address,
        additionalData: {
          role: formData.role as "customer" | "business_partner",
          name: formData.name,
          business_id: formData.business_id,
          address: formData.address,
          business_type: formData.business_type,
          business_name: formData.business_name,
          inventory_count: formData.inventory_count,
          coins: formData.coins,
          completed_module: formData.completed_module,
        },
      };
      dispatch(registerUser(payload));
    }
  };

  // On successful real registration, display a toast.
  useEffect(() => {
    if (success) {
      setToastMsg("Registration is successful!");
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      {toastMsg && (
        <Toast
          message={toastMsg}
          onClose={() => {
            setToastMsg("");
            clearInput();
            router.replace("/auth/login");
          }}
        />
      )}
      {signupError && <p className="error">{signupError}</p>}

      <GenericForm onSubmit={handleSubmit}>
        <h1>Sign Up{userRole === "" && " As"}</h1>
        {userRole !== "" && (
          <p className="pb-6 microcopy">
            Changed your mind? Sign up as{" "}
            <span
              onClick={() => {
                setuserRole(
                  userRole === "customer" ? "business_partner" : "customer"
                );
                clearInput();
                setFormData({
                  ...formData,
                  role: userRole === "customer" ? "business_partner" : "customer",
                });
              }}
              className="highlight cursor-pointer underline"
            >
              {userRole === "customer" ? "Business Partner" : "Customer"}
            </span>{" "}
            instead
          </p>
        )}

        {userRole === "" && (
          <div className="m-auto">
            <div className="flex gap-5 justify-center items-center">
              <button
                className="btn"
                onClick={() => {
                  setuserRole("customer");
                  clearInput();
                  setFormData({ ...formData, role: "customer" });
                }}
              >
                Customer
              </button>
              <span className="font-bold">or</span>
              <button
                className="btn"
                onClick={() => {
                  setuserRole("business_partner");
                  clearInput();
                  setFormData({ ...formData, role: "business_partner" });
                }}
              >
                Business Partner
              </button>
            </div>
          </div>
        )}

        {userRole !== "" && (
          <div>
            <div className="field-wrap">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="JohnDoe@mail.com"
                required
              />
            </div>
            {userRole === "customer" && (
              <div className="field-wrap">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            <div className="field-wrap">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>
            {userRole === "business_partner" && (
              <>
                <div className="field-wrap">
                  <label htmlFor="business_type">Business Type</label>
                  <select
                    name="business_type"
                    id="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                  >
                    <option value="">Select a role</option>
                    <option value="restaurant">Restaurant Owner</option>
                    <option value="supplier">Fresh Supplier</option>
                  </select>
                </div>
                <div className="field-wrap">
                  <label htmlFor="business_name">Business Name</label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    required
                  />
                </div>
                <div className="field-wrap">
                  <label htmlFor="business_id">Business ID</label>
                  <input
                    type="text"
                    id="business_id"
                    name="business_id"
                    value={formData.business_id}
                    onChange={handleChange}
                    placeholder="Enter your business ID"
                    required
                  />
                </div>
              </>
            )}
            <div className="field-wrap">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                placeholder="Password"
                required
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="confirmPassword">Confirm your password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Retype your password"
                required
              />
            </div>
            {pwError !== "" && <span className="error">{pwError}</span>}
            <button type="submit" className="btn mt-9 w-full">
              {loading ? <FiLoader /> : "Sign Up"}
            </button>
            <p className="pt-1 microcopy">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Log In
              </Link>
            </p>
          </div>
        )}
      </GenericForm>
    </>
  );
}

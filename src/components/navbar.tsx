'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { userSignOut } from "@/store/features/user/authThunks";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import useWindowSize from "@/hooks/useWindowSize";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useAuthListener } from "@/hooks/useAuthListener";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function NavBar() {
  // Get current user and coin count from Redux
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const coins = useSelector((state: RootState) => state.game?.coins || 0);
  console.log("reduxUser:", reduxUser);

  const dispatch = useDispatch<AppDispatch>();
  useAuthListener();
  const user = useCurrentUser();

  if (user) {
    console.log(user);
  } else {
    console.log("User not logged in");
  }

  // Responsive design
  const { width } = useWindowSize();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleTogglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  // Sign out functionality
  const signOut = () => {
    dispatch(userSignOut());
  };

  // Get the current path to highlight active nav links
  const path = usePathname();

  // Reference for mobile panel (to close if clicking outside)
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref, handler: closePanel });

  // Navigation links component
  const navElements = () => {
    return (
      <>
        <Link href="/" className={`${path === "/" ? "active font-bold" : ""}`}>Home</Link>
        <Link href="/about" className={`${path === "/about" ? "active font-bold" : ""}`}>About Us</Link>
        <Link href="/market" className={`${path === "/market" ? "active font-bold" : ""}`}>Market</Link>
        {user ? (
          <>
            <span className="text-yellow-400 font-semibold">🪙 {coins} Coins</span>
            <FaRegUserCircle className="inline mx-2" />
            <button onClick={signOut} className="text-red-400 hover:underline">Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={`${path === "/auth/login" ? "active font-bold" : ""}`}>Sign In</Link>
            <Link href="/auth/signUp" className={`${path === "/auth/signUp" ? "active font-bold text-green-400 underline" : ""}`}>Sign Up</Link>
          </>
        )}
      </>
    );
  };

  
  return (
    <>
      <nav className="navbar flex gap-12 items-center justify-between p-4 bg-white shadow">
        <Link href="/" className="logo mr-auto cursor-pointer text-2xl font-bold text-green-600">
          MAKAN+
        </Link>
        {/* Coin Wallet Display */}
        <div
          className="text-yellow-600 font-bold text-sm flex items-center gap-1"
          title="Your Wallet: Coins earned from playing the Food Sorting Game"
        >
          🪙 {coins} Coins
        </div>
        {width && width < 910 ? (
          <button className="w-9 h-9" onClick={handleTogglePanel}>
            <IoMenuOutline className="w-full h-full cursor-pointer" />
          </button>
        ) : (
          navElements()
        )}
      </nav>
      {width && width < 910 && (
        <div
          ref={ref}
          className={`nav-panel fixed top-0 right-0 w-[80%] h-full z-[1] transition-transform duration-300 ease-out transform flex items-center justify-start flex-col gap-8 ${
            isPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="w-9 h-9 absolute right-8 top-[18px]" onClick={handleTogglePanel}>
            <IoClose className="w-full h-full cursor-pointer" />
          </button>
          {navElements()}
        </div>
      )}
    </>
  );
}

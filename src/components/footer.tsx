import React from "react";
import Link from "next/link";
// If you decide to keep icons, import them. Otherwise, remove FaGithub, etc.
// import { FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-start justify-start gap-3 mt-auto p-4">
      <div className="flex-1">
        {/* If you'd like a link back to your homepage */}
        <Link href="/" className="logo block leading-[12px] text-lg font-bold">
          MAKAN+
        </Link>
        
        {/* Remove or comment out the developer info if you don't want to show it */}
        {/* <span className="text-xs credits">
        </span> */}
        
        {/* External links can be removed entirely */}
        {/* 
        <div className="external-links flex items-center gap-2 pt-4">
          <a 
            target="_blank" 
            href="https://github.com/Jessietbl/makanplusweb" 
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a 
            target="_blank" 
            href="https://github.com/shaankho98/makanplus" 
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
        */}
      </div>
      
      {/* Optionally keep empty placeholders if you prefer layout spacing */}
      <div className="flex-1"></div>
      <div className="flex-1"></div>
    </footer>
  );
}

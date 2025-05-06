
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  withText?: boolean;
}

export function Logo({
  size = "md",
  className,
  withText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full bg-gradient-to-br from-journease-purple to-journease-purple-dark text-white flex items-center justify-center",
          sizeClasses[size]
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "size-3/4",
            size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6"
          )}
        >
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </div>
      {withText && (
        <span className="font-medium text-lg bg-gradient-to-r from-journease-purple-dark to-journease-purple bg-clip-text text-transparent">
          Journease
        </span>
      )}
    </div>
  );
}

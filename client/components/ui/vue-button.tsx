import * as React from "react";
import { cn } from "@/lib/utils";

export type VueButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "uiverse";
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<VueButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-8 text-base",
};

export const VueButton = React.forwardRef<HTMLButtonElement, VueButtonProps>(
  ({ className, children, variant = "solid", size = "md", ...props }, ref) => {
    if (variant === "outline") {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full p-[2px] transition-transform active:scale-[0.98]",
            "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 bg-[length:200%_200%] animate-gradient-x shadow-[0_4px_14px_0_rgba(16,185,129,.25)]",
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              "rounded-full bg-white text-emerald-700 hover:bg-emerald-50",
              sizeClasses[size],
              "px-6",
            )}
          >
            {children}
          </span>
        </button>
      );
    }

    if (variant === "ghost") {
      return (
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full text-emerald-700",
            sizeClasses[size],
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-emerald-200/0 before:via-white/50 before:to-emerald-200/0 before:opacity-0 hover:before:opacity-100 before:animate-shine",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    if (variant === "uiverse") {
      return (
        <button
          ref={ref}
          className={cn(
            "cursor-pointer font-black text-[18px] rounded-md border-[3px] border-black",
            "bg-[#fbca1f] px-6 py-2.5 shadow-[0.1em_0.1em_0_0_rgba(0,0,0,1)]",
            "transition-transform hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em_0_0_rgba(0,0,0,1)] active:translate-x-[0.05em] active:translate-y-[0.05em] active:shadow-[0.05em_0.05em_0_0_rgba(0,0,0,1)]",
            className,
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full text-white",
          sizeClasses[size],
          "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 bg-[length:200%_200%] animate-gradient-x shadow-[0_4px_14px_0_rgba(16,185,129,.25)]",
          "transition-transform active:scale-[0.98]",
          className,
        )}
        {...props}
      >
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md animate-shine" />
        </span>
        {children}
      </button>
    );
  },
);
VueButton.displayName = "VueButton";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-[1.02]",
        secondary:
          "glass text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-primary/50",
        ghost: "text-white hover:bg-white/5",
        cyan: "bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };

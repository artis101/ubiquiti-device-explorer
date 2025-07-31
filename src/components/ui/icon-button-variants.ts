import { cva } from "class-variance-authority";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-icon-focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-icon-default hover:bg-icon-hover-bg active:bg-icon-hover-bg active:text-icon-active",
        active: "bg-icon-hover-bg text-icon-active",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-8 w-8",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

import { cn } from "@/lib/utils";
import type { ButtonProps } from "./button";

const CustomButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "custom-gradient px-7 py-3 text-base block rounded-lg bg-primary text-primary-foreground focus:ring-2 ring-violet-500 ring-offset-2 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;

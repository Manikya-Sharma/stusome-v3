import { cn } from "@/lib/utils";
import type { ButtonProps } from "./button";

const CustomButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "custom-gradient block rounded-lg bg-primary px-7 py-3 text-base text-primary-foreground ring-violet-500 ring-offset-2 focus:ring-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;

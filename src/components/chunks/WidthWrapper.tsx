import { cn } from "@/lib/utils";

const WidthWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className, "w-ful mx-auto px-4 sm:px-8 lg:max-w-5xl")}>
      {children}
    </div>
  );
};

export default WidthWrapper;

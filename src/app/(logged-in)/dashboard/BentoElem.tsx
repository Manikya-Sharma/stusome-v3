import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const BentoElem = ({
  heading,
  address,
  children,
}: {
  heading: string;
  address: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="relative p-3 h-full">
      <h2 className="flex items-center justify-between">
        <span className="text-lg tracking-tight font-semibold">{heading}</span>
        <Link
          href={address}
          className={buttonVariants({ variant: "ghost" })}
          aria-label={`Open all ${heading}`}
        >
          <ArrowRight className="size-4" />
        </Link>
      </h2>
      <div className="h-px w-full my-3 bg-black/10" />
      <div className="h-[55%] overflow-auto">{children}</div>
    </section>
  );
};

export default BentoElem;

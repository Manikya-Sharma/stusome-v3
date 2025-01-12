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
    <section className="relative pt-0 p-3 h-full overflow-auto">
      <div className="sticky top-0 z-10 bg-slate-50 dark:bg-zinc-950">
        <h2 className="flex pt-3 items-center justify-between">
          <span className="text-lg tracking-tight font-semibold">
            {heading}
          </span>
          <Link
            href={address}
            className={buttonVariants({ variant: "ghost" })}
            aria-label={`Open all ${heading}`}
          >
            <ArrowRight className="size-4" />
          </Link>
        </h2>
        <div className="h-px w-full my-3 bg-black/10 dark:bg-white/40" />
      </div>
      <div>{children}</div>
    </section>
  );
};

export default BentoElem;

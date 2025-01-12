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
    <section className="relative h-full overflow-auto p-3 pt-0">
      <div className="sticky top-0 z-10 bg-slate-50 dark:bg-zinc-950">
        <h2 className="flex items-center justify-between pt-3">
          <span className="text-lg font-semibold tracking-tight">
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
        <div className="my-3 h-px w-full bg-black/10 dark:bg-white/40" />
      </div>
      <div>{children}</div>
    </section>
  );
};

export default BentoElem;

import { Button } from "@/components/ui/button";
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
      <div className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800">
        <h2 className="flex items-center justify-between pt-3">
          <span className="text-lg font-semibold tracking-tight">
            {heading}
          </span>
          <Button variant="ghost" asChild>
            <Link href={address} aria-label={`Open all ${heading}`}>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </h2>
        <div className="my-3 h-px w-full bg-black/20 dark:bg-white/25" />
      </div>
      <div>{children}</div>
    </section>
  );
};

export default BentoElem;

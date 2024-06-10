import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Meh } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-96px)] w-screen flex-col items-center justify-center gap-5">
      <Meh className="size-1/4" />
      <p className="-mt-2 text-4xl font-semibold">Not Found</p>
      <p className="text-lg text-muted-foreground">
        You&apos;ve come at wrong place!
      </p>
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
};

export default Page;

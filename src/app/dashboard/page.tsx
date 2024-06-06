"use client";

import WidthWrapper from "@/components/chunks/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <WidthWrapper>
      <Link href="/post-creator" className={buttonVariants()}>
        Create a new post
      </Link>
    </WidthWrapper>
  );
};

export default Page;

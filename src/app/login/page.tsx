import WidthWrapper from "@/components/chunks/WidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import GoogleLoginButton from "./GoogleLoginButton";
import GithubLoginButton from "./GithubLoginButton";
import { getServerSession } from "next-auth";

const Page = async () => {
  const data = await getServerSession();
  return (
    <WidthWrapper className="-mt-10 flex min-h-screen flex-col items-center justify-center gap-10 md:flex-row md:justify-around">
      <div className="relative aspect-[400/150] w-[13rem]">
        <Image src="/logo-full-tx.png" alt="logo" fill />
      </div>
      <Card className="flex w-full max-w-prose flex-col items-center justify-center gap-5 px-5 py-2">
        <div className="text-center">
          <CardHeader className="text-4xl leading-relaxed tracking-tighter">
            Login or Sign Up
          </CardHeader>
          <CardDescription className="text-md -mt-6 leading-relaxed tracking-wide">
            Login to your{" "}
            <span className="font-bold text-primary">stusome</span> account
          </CardDescription>
        </div>
        <CardContent className="flex flex-col items-center gap-2">
          <GoogleLoginButton />
          <GithubLoginButton />
        </CardContent>
      </Card>
    </WidthWrapper>
  );
};

export default Page;

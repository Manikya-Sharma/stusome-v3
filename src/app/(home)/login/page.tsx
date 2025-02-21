import { auth } from "@/lib/auth";
import Link from "next/link";
import LoginSessionRedirection from "./LoginSessionRedirection";
import LoginTiles from "./LoginTiles";
import ToastMessage from "./ToastMessage";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <main className="-mt-5 flex h-[80%] w-[90vw] rounded-sm bg-white dark:bg-slate-800 md:w-[70vw]">
        {session ? (
          <LoginSessionRedirection />
        ) : (
          <>
            <ToastMessage />
            <div className="flex-1 px-10 pt-20">
              <h1 className="text-4xl font-semibold tracking-tight">
                Welcome to Stusome
              </h1>
              <p className="mt-2 text-sm tracking-wide text-muted-foreground">
                Begin your journey to a{" "}
                <span className="text-blue-500 dark:text-blue-300">better</span>{" "}
                social media
              </p>
              <div className="mt-14">
                <LoginTiles />
              </div>
              <p className="absolute bottom-10 text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link
                  href="/toc"
                  className="text-blue-500 underline hover:no-underline dark:text-blue-400"
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>
            <div className="hidden flex-[1.5] md:block">
              {/* TODO: Replace div with image */}
              <div className="h-full w-full rounded-sm rounded-tl-[7rem] bg-slate-300 dark:bg-black" />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Page;

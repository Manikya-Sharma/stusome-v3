import Navbar from "../../components/Navbar";
import LoginTiles from "./LoginTiles";
import LoginSessionRedirection from "./LoginSessionRedirection";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const session = await auth();
  return (
    <div className="relative min-h-screen w-full bg-blue-50 dark:bg-zinc-900">
      {session?.user?.email && session.user.id ? (
        <LoginSessionRedirection
          profilePicture={session.user.image ?? undefined}
          email={session.user.email}
          userId={session.user.id}
        />
      ) : (
        <>
          <Navbar className="bg-transparent" withoutButtons />
          <main className="absolute mt-7 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90vw] md:w-[70vw] h-[85vh] bg-white dark:bg-zinc-800 rounded-sm flex">
            <div className="pt-20 px-10 flex-1">
              <h1 className="font-semibold text-4xl tracking-tight">
                Welcome to Stusome
              </h1>
              <p className="mt-2 text-muted-foreground text-sm tracking-wide">
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
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "underline px-0",
                  })}
                  href="/toc"
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>
            <div className="hidden md:block flex-[1.5]">
              {/* TODO: Replace div with image */}
              <div className="w-full h-full bg-slate-300 dark:bg-black rounded-tl-[7rem] rounded-sm" />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Page;

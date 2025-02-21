import LoginTiles from "@/modules/login/components/login-tiles";
import ToastMessage from "@/modules/login/components/toast-message";
import Link from "next/link";

const LoginNoSession = () => {
  return (
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
  );
};

export default LoginNoSession;

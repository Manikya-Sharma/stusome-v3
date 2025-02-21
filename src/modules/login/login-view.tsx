import LoginAfterSession from "@/modules/login/components/login-after-session";
import LoginNoSession from "./components/login-no-session";

const LoginView = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <main className="-mt-5 flex h-[80%] w-[90vw] rounded-sm bg-white dark:bg-slate-800 md:w-[70vw]">
        {isLoggedIn ? <LoginAfterSession /> : <LoginNoSession />}
      </main>
    </div>
  );
};

export default LoginView;

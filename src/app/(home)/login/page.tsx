import { auth } from "@/lib/auth";
import LoginView from "@/modules/login/login-view";

const Page = async () => {
  const session = await auth();
  return <LoginView isLoggedIn={session !== null} />;
};

export default Page;

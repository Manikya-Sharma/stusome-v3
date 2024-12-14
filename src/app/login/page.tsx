import Navbar from "../components/Navbar";
import LoginTiles from "./LoginTiles";
import LoginSessionRedirection from "./LoginSessionRedirection";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div>
      {session?.user?.email && session.user.id ? (
        <LoginSessionRedirection
          email={session.user.email}
          userId={session.user.id}
        />
      ) : (
        <div>{session?.user?.id}</div>
      )}
      <Navbar />
      <LoginTiles />
    </div>
  );
};

export default Page;

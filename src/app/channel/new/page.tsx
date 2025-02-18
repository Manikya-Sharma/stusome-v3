import SessionRedirect from "@/components/SessionRedirect";
import CreateChannelForm from "./CreateChannelForm";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <div>
      <SessionRedirect
        callbackUrl="/channel/new"
        message="You need to login to create a channel"
      />
      <Navbar withoutButtons />
      <CreateChannelForm />
    </div>
  );
};

export default Page;

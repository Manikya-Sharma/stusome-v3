import SessionRedirect from "@/components/SessionRedirect";

const Page = () => {
  return (
    <div>
      <SessionRedirect
        callbackUrl="/channel/new"
        message="You need to login to create a channel"
      />
      Page
    </div>
  );
};

export default Page;

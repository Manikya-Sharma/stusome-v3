import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="h-[calc(100vh-100px)]">{children}</div>
    </div>
  );
};

export default Layout;

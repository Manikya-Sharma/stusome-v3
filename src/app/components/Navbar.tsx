"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.email ? (
        <>
          <Link href="/dashboard">Dashboard</Link>{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </>
  );
};

export default Navbar;

"use client";

import { signIn } from "next-auth/react";

const LoginTiles = () => {
  return (
    <div>
      <button onClick={() => signIn("github")}>Login with GitHub</button>
    </div>
  );
};

export default LoginTiles;

"use client";

import { usePathname } from "next/navigation";

const Pathname = () => {
  const pathName = usePathname();
  return <>{pathName.substring(1, 2).toUpperCase() + pathName.substring(2)}</>;
};

export default Pathname;

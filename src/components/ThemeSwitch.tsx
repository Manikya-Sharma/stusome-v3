"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center">
      {theme === "dark" ? (
        <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
          <Sun className="size-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
          <Moon className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ThemeSwitch), { ssr: false });

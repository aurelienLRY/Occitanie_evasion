"use client";

import { useTheme } from "next-themes";
import { SunIcon , MoonIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const {  setTheme , theme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  } 

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };



  return (

    <button
      className="theme-switch-button  group w-10 h-10"
      onClick={handleThemeChange}
      aria-label="Changer le thème"
    >
      <div className="relative flex items-center justify-center p-1">
        
        {theme === "dark" ? (
          <SunIcon className=" w-5 h-5 group-hover:text-secondary transition-all duration-300" />
        ) : (
          <MoonIcon className=" w-5 h-5 group-hover:text-secondary transition-all duration-300" />
        )}
      </div>
    </button>
  );
}
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

export default function ThemeSwitcher() {
   const [mounted, setMounted] = useState<boolean>(false);
   const { theme, setTheme } = useTheme();

   useEffect(() => {
      setMounted(true);
   }, []);


   // Mounted Container:
   if (!mounted) {
      return <div className="w-6 h-6" />;
   }

   // get Next Theme
   const nextTheme = theme === "dark" ? "light" : "dark";

   return (

      //Next Theme Button
      <div onClick={() => setTheme(nextTheme)} className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg w-10 h-10 hover:scale-110 transition-all duration-300 hover:bg-emerald-500/20">
         {theme === "dark" ? <FiSun size={25}/> : <MdDarkMode size={25}/>}
      </div>
   );
}
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link as IntLink } from "@/i18n/navigation";
import ThemeSwitcher from "./ThemeSwitcher";



export default function Navbar() {


   const [isOpen, setIsOpen] = useState<boolean>(false);
   const t = useTranslations("navbar");
   const locale = useLocale();
   const pathName = usePathname();
   const nextLocal = locale === "en" ? "ar" : "en";
   
   
   return (
      <div
         className={`bg-white dark:bg-zinc-950  ${isOpen ? "h-full md:h-20" : " h-20 md:h-20"} w-full overflow-hidden flex justify-between items-start  md:items-center fixed z-10 pt-6 transition-all duration-400 border-b border-emerald-600 dark:border-emerald-700 px-4`}
      >
         {/* content container: */}
         <div className="flex flex-col md:flex-row gap-8 w-full justify-between items-start">


            {/* logo and name: */}
            <div className="flex gap-2 justify-center items-center">

               {/* logo: */}
               <div className="bg-emerald-800/80 dark:bg-emerald-700/50 w-10 h-10 flex justify-center items-center text-xl font-bold rounded-sm border-1 border-emerald-800">
                  <p className="text-gray-200">M</p>
               </div>

               {/* name: */}
               <p className="text-xl text-emerald-800 dark:text-emerald-500">
                  {t("title")}
               </p>
            </div>



            {/* Links List: */}
            <ul
               className={`${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} transition-all duration-400 flex flex-col md:flex-row  pb-4 w-full md:w-auto`}
            >

               {/* Home link */}
               <IntLink
                  onClick={() => {
                  setIsOpen(false);
                  }}
                  href={"/"}
               >
                  <li
                  className={`text-xl ${pathName === "/" ? "bg-emerald-500/10 rounded-lg shadow-inner shadow-emerald-700" : "bg-transparent"}  text-emerald-800 dark:text-emerald-500 hover:text-emerald-700 cursor-pointer w-full p-4 md:p-2  transition-all duration-200 flex min-w-30 justify-start md:justify-center items-center `}
                  >
                  {t("links.home")}
                  </li>
               </IntLink>
               

               {/* Skills link: */}
               <IntLink
                  onClick={() => {
                  setIsOpen(false);
                  }}
                  href={"/skills"}
               >
                  <li
                  className={`text-xl ${pathName === "/skills" ? "bg-emerald-500/10 rounded-lg shadow-inner shadow-emerald-700" : "bg-transparent"}  text-emerald-800 dark:text-emerald-500 hover:text-emerald-700 cursor-pointer w-full p-4 md:p-2  transition-all duration-200 flex min-w-30 justify-start md:justify-center items-center`}
                  >
                  {t("links.skills")}
                  </li>
               </IntLink>


               {/* Projects link: */}
               <IntLink
                  onClick={() => {
                  setIsOpen(false);
                  }}
                  href={"/projects"}
               >
                  <li
                  className={`text-xl ${pathName === "/projects" ? "bg-emerald-500/10 rounded-lg shadow-inner shadow-emerald-700" : "bg-transparent"}  text-emerald-800 dark:text-emerald-500 hover:text-emerald-700 cursor-pointer w-full p-4 md:p-2  transition-all duration-200 flex min-w-30 justify-start md:justify-center items-center`}
                  >
                  {t("links.projects")}
                  </li>
               </IntLink>


               {/* Learning link */}
               <IntLink
                  onClick={() => {
                  setIsOpen(false);
                  }}
                  href={"/projects/archive"}
               >
                  <li
                  className={`text-xl ${pathName === "/projects/learning" ? "bg-emerald-500/10 rounded-lg shadow-inner shadow-emerald-700" : "bg-transparent"}  text-emerald-800 dark:text-emerald-500 hover:text-emerald-700 cursor-pointer w-full p-4 md:p-2  transition-all duration-200 flex min-w-30 justify-start md:justify-center items-center`}
                  >
                  {t("links.projects/archive")}
                  </li>
               </IntLink>


               {/* Contact link */}
               <IntLink
                  onClick={() => {
                  setIsOpen(false);
                  }}
                  href={"/contact"}
               >
                  <li
                  className={`text-xl ${pathName === "/contact" ? "bg-emerald-500/10 rounded-lg shadow-inner shadow-emerald-700" : "bg-transparent"}  text-emerald-800 dark:text-emerald-500 hover:text-emerald-700 cursor-pointer w-full p-4 md:p-2  transition-all duration-200 flex min-w-30 justify-start md:justify-center items-center`}
                  >
                  {t("links.contact")}
                  </li>
               </IntLink>
            </ul>



            {/* theme and language: */}
            <div className="flex gap-4 justify-center items-center">

               {/* language Button: */}
               <IntLink
                  className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg"
                  href={pathName}
                  locale={nextLocal}
               >
                  <IoLanguageOutline size={25} />
               </IntLink>
               
               {/* Theme button: */}
               <ThemeSwitcher />
            </div>



         </div>



         {/* close and open icons: */}
         <div className="flex md:hidden">


         {isOpen ? (
            <IoMdClose
               className="text-xl text-emerald-800 dark:text-emerald-500"
               onClick={() => {
               setIsOpen(!isOpen);
               }}
               size={25}
            />
         ) : (
            <CiMenuBurger
               className="text-xl text-emerald-800 dark:text-emerald-500"
               onClick={() => {
               setIsOpen(!isOpen);
               }}
               size={25}
            />
         )}
         </div>
      </div>
   );
}

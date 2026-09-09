"use client";

import { useTranslations } from "next-intl";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link as IntLink } from "@/i18n/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import { IoLanguageOutline } from "react-icons/io5";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const pathName = usePathname();

  return (
    // Main Container:
    <div className="w-full border-t border-gray-300 dark:border-gray-800 flex flex-col p-4 justify-center items-center ">
      {/* Links & preferences container: */}
      <div className="flex flex-col md:flex-row gap-8 pt-4 justify-around w-full md:w-8/12">
        {/* name and media links */}
        <div className=" w-full md:w-1/2">
          {/* name and logo: */}
          <div className="flex justify-start items-center gap-2">
            <div className="bg-emerald-800/80 dark:bg-emerald-700/50 w-8 h-8 hidden md:flex justify-center items-center text-xl font-bold rounded-sm border border-emerald-800 ">
              <p className="text-gray-200">M</p>
            </div>
            <p className="text-lg font-bold">{t("name")}</p>
          </div>

          {/* links Icons */}
          <div className="flex gap-4 text-lg my-2 mx-0 md:mx-10">
            {/* Linked in Icon */}
            <Link
              href="https://www.linkedin.com/in/mohammad-samer-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg w-10 h-10 flex justify-center items-center hover:scale-110 transition-all duration-300 hover:bg-emerald-500/20"
            >
              <FaLinkedinIn />
            </Link>

            {/* Github Icon */}
            <Link
              href={"https://github.com/Mohammadev-71"}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg w-10 h-10 flex justify-center items-center hover:scale-110 transition-all duration-300 hover:bg-emerald-500/20"
            >
              <FiGithub />
            </Link>

            {/* Whatsapp Icon: */}
            <Link
              href={"https://wa.me/971562650112"}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg w-10 h-10 flex justify-center items-center hover:scale-110 transition-all duration-300 hover:bg-emerald-500/20"
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>

        {/* Quick links and Preference Container: */}
        <div className="flex w-full md:w-1/2 justify-between items-start mb-10">
          {/* quick links container: */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">{t("quickLinks")}</p>
            <IntLink
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-700 transition-all duration-300"
              href={"/"}
            >
              {t("home")}
            </IntLink>
            <IntLink
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-700 transition-all duration-300"
              href={"/skills"}
            >
              {t("skills")}
            </IntLink>
            <IntLink
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-700 transition-all duration-300"
              href={"/projects"}
            >
              {t("projects")}
            </IntLink>
            <IntLink
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-700 transition-all duration-300"
              href={"/projects/learning"}
            >
              {t("learning")}
            </IntLink>
            <IntLink
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-700 transition-all duration-300"
              href={"/contact"}
            >
              {t("contact")}
            </IntLink>
          </div>

          {/* preference */}
          <div className="">
            <p className="text-lg font-bold">{t("preference")}</p>
            <div className="flex gap-2 my-2">

              
              {/* Language Button */}
              <IntLink
                className="cursor-pointer text-emerald-500 p-2 bg-emerald-500/10 rounded-lg w-10 h-10 flex justify-center items-center hover:scale-110 transition-all duration-300 hover:bg-emerald-500/20"
                href={pathName}
                locale={nextLocale}
              >
                <IoLanguageOutline size={25} />
              </IntLink>

              {/* Theme Button */}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Rights Container: */}
      <div className="border-t border-gray-300 dark:border-gray-800 w-full flex justify-center items-center text-gray-700 dark:text-gray-300 pt-4 pb-10">
        <p>{t("rights")}</p>
      </div>
    </div>
  );
}

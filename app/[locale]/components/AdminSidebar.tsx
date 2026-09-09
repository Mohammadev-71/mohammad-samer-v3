'use client'

import {
   LuArrowUpRight as ArrowUpRight,
   LuBoxes as Boxes,
   LuLayoutDashboard as LayoutDashboard,
   LuCodeXml
} from "react-icons/lu";

import {useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

export default function AdminSidebar(){
   const t = useTranslations("admin.dashboard");
   const pathName = usePathname()

      const navItems = [
         {label: t("nav.overview"),icon: LayoutDashboard,href: "/dashboard",},
         { label: t("nav.skills"), icon: Boxes, href: "/dashboard/skills" },
         { label: t("nav.projects"), icon: LuCodeXml, href: "/dashboard/projects" },
      ];


   if(pathName==="/dashboard/login"){
      return <></>
   }
   return(
      <aside className="hidden lg:block min-w-1/6">
         <div className="sticky top-32 border-e border-emerald-900/10 pe-6 dark:border-emerald-100/10">
            <p className="mb-5 px-3 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700/60 dark:text-emerald-400/60">
               {t("workspace")}
            </p>
            <nav className="space-y-1">
               {navItems.map(({ label, icon: Icon, href }) => (
                  <Link
                     key={label}
                     href={href}
                     className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition ${pathName===href ? "bg-emerald-700 text-white shadow-lg shadow-emerald-900/15" : "text-zinc-600 hover:bg-emerald-700/8 hover:text-emerald-800 dark:text-zinc-400 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300"}`}
                     >
                     <span className="flex items-center gap-3">
                        <Icon size={18} />
                        {label}
                     </span>
                  </Link>
               ))}
            </nav>
            <div className="mt-10 border-t border-emerald-900/10 pt-5 dark:border-emerald-100/10">
               <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-zinc-500 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300"
               >
                  <ArrowUpRight size={18} />
                  {t("viewSite")}
               </Link>
            </div>
         </div>
      </aside>
   )
}
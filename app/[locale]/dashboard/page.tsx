"use client";

import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";
import {useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
   LuActivity as Activity,
   LuBoxes as Boxes,
   LuFolderKanban as FolderKanban,
   LuEllipsis as MoreHorizontal,
   LuPlus as Plus,
} from "react-icons/lu";

import { getDashboardStats } from "../dataHandlers/dashboardHandlers";

const { projects, skills } = await getDashboardStats();




export default function Dashboard() {
   const { data: session, isPending } = authClient.useSession();
   const t = useTranslations("admin.dashboard");
   

   if (isPending) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-white text-emerald-800 dark:bg-zinc-950 dark:text-emerald-400 w-full">
         <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {t("loading")}
         </div>
         </div>
      );
   }

   if (!session) {
      redirect("/dashboard/login");
   }
   
   const firstName = session?.user?.name?.split(" ")[0] || t("fallbackName");




   return (
      <section className="w-full h-1/2 p-10">
               <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
               <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                     <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                     {t("eyebrow")}
                  </div>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                     {t("greeting", { name: firstName })}
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                     {t("intro")}
                  </p>
               </div>
               <Link
                  href={"/dashboard/projects"}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800"
               >
                  <Plus size={18} />
                  {t("newProject")}
               </Link>
               </div>

               <div className="mb-8 grid gap-4 sm:grid-cols-3">
               {[
                  {
                     label: t("stats.projects"),
                     value: projects,
                     change: "+18%",
                     icon: FolderKanban,
                  },
                  {
                     label: t("stats.skills"),
                     value: skills,
                     change: "+6%",
                     icon: Boxes,
                  },
                  {
                     label: t("stats.uptime"),
                     value: "99.9%",
                     change: t("stats.stable"),
                     icon: Activity,
                  },
               ].map(({ label, value, change, icon: Icon }) => (
                  <div
                     key={label}
                     className="border border-emerald-900/10 bg-white p-5 shadow-[0_12px_30px_rgba(15,75,52,0.05)] dark:border-emerald-100/10 dark:bg-zinc-900/70"
                  >
                     <div className="mb-5 flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                     <Icon size={20} />
                     <MoreHorizontal className="text-zinc-300" size={18} />
                     </div>
                     <p className="text-3xl font-black tracking-tight">{value}</p>
                     <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                     <span className="text-zinc-500 dark:text-zinc-400">
                        {label}
                     </span>
                     <span className="font-bold text-emerald-600">{change}</span>
                     </div>
                  </div>
               ))}
               </div>

            </section>
   );
}

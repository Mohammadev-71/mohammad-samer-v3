"use client";

import { useEffect, useState } from "react";
import { Link as IntLink, useRouter } from "@/i18n/navigation";
import { authClient } from "@/src/lib/auth-client";
import {
   createProjectHandler,
   getSkillsHandler,
} from "@/app/[locale]/dataHandlers/dashboardHandlers";
import {
   LuArrowLeft,
   LuCalendarDays,
   LuImage,
   LuLink,
   LuPlus,
   LuSave,
   LuTags,
   LuFlaskConical
} from "react-icons/lu";
import { addProjectValidationSchema } from "@/src/lib/units/validationSchemas";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";


type ProjectType = "VANILLA" | "FRONTEND" | "BACKEND" | "FULLSTACK";

interface Skill {
   id: string;
   skill: string;
}

export default function Projects() {
   const {data: session,isPending } = authClient.useSession()
   const router = useRouter();
   const [skills, setSkills] = useState<Skill[]>([]);
   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
   const [isSaving, setIsSaving] = useState(false);
   const [message, setMessage] = useState("");
   const t = useTranslations("admin.projects")
   const [form, setForm] = useState({
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      img: "",
      sourceLink: "",
      liveLink: "",
      finishDate: "",
      type: "FULLSTACK" as ProjectType,
      isLearning: false,
   });


   
   // get skills
   useEffect(() => {
      getSkillsHandler().then(setSkills);
   }, []);

   if (isPending) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-white text-emerald-800 dark:bg-zinc-950 dark:text-emerald-400 w-full ">
         <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Loading...
         </div>
         </div>
      );
   }

   if (!session) {
      redirect("/dashboard/login");
   }


   const updateField = (field: keyof typeof form, value: string) => {
      setForm((current) => ({ ...current, [field]: value }));
   };


   // Toggle skills handler:
   const toggleSkill = (skill: string) => {
      setSelectedSkills((current) =>   
         current.includes(skill)
         ? current.filter((item) => item !== skill)
         : [...current, skill],
      );
   };

   // Submit handler:
   const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validation:
      const validationResult = addProjectValidationSchema.safeParse({...form,skillsUsed: selectedSkills,})

      // if validation failed :
      if(!validationResult.success){

         // error formatting:
         const error = Object.values(validationResult.error.flatten().fieldErrors||{})?.[0]?.[0]
         
         // Show error message:
         alert(`${validationResult?.error?.issues?.[0]?.path } [ ${validationResult?.error?.issues?.[0]?.message} ]`)
         return
      }


      // if validation success:
      try {
         setIsSaving(true);
         setMessage("");
         await createProjectHandler({
         ...form,
         titleEn: form.titleEn.trim(),
         titleAr: form.titleAr.trim(),
         descriptionEn: form.descriptionEn.trim(),
         descriptionAr: form.descriptionAr.trim(),
         skillsUsed: selectedSkills,
         finishDate: form.finishDate ? new Date(form.finishDate) : undefined,
         });
         router.push("/dashboard");


      } catch {
         setMessage("Something went wrong. Please try again.");


      } finally {
         setIsSaving(false);
      }
   };



   return (
      
      // main container:
      <div className="w-full m-10">


         {/* Dashboard link */}
         <IntLink
            href={'/dashboard'}
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
         >
            <LuArrowLeft size={17} />
            {t("backBtn")}
         </IntLink>

         {/* Header page container: */}
         <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
               {t("header")}
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
               {t("title")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
               {t("subtitle")}
            </p>
         </div>

         <form
            onSubmit={submitHandler}
            className="grid gap-6 lg:grid-cols-[1fr_280px]"
         >

            <section className="border border-emerald-900/10 bg-white p-5 shadow-[0_14px_35px_rgba(15,75,52,0.06)] dark:border-emerald-100/10 dark:bg-zinc-900/80 sm:p-7">
               <div className="mb-7 flex items-center gap-3 border-b border-zinc-100 pb-5 dark:border-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                     <LuPlus size={20} />
                  </div>
                  <div>
                     <h2 className="font-black">{t("formTitle")}</h2>
                     <p className="text-xs text-zinc-500">
                        {t("formSubtitle")}
                     </p>
                  </div>
               </div>

               <div className="space-y-5">


                  {/* Title En field: */}
                  <label className="block">
                     <span className="mb-2 block text-sm font-bold">
                        {t("fields.titleEn.label")} <em className="text-emerald-600">*</em>
                     </span>
                     <input
                        required
                        value={form.titleEn}
                        onChange={(event) => updateField("titleEn", event.target.value)}
                        placeholder={t("fields.titleEn.placeholder")}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                     />
                  </label>
                  {/* Title AR field: */}
                  <label className="block">
                     <span className="mb-2 block text-sm font-bold">
                        {t("fields.titleAr.label")} <em className="text-emerald-600">*</em>
                     </span>
                     <input
                        required
                        value={form.titleAr}
                        onChange={(event) => updateField("titleAr", event.target.value)}
                        placeholder={t("fields.titleAr.placeholder")}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                     />
                  </label>

                  {/* Description field: */}
                  <label className="block">
                     <span className="mb-2 block text-sm font-bold">
                        {t("fields.descriptionEn.label")}
                     </span>
                     <textarea
                        value={form.descriptionEn}
                        onChange={(event) =>
                        updateField("descriptionEn", event.target.value)
                        }
                        placeholder={t("fields.descriptionEn.placeholder")}
                        rows={5}
                        className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                     />
                  </label>
                  {/* Description field: */}
                  <label className="block">
                     <span className="mb-2 block text-sm font-bold">
                        {t("fields.descriptionAr.label")}
                     </span>
                     <textarea
                        value={form.descriptionAr}
                        onChange={(event) =>
                        updateField("descriptionAr", event.target.value)
                        }
                        placeholder={t("fields.descriptionAr.placeholder")}
                        rows={5}
                        className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                     />
                  </label>

                  {/* Img url field: */}
                  <label className="block">
                     <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <LuImage size={16} className="text-emerald-600" />
                        
                        {t("fields.img.label")}
                     </span>
                     <input
                        type="url"
                        value={form.img}
                        onChange={(event) => updateField("img", event.target.value)}
                        placeholder={t("fields.img.placeholder")}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                     />
                  </label>

                  {/* live link and source code container: */}
                  <div className="grid gap-5 sm:grid-cols-2">

                     {/* Live link field: */}
                     <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <LuLink size={16} className="text-emerald-600" />
                        
                        {t("fields.liveLink.label")}
                        </span>
                        <input
                        type="url"
                        value={form.liveLink}
                        onChange={(event) =>
                           updateField("liveLink", event.target.value)
                        }
                        placeholder={t("fields.liveLink.placeholder")}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                     </label>


                     {/* source code field */}
                     <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <LuLink size={16} className="text-emerald-600" />
                        
                        {t("fields.sourceLink.label")}
                        </span>
                        <input
                        type="url"
                        value={form.sourceLink}
                        onChange={(event) =>
                           updateField("sourceLink", event.target.value)
                        }
                        placeholder={t("fields.sourceLink.placeholder")}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                     </label>
                  </div>


               </div>
            </section>



            <aside className="space-y-6">



               {/* Project settings: */}
               <section className="border border-emerald-900/10 bg-white p-5 shadow-[0_14px_35px_rgba(15,75,52,0.06)] dark:border-emerald-100/10 dark:bg-zinc-900/80">
               <h2 className="mb-5 font-black">{t("settings.title")}</h2>

               {/* type field: */}
               <label className="mb-5 block">
                  <span className="mb-2 block text-sm font-bold">
                     Project type
                  </span>
                  <select
                     value={form.type}
                     onChange={(event) => updateField("type", event.target.value)}
                     className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950"
                  >
                     <option value="FULLSTACK">Full-stack</option>
                     <option value="FRONTEND">Frontend</option>
                     <option value="BACKEND">Backend</option>
                     <option value="VANILLA">Vanilla</option>
                  </select>
               </label>


               {/* Finish date field: */}
               <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                     <LuCalendarDays size={16} className="text-emerald-600" />
                     {t("fields.finishDate.label")}
                  </span>
                  <input
                     type="date"
                     value={form.finishDate}
                     onChange={(event) =>
                     updateField("finishDate", event.target.value)
                     }
                     className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm outline-none focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-950"
                  />
               </label>


               {/* is learning project: */}
               <label className=" my-2 flex gap-2 justify-between items-center">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold mt-4">
                     <LuFlaskConical size={16} className="text-emerald-600" />
                     
                     {t("fields.isLearning.label")}
                  </span>
                  <input
                     type="checkbox"
                     checked={form.isLearning}
                     onChange={(event) =>
                     updateField("isLearning",String(event.target.checked))
                     }
                     className="w-4 h-4 rounded border border-zinc-200 bg-zinc-50 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950"
                  />
               </label>
               
               </section>


               {/* technologies container: */}

               <section className="border border-emerald-900/10 bg-white p-5 shadow-[0_14px_35px_rgba(15,75,52,0.06)] dark:border-emerald-100/10 dark:bg-zinc-900/80">
               <h2 className="mb-2 flex items-center gap-2 font-black">
                  <LuTags size={17} className="text-emerald-600" />
                  Technologies

               </h2>
               <p className="mb-4 text-xs leading-5 text-zinc-500">
                  Select the skills used in this project.
               </p>
               <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                     <button
                     key={skill.id}
                     type="button"
                     onClick={() => toggleSkill(skill.skill)}
                     className={`rounded-md border px-2.5 py-1.5 text-xs font-bold transition ${selectedSkills.includes(skill.skill) ? "border-emerald-600 bg-emerald-600 text-white" : "border-zinc-200 text-zinc-500 hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-400"}`}
                     >
                     {skill.skill}
                     </button>
                  ))}
               </div>
               {skills.length === 0 && (
                  <p className="text-xs text-zinc-400">
                     Add skills first to select them here.
                  </p>
               )}
               </section>
               {message && (
               <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                  {message}
               </p>
               )}
               <button  
               type="submit"
               disabled={isSaving}
               className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
               >
               <LuSave size={17} />
               {isSaving ? "Saving project..." : "Save project"}
               </button>
            </aside>
         </form>
      </div>
   );
}

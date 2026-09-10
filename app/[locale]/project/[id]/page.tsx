import { prisma } from "@/src/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuExternalLink,
  LuGithub,
  LuLayers3,
} from "react-icons/lu";
import CommentBox from "../../components/commentBox";
import { Link as IntLink } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";


export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations("projectDetails");
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const isEnglish = locale === "en";

  const title = isEnglish
    ? project.titleEn
    : project.titleAr || project.titleEn;

  const description = isEnglish
    ? project.descriptionEn || "No project description is available yet."
    : project.descriptionAr || "لا توجد وصفية متاحة حالياً.";

  return (


    // Main container:
    <main className="min-h-screen w-full bg-white px-4 pb-16 pt-28 dark:bg-black sm:px-6 lg:px-10 flex flex-col justify-center items-center relative gap-10">
      {/* background light */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-0 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_68%)]" />

      {/* Comment box */}
      <CommentBox comment={`// ${title}`} />

      {/* Project details container */}
      <section className="mx-auto max-w-7xl z-2">


        {/* Project header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 animate-popIn [animation-duration:0.5s]">

          {/* Back button */}
          <IntLink
            href={`/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-white px-4 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-500/10 dark:border-emerald-300/20 dark:bg-zinc-900 dark:text-emerald-400"
          >
            <LuArrowLeft size={16} />
            {t("backBtn")}
          </IntLink>

          {/* Project type */}
          <span className="rounded-full border border-emerald-800/20 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            {project.type}
          </span>
        </div>


        {/* Project content */}
        <article className="grid items-stretch gap-8 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]  animate-popIn [animation-duration:0.5s] p-4 w-screen md:w-auto overflow-hidden ">

            {/* Project image */}
          <section className="overflow-hidden rounded-4xl border border-emerald-500 bg-white shadow-sm shadow-emerald-500 dark:border-emerald-800 dark:bg-zinc-900  lg:max-w-none">
            
            <div className="relative aspect-16/11 overflow-hidden bg-emerald-900/10">
              <Image
                className="object-cover transition duration-700 hover:scale-105"
                fill
                loading="eager"
                sizes="(max-width: 768px) 100%, 55%"
                src={
                  project.img ||
                  "https://images.unsplash.com/photo-1682685794700-1f3e7b8c5d4e?auto=format&fit=crop&w=1170&q=80"
                }
                alt={title}
              />
              

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/5 to-transparent" />

              {/* Project type badge */}
              <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {project.isLearning?t("learning"):t("project")}
              </span>
            </div>
          </section>



          {/* Project details */}
          <section className="flex flex-col justify-between rounded-4xl border bg-gray-50 p-8 shadow-sm shadow-emerald-500 border-emerald-500 dark:bg-zinc-900 lg:max-w-none">
            <div>

              {/* Project header */}
              <div className="mb-6 flex items-center gap-2 justify-between">
                <LuLayers3
                  className="text-emerald-600 dark:text-emerald-400"
                  size={22}
                />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                  {t("header")}
                </span>
              </div>


              {/* Project title */}
              <h1 className="mb-4 text-2xl font-black text-zinc-950 dark:text-gray-100 md:text-3xl line-clamp-2 min-h-12 leading-6">
                {title}
              </h1>
              
              {/* Project description */}
              <p className="mb-6 text-base leading-8 text-zinc-600 dark:text-zinc-400 break-words">
                {description}
              </p>
              

              {/* Skills used */}
              <div className="mb-7 flex flex-wrap gap-2">
                {(project.skillsUsed || []).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              
              {/* Project date */}
              <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-zinc-100 py-4 dark:border-zinc-800">
                <span className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  <LuCalendarDays
                    size={16}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                  {project.finishDate
                    ? new Date(project.finishDate).toLocaleDateString('en-US')
                    : t("inProgress")}
                </span>

                <span className="hidden h-4 w-px bg-zinc-300 dark:bg-zinc-700 sm:block" />

                <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  {project.isLearning?t("learning"):t("project") }
                </span>
              </div>
            </div>
            

            {/* Project links */}
            <div className="flex  gap-2">

              {/* Source Code Link */}
              {project.sourceLink && (
                <a
                  href={project.sourceLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 p-3 text-sm font-black text-white transition hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  <LuGithub size={17} />
                  {t("sourceCode")}
                </a>
              )}


              {/* Live Demo Link */}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 p-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-500/10 dark:border-emerald-400 dark:text-emerald-400"
                >
                  <LuExternalLink size={17} />
                  {t("liveDemo")}
                </a>
              )}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}

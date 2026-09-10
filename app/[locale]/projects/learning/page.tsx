"use client";

import { getLearningProjectsHandler } from "@/app/[locale]/dataHandlers/dashboardHandlers";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  LuCalendarDays,
  LuExternalLink,
  LuGithub,
  LuLayers3,
} from "react-icons/lu";
import { Link as IntLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CommentBox from "../../components/commentBox";
import ProjectCardLoading from "../../components/loadingsComponents/ProjectCardLoading";
import { ProjectType } from "@/src/generated/prisma/enums";
import { useLocale } from "next-intl";



interface Project {
  id: string;
  titleEn: string;
  titleAr: string | null ;
  descriptionEn: string | null;
  descriptionAr: string | null;
  img: string | null;
  sourceLink: string | null;
  liveLink: string | null;
  skillsUsed: string[];
  finishDate: Date | null;
  isLearning: boolean | string;
  type: ProjectType;
}



export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const t = useTranslations("projects/learning");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const local = useLocale()


  // GET projects :
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const projectsData = await getLearningProjectsHandler();
        setProjects(projectsData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);



  return (

    // Main container:
    <div className="min-h-screen w-full bg-white px-4 pb-16 pt-32 dark:bg-black sm:px-6 lg:px-10">

      {/* Background light: */}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_68%)]" />


      <div className="mx-auto max-w-7xl">


        {/* Title container: */}
        <div className="mb-8 flex items-end justify-between gap-4 animate-popIn [animation-duration:0.5s]">
          <div className="w-full flex flex-col justify-center items-center gap-4">

            {/* Comment box" */}
            <CommentBox comment={t("commit")} />

            {/* Page title  */}
            <h1 className="text-center text-3xl md:text-4xl font-bold  text-emerald-700 dark:text-emerald-500">
              {t("title")}
            </h1>

            {/* Page subtitle: */}
            <p className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 w-full lg:w-1/2">
              {t("subtitle")}
            </p>
          </div>

          {/* Projects length  */}
          <span className="hidden rounded-full border border-emerald-700/15 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm dark:border-emerald-300/15 dark:bg-zinc-900 dark:text-emerald-400 sm:flex sm:justify-center sm:items-center sm:min-w-20">
            {projects.length} {t("projectLength")}
          </span>


        </div>


        {/* Projects container: */}
        <div className="relative flex flex-warp justify-center items-center min-h-auto">
          
          {!isLoading ? (
            projects.map((project) => (
              <article
                key={project?.id}
                className="group overflow-hidden border border-emerald-900/10 bg-white shadow-sm shadow-emerald-700 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-100/10 dark:bg-zinc-900/80 rounded-xl max-w-[350px] h-auto animate-popIn [animation-duration:0.5s]"
              >

                {/* Img container: */}
                <IntLink href={`/project/${project?.id}`}>
                    <div className="relative aspect-16/10 overflow-hidden bg-emerald-900/10">
                    <Image 
                      
                      className="object-cover transition duration-500 group-hover:scale-105 animate-popIn [animation-duration:1s]"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      src={
                        project?.img ||
                        "https://images.unsplash.com/photo-1682685794700-1f3e7b8c5d4e?auto=format&fit=crop&w=1170&q=80"
                      }
                      alt={local==="en"?project?.titleEn:project?.titleAr || "Project preview"}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
                    <span className="absolute inset-s-4 bottom-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {project?.type || "Project"}
                    </span>
                  </div>
                </IntLink>
                


                {/* Content container: */}
                <div className="p-5">

                  {/* Project title: */}
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="line-clamp-1 text-xl font-black text-zinc-950 dark:text-zinc-100">
                      {local==="en"?project?.titleEn:project?.titleAr}
                    </h2>

                    <LuLayers3
                      className="mt-1 shrink-0 text-emerald-600"
                      size={18}
                    />
                  </div>

                  {/* Project description: */}
                  <p className="line-clamp-2 min-h-12 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {local==="en"?project?.descriptionEn:project?.descriptionAr}
                  </p>

                  {/* Skills used: */}
                  {project?.skillsUsed?.length > 0 && (
                    <div className="mt-4 flex min-h-7 flex-wrap gap-2">
                      {project.skillsUsed.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skillsUsed.length > 4 && (
                        <span className="rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          +{project.skillsUsed.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date and links container: */}
                  <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">

                    {/* Date */}
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <LuCalendarDays size={14} />
                      {project?.finishDate
                        ? new Date(project.finishDate).toLocaleDateString()
                        : "In progress"}
                    </span>

                    {/* Project links: */}
                    <div className="flex items-center gap-1">
                      {project?.sourceLink && (
                        <a
                          className="rounded-md p-2 text-zinc-400 transition hover:bg-emerald-500/10 hover:text-emerald-700"
                          href={project.sourceLink}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${local==="en"?project?.titleEn:project?.titleAr} source`}
                        >
                          <LuGithub size={17} />
                        </a>
                      )}
                      {project?.liveLink && (
                        <a
                          className="rounded-md p-2 text-emerald-700 transition hover:bg-emerald-500/10 dark:text-emerald-400"
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${local==="en"?project?.titleEn:project?.titleAr} live site`}
                        >
                          <LuExternalLink size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <ProjectCardLoading />
          )}
        </div>
      </div>
    </div>
  );
}

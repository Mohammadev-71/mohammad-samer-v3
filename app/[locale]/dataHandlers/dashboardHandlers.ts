"use server";

import { ProjectType, SkillType } from "@/src/generated/prisma/browser";
import { prisma } from "@/src/lib/prisma";

export async function getDashboardStats() {
   const projectsCount = await prisma.project.count();
   const skillsCount = await prisma.skill.count();

   return {
      projects: projectsCount,
      skills: skillsCount,
   };
}

export async function getSkillsHandler() {
   const skills = await prisma.skill.findMany({});

   return skills;
}

export async function deleteSkillHandler(id: string) {
   await prisma.skill.delete({
      where: { id: id },
   });

   return { message: "Skill deleted successfully" };
}

export async function postSkillHandler({
   SKILL,
   TYPE,
   }: {
   SKILL: string;
   TYPE: SkillType;
   }) {
   await prisma.skill.upsert({
      where: { skill: SKILL || "" },
      update: { type: TYPE },
      create: { skill: SKILL, type: TYPE },
   });
}

export async function getProjectsHandler() {
   const projects = await prisma.project.findMany({
      where:{isLearning:false}
   });

   return projects;
}


export async function getLearningProjectsHandler() {
   const projects = await prisma.project.findMany({
      where:{isLearning:true}
   });

   return projects;
}

export async function createProjectHandler({
   title,
   description,
   img,
   sourceLink,
   liveLink,
   skillsUsed,
   finishDate,
   type,
   isLearning
   }: {
   title: string;
   description?: string;
   img?: string;
   sourceLink?: string;
   liveLink?: string;
   skillsUsed: string[];
   finishDate?: Date;
   type: ProjectType;
   isLearning:boolean
   }) {
   return prisma.project.create({
      data: {
         title,
         description: description || null,
         img: img || null,
         sourceLink: sourceLink || null,
         liveLink: liveLink || null,
         skillsUsed,
         finishDate: finishDate || null,
         type,
         isLearning,
      },
   });
}

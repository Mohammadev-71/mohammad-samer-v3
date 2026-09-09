'use server'

import { getTranslations } from "next-intl/server";
import { LuWrench } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { prisma } from "../../../src/lib/prisma";
import { IoServerOutline } from "react-icons/io5";
import { FaServer } from "react-icons/fa";
import { GoCommandPalette } from "react-icons/go";
import { Suspense } from "react";
import SkillsLoading from "./loadingsComponents/SkillsLoading";



export default async function TechsContainer(){
   const t = await getTranslations("skills")

   // get all skills:


   const allSkills = await prisma.skill.findMany({})

   // Skills formatting
   const groupSkills = allSkills.reduce((acc,skill)=>{
      acc[skill.type] = acc[skill.type] || [];
      acc[skill.type].push(skill)
      return acc
   },{} as Record<string, typeof allSkills>)


   return (

      // main container:
      <div className="w-full h-full gap-10 flex flex-wrap justify-center  items-start p-10 ">

         {Object.entries(groupSkills).map((type)=>(
            <Suspense key={type[0]} fallback={<SkillsLoading/>}>
               
               <div  className="w-auto h-auto bg-gray-50 dark:bg-zinc-900 shadow-sm shadow-emerald-700 p-4 rounded-xl min-w-[350px] flex flex-col justify-center items-start animate-popIn [animation-duration:1.5s]">
                  
               
                  <h1 className="text-emerald-600 flex justify-center items-center gap-2 text-xl "><span className="w-10 h-10 flex justify-center items-center bg-emerald-800/20 rounded-lg text-emerald-500 text-xl">{type[0]==="FRONTEND"?<LuLayoutDashboard />:type[0]==="BACKEND"?<FaServer/>:type[0]==="DATABASE"?<IoServerOutline/>:type[0]==="DEVOPS"?<GoCommandPalette/>:type[0]==="TOOLS"?<LuWrench/>:""}</span> {t(`${type[0]}`)}</h1>

                  <div className="mt-6 grid grid-cols-3 min-w-full px-4 py-4 gap-4">
                  {type[1]?.map((skill, index) => {
                     
                     const isEven = index % 4 === 1 || index % 4 === 2;
                     return (
                        <div
                        key={skill.id}
                        className={`
                           relative
                           flex
                           items-center
                           rounded-xl py-3
                           bg-emerald-700 dark:bg-zinc-700/50
                           text-lg text-white w-full
                           shadow-inner shadow-gray-300 dark:shadow-gray-700 justify-center ${isEven? "col-span-2 min-w-[30px] px-1": "col-span-1 min-w-[10px] px-8"}`}
                        >
                        {skill.skill}
                        </div>
                     );
                  })}
                  </div>
               </div>
            </Suspense>

            
            
         ))}
         {
            Object.keys(groupSkills).length === 0 &&(
               <SkillsLoading/>
            )
         }
      </div>
   )
}




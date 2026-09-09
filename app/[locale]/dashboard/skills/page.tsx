'use client'


import { useEffect, useState } from "react"
import { getSkillsHandler,deleteSkillHandler, postSkillHandler } from "../../dataHandlers/dashboardHandlers";
import { addSkillValidationSchema } from "@/src/lib/units/validationSchemas";
import { useTranslations } from "next-intl";
import { SkillType } from "@/src/generated/prisma/enums";
import { authClient } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";
interface skills {
   id:string,
   skill:string,
   type:SkillType
}


export default function Skills(){
   const [skills, setSkills] = useState<skills[]>([])
   const [newSkill, setNewSkill] = useState<skills>({} as skills)
   const t = useTranslations("admin.skills")
   const {data: session, isPending} = authClient.useSession()

   // save the skills in status to show it:
   useEffect(()=>{
      const getSkills = async()=>{
         const skills = await getSkillsHandler()
         setSkills(skills)
      }
      getSkills()
   },[])

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
   



   // Delete skill handler:
   const deleteHandler = async (id:string)=>{
      try{
         const deleteResult = await deleteSkillHandler(id)
         const skills = await getSkillsHandler()
         setSkills(skills)
         if(deleteResult?.message){
            alert(deleteResult?.message)
         }
      }catch(err){
         console.log(err)
      }
   }


   // Add Skill handler
   const addSkillHandler = async ()=>{
      
      try{
         // Validation :
         const validationResult = addSkillValidationSchema.safeParse({skill:newSkill.skill,type:newSkill.type})

         // if the validation success save the skill:
         if(validationResult.success){

            // add skill
            await postSkillHandler({SKILL: newSkill.skill, TYPE: newSkill.type as skills["type"]})
            const skills = await getSkillsHandler()
            setSkills(skills)

         // if the validation failed show the error message:
         }else{
            const error = Object.values(validationResult.error.flatten().fieldErrors||{})?.[0]?.[0]
            alert(error)
         }
      }catch(err){
         console.log(err)
      }
   }


   



   return(

      // main container:
      <div className=" pt-30 flex flex-col items-center justify-start w-full">
         

        {/* Table: */}
         <table className="w-9/12 max-h-full">

            {/* Table header: */}
            <thead className="bg-gray-100 dark:bg-zinc-950 text-emerald-800 dark:text-emerald-400">
               <tr className="bg-gray-200 dark:bg-zinc-900 text-emerald-800 dark:text-emerald-400 border-b border-gray-300 dark:border-zinc-800 text-start">
                  <th className="p-4">{t("table.skills")}</th>
                  <th className="p-4">{t("table.type")}</th>
                  <th className="p-4">{t("table.delete")}</th>
               </tr>
            </thead>

            {/* Table body: */}
            <tbody>
               {skills.map((skill)=>(
                  <tr key={skill.id} className="border-b border-gray-200 dark:border-zinc-900 text-emerald-800 dark:text-emerald-400 text-center">
                     <td className="p-4">{skill.skill}</td>
                     <td className="p-4">{skill.type}</td>
                     <td className="p-4">
                        <button className="bg-red-500 text-white p-2 rounded" onClick={()=>{deleteHandler(skill.id)}}>
                           {t("table.delete")}
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>



         {/* Add Skill form: */}
         <form onSubmit={(e)=>{e.preventDefault();addSkillHandler()}} className="w-full flex flex-col gap-4 items-center justify-center my-6">

            {/* Title: */}
            <h2 className="text-xl font-bold mt-10 mb-4">{t("form.title")}</h2>

            {/* Skill name field : */}
            <input className="bg-gray-200 dark:bg-zinc-800 text-emerald-800 dark:text-emerald-400 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-2" onChange={(e)=>{setNewSkill({...newSkill, skill:e.target.value})}} type="text" placeholder={t("form.name")}/>


         
            {/* skill type selector: */}
            <select className="bg-gray-200 dark:bg-zinc-800 text-emerald-800 dark:text-emerald-400 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-2" onChange={(e)=>{setNewSkill({...newSkill, type:e.target.value as skills['type']})}}>

               {/* Type options: */}
               <option value="" disabled defaultValue="" >{t("form.type")}</option>
               <option value="FRONTEND">Frontend</option>
               <option value="BACKEND">Backend</option>
               <option value="DATABASE">Database</option>
               <option value="DEVOPS">DevOps</option>
               <option value="TOOLS">Tools</option>
            </select>

            {/* submit Button: */}
            <button type="submit" className="bg-emerald-500 text-white p-2 rounded" >   
               Add Skill
            </button>
         </form>
      </div>
   )
}  
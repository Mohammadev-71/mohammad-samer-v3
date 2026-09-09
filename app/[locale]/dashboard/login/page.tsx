'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { authClient } from "@/src/lib/auth-client"
import { redirect } from "next/navigation"
import { loginValidationSchema } from "@/src/lib/units/validationSchemas"

interface userData {
   email:string,
   password:string,
}

export default function DashboardLogin(){
   
   
   const [userData, setUserData] = useState<userData>({email:"",password:""})


   const t = useTranslations("admin.login")
   
   const loginHandler = async ()=>{

      try{

         // Validation:
         const result = loginValidationSchema.safeParse({email:userData.email,password:userData.password})
         
         // If validation success:
         if(result.success){
            const {data, error} = await authClient.signIn.email({
               email:userData?.email,
               password:userData?.password,
               callbackURL:"/dashboard",
               rememberMe:false
            },{
               onSuccess(context) {
                  alert("signed in successfully")
                  redirect("/dashboard")
               },
               onError(context) {
                  alert(context?.error?.message)
                  console.log(context.error.message)
               },
            })

         // If validation Failed:
         }else{
            const error = Object.values(result.error.flatten().fieldErrors||{})?.[0]?.[0]
            alert(error)
         }  
         

         
      }catch(err){
         console.log(err)
      }
   }

   return (

      // Log form container:
      <div className="w-full h-screen flex justify-center items-center">

         {/* Login form */}

         <form  onSubmit={(e)=>{e.preventDefault(); loginHandler()}} className="bg-gray-100 dark:bg-zinc-900 shadow-lg shadow-emerald-500 flex flex-col p-8 rounded-xl  min-w-[350px] min-h-[400px] justify-start items-center ">

            {/* title: */}
            <h1 className="text-xl font-bold text-emerald-700 mb-10">{t("title")}</h1>

            {/* Email field: */}
            <input className="w-full min-h-10 bg-gray-200 dark:bg-transparent my-4  shadow-sm shadow-emerald-500 rounded-lg border border-emerald-800 p-2 text-emerald-700" placeholder={t("fields.email")} onChange={(e)=>{setUserData({...userData, email:e.target.value})}} type="text" />

            {/* Password field */}
            <input className="w-full min-h-10 bg-gray-200 dark:bg-transparent my-4  shadow-sm shadow-emerald-500 rounded-lg border border-emerald-800 p-2 text-emerald-700" placeholder={t("fields.password")} onChange={(e)=>{setUserData({...userData, password:e.target.value})}} type="text" />

            {/* submit button: */}
            <button className="mt-10 shadow-sm shadow-emerald-500 px-4 py-2 rounded-lg text-emerald-800" type="submit">{t("submit")}</button>
         </form>
      </div>
   )
}



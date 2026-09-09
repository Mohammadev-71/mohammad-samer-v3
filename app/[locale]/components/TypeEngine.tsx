'use client'

import TypeIt from "typeit-react";


export default function TypeEngine(){


   return(

      // Main container:
      <div dir="ltr" className="w-full max-w-full md:max-w-1/3 mt-10 h-auto min-h-60 p-4 bg-zinc-900 rounded-sm shadow-lg shadow-black dark:shadow-emerald-800 z-2 animate-popIn [animation-duration:1.5s]">

         {/* Type engine design */}
         <div className="border-b border-gray-400 w-full h-10 flex justify-between items-center mb-4">
            <div className="flex min-h-full ">
               <div className="after:content-[''] after:bg-green-400 after:absolute relative after:top-1/2 after:-translate-1/2 after:-right-6 after:w-4 after:h-4 after:rounded-full"></div>

               <div className="after:content-[''] after:bg-orange-400 after:absolute relative after:top-1/2 after:-translate-1/2 after:-right-12 after:w-4 after:h-4 after:rounded-full"></div>

               <div className="after:content-[''] after:bg-red-400 after:absolute relative after:top-1/2 after:-translate-1/2 after:-right-18 after:w-4 after:h-4 after:rounded-full"></div>
               
            </div>
            <span className="text-gray-300">mohaammad.ts</span>
         </div>


         {/* type engine */}
         <TypeIt className="text-lg w-full" options={{
            speed:40,
            waitUntilVisible: true,
         }}>
            <span className="text-blue-400">const </span>
            <span className="text-blue-300">developer = </span>
            <span className="text-yellow-300">{"{"}</span>
            <br />
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;name: </span>
            <span className="text-orange-300"> "mohammad samer", </span>
            <br />
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;role: </span>
            <span className="text-orange-300"> "full-stack web developer", </span>
            <br />
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;location: </span>
            <span className="text-orange-300"> "united arab emirates", </span>
            <br />
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;skills: </span>
            <span className="text-orange-300"> 
               <strong className="text-fuchsia-300">{'['}</strong> 
               
               <span className="text-orange-300">&nbsp;&nbsp;&nbsp;&nbsp; "reactjs", </span>
               
               <span className="text-orange-300">&nbsp;&nbsp;&nbsp;&nbsp; "expressJs", </span>
               
               <span className="text-orange-300">&nbsp;&nbsp;&nbsp;&nbsp; "mongodb", </span>
               
               <span className="text-orange-300">&nbsp;&nbsp;&nbsp;&nbsp; "prisma", </span>
               
               <span className="text-orange-300">&nbsp;&nbsp;&nbsp;&nbsp; "nextJs", </span>
               
               <strong className="text-fuchsia-300">&nbsp;&nbsp;&nbsp;&nbsp;{']'}</strong> 
            </span>
            <br />
            <span className="text-yellow-300">{"}"}</span>
            <span className="text-indigo-400"> as </span>
            <span className="text-yellow-300">{"{"}</span>
            
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;name: </span>
            <span className="text-teal-500"> string, </span>
            
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;role: </span>
            <span className="text-teal-500"> string, </span>
            
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;location: </span>
            <span className="text-teal-500"> string, </span>
            
            <span className="text-blue-200"> &nbsp;&nbsp;&nbsp;&nbsp;skills: </span>
            <span className="text-teal-500"> string<strong className="text-fuchsia-300">{'['}</strong>&nbsp;<strong className="text-fuchsia-300">{']'}</strong> </span>
            
            <span className="text-yellow-300">&nbsp;{"}"}</span>
         </TypeIt>
      </div>
   )
}




export default function SkillsLoading(){
   return(
      [1,2,3,4,5].map((skill)=>(
         <div key={skill} className="relative w-auto h-auto bg-gray-50 dark:bg-zinc-900 shadow-sm shadow-emerald-700 p-4 rounded-xl min-w-[350px] flex flex-col justify-center items-start after:content-[''] after:absolute after:w-20 after:h-[200%] after:bg-gradient-to-r after:from-transparent after:via-emerald-500/50 dark:after:via-emerald-800/50 after:to-transparent after:-top-full after:-left-full after:animate-shimmer after:rotate-45 after:-translate-1/2 after:blur-2xl overflow-hidden animate-popIn [animation-duration:2s]">
            <div className="w-full h-full mt-6 flex flex-wrap"> 
               
            {
               [1,2,3,4,5]?.map((skill)=>(
                  <div className="relative bg-emerald-700 dark:bg-zinc-700/50 m-4 py-4 px-10 rounded-xl shadow-inner shadow-gray-300 dark:shadow-gray-700 text-white dark:text-white min-w-10" key={skill}></div>
               ))
            }
               
            </div>
         </div>
      ))
   )
}



export default function ProjectCardLoading(){
   return(
      <div className="flex flex-wrap gap-10 justify-center items-center w-screen h-full"> 
         {
            [1,2,3].map((project)=>(
               <div key={project} className={`${project > 2 ? "hidden lg:flex" :"flex"} group overflow-hidden border border-emerald-900/10 bg-gray-50 shadow-sm shadow-emerald-700 transition duration-800 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-100/10 dark:bg-zinc-900/80 rounded-xl min-w-[350px] max-w-[350px] min-h-[500px] max-h-[500px] z-2 flex justify-center items-center text-center text-xl relative after:content-[''] after:absolute after:w-30 after:h-[200%] after:bg-gradient-to-r after:from-transparent after:via-emerald-500/50 dark:after:via-emerald-800/50 after:to-transparent after:-top-full after:-left-full after:animate-shimmer after:rotate-45 after:-translate-1/2 after:blur-2xl  animate-popIn [animation-duration:0.5s]`}></div>
            ))
         }
      </div>
      
   )     
}
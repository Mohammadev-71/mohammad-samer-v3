


export default function WaveBox({rate, skill}: {rate: number, skill: string}) {
   return (

      // Main container:
      <div className="flex flex-col justify-start items-center gap-2 w-full min-h-50 animate-popIn [animation-duration:1.5s]">

         {/* Tank container: */}
         <div className="relative w-26 md:w-32 h-26 md:h-32 rounded-full border-4 border-emerald-700 overflow-hidden flex items-center justify-center bg-blue-50 dark:bg-zinc-800 shadow-lg">

            {/* main water container:*/}
            <div 
               className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out bg-emerald-600"
               style={{ height: `${rate-10}%` }}
            >

               {/*back wave*/}
               <div className="absolute bottom-full left-0 w-[300%] h-8 animate-wave-slow opacity-50 translate-y-1">
                  <svg className="w-full h-full" viewBox="0 0 1600 80" preserveAspectRatio="none">
                     <path d="M0,20 Q400,60 800,20 T1600,20 L1600,80 L0,80 Z" fill="#059669"></path>
                  </svg>
               </div>


               {/* front wave*/}
               <div className="absolute bottom-full left-0 w-[200%] h-10 animate-wave translate-y-2">
                  <svg className="w-full h-full" viewBox="0 0 1600 80" preserveAspectRatio="none">
                     <path d="M0,40 Q400,0 800,40 T1600,40 L1600,80 L0,80 Z" fill="#059669"></path>
                  </svg>
               </div>
            </div>


            {/*rate*/}
            <span className="relative z-2 text-2xl font-bold text-emerald-800 dark:text-gray-400 drop-shadow-md">
               {rate}%
            </span>
         </div>


         {/* skill name */}
         <p className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center">{skill}</p>
      </div>
   );
}
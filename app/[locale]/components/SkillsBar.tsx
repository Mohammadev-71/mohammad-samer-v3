import WaveBox from "./waveBox";
import { useTranslations } from "next-intl";

export default function SkillsBar(){

   const t = useTranslations("skills.mainSkills")


   return(

      // main container:
      <div className="w-full max-w-4xl mx-auto py-8 ">
      
         {/* second container*/}
         <div className="relative w-full overflow-hidden bg-transparent py-4">
                  
            {/* moving items container: */}
            <div dir="ltr" className="ltr flex w-[200%] lg:w-[100%] animate-marquee lg:animate-none gap-90 items-center">
               
               {/* first group of items*/}
               <div className="flex w-1/2 justify-around items-center gap-10 px-3">
                  <WaveBox rate={90} skill={t("front")}/>
                  <WaveBox rate={80} skill={t("back")}/>
                  <WaveBox rate={90} skill={t("db")}/>
                  <WaveBox rate={80} skill={t("f-s")}/>
                  <WaveBox rate={70} skill={t("security")}/>
               </div>
               
               {/* second group of items (to make the animation smooth) */}
               <div className="flex w-1/2 justify-around items-center gap-10 px-3 lg:hidden">
                  <WaveBox rate={95} skill={t("front")}/>
                  <WaveBox rate={80} skill={t("back")}/>
                  <WaveBox rate={70} skill={t("db")}/>
                  <WaveBox rate={85} skill={t("f-s")}/>
                  <WaveBox rate={65} skill={t("security")}/>
               </div>
            </div>

         </div>
      </div>
   )
}
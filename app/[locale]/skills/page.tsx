import CommentBox from "../components/commentBox";
import { useTranslations } from "next-intl";
import SkillsBar from "../components/SkillsBar";
import TechsContainer from "../components/TechsContainer";

export default function Skills() {
  const t = useTranslations("skills");
  return (
    <div className="pt-30 md:pt-36 flex flex-col justify-start items-center w-full min-h-screen  animate-popIn [animation-duration:0.5s]">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_68%)]" />
      <CommentBox comment={t("comment")} />

      {/* page title: */}
      <div className="flex flex-col mt-6 gap-6 w-full justify-center items-center px-4 md:px-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold  text-emerald-700 dark:text-emerald-500">
          {" "}
          {t("title")}
        </h1>
        <h2 className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 w-full lg:w-1/2">
          {t("subtitle")}
        </h2>
      </div>
      <SkillsBar />

      <TechsContainer />
    </div>
  );
}

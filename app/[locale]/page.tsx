import { useTranslations } from "next-intl";
import TypeEngine from "./components/TypeEngine";
import Image from "next/image";
import CommentBox from "./components/commentBox";
export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_68%)]" />
      {/* hero section */}
      <section className="flex flex-col md:flex-row justify-center items-start bg-white font-sans dark:bg-black  pt-30 md:pt-50 px-4 gap-20 pb-30 min-w-screen h-auto">
        {/* Title container: */}
        <div className="w-full md:w-auto h-full flex flex-col justify-start items-center animate-popIn [animation-duration:0.5s]">
          {/* glass box: */}
          <div className="px-4 py-4 bg-emerald-200/40 dark:bg-emerald-800/30 rounded-full shadow-inner shadow-gray-300 dark:shadow-emerald-700/50 border-emerald-800 text-lg mb-6 animate-popIn [animation-duration:0.5s]">
            <span className=" text-blue-600 dark:text-blue-500">const </span>
            <span className=" text-blue-500 dark:text-blue-400">rule: </span>
            <span className=" text-orange-400">Full Stack Web Developer</span>
          </div>

          {/* title and subtitle  */}
          <h1 className="text-gray-800 dark:text-white text-3xl md:text-5xl text-center font-bold mt-8">
            {t("name")}
          </h1>
          <h1 className="text-emerald-800 dark:text-emerald-500 text-3xl md:text-5xl text-center font-bold">
            {t("title")}
          </h1>
          <h1 className="text-gray-700 dark:text-gray-400 text-xl md:text-2xl text-center mt-4 max-w-full md:max-w-9/12">
            {t("subtitle")}
          </h1>

          {/* action buttons: */}
          <div className="flex justify-center flex-wrap items-center gap-8 mt-8">
            <a
              className="p-4 min-w-30 text-center border border-gray-700 rounded-lg bg-emerald-600 dark:bg-emerald-500/80 text-gray-100 dark:text-gray-800 text-lg font-bold"
              href="/mohammad-cv.pdf"
              target="_blank "
              rel="noopener noreferrer"
            >
              {t("buttons.viewCV")}
            </a>

            <a
              className="p-4 min-w-30 text-center border border-gray-700 rounded-lg bg-emerald-600 dark:bg-emerald-500/80 text-gray-100 dark:text-gray-800 text-lg font-bold"
              href="/mohammad-cv.pdf"
              target="_blank "
              rel="noopener noreferrer"
              download={true}
            >
              {t("buttons.downloadCV")}
            </a>

            <a
              className="p-4 min-w-30 text-center border border-emerald-600 dark:border-gray-300 rounded-lg  text-emerald-700 dark:text-gray-300 text-lg font-bold"
              href="/mohammad-cv.pdf"
              target="_blank "
              rel="noopener noreferrer"
            >
              {t("buttons.projects")}
            </a>
          </div>
        </div>

        {/* code editor container: */}
        <TypeEngine />
      </section>

      {/* About me Section */}

      <section className="flex flex-col justify-center items-center bg-white font-sans dark:bg-black px-4 gap-10 pb-30 min-w-screen">
        {/* Commit box*/}
        <CommentBox commit={t("about.commit")} />

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full 2xl:w-9/12 h-auto gap-10 md:gap-20">
          <Image
            loading="eager"
            className="shadow-lg rounded-xl shadow-emerald-500 border border-emerald-500 animate-popIn [animation-duration:2s]"
            width={500}
            height={500}
            src={"/aboutImg4.jpg"}
            alt="About me"
          />

          <div className=" border border-emerald-500 p-4 shadow-inner shadow-gray-400 dark:shadow-emerald-500 rounded-xl h-auto  xl:h-[500px] animate-popIn [animation-duration:2s]">
            <h1 className="text-2xl md:text-2xl font-bold text-center mb-4 text-emerald-800 dark:text-emerald-500 leading-relaxed">
              {t("about.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

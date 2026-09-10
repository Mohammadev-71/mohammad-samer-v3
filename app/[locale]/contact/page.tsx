"use client";

import { useTranslations } from "next-intl";
import {
  LuArrowUpRight,
  LuAtSign,
  LuClock3,
  LuGithub,
  LuLinkedin,
  LuMapPin,
  LuMessageCircle,
  LuSend,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import CommentBox from "../components/commentBox";
import { useState } from "react";

const contactLinks = [
  {
    key: "email",
    href: "mailto:mohammadev71@gmail.com",
    icon: LuAtSign,
    value: "mohammadev71@gmail.com",
  },
  {
    key: "whatsapp",
    href: "https://wa.me/971562650112",
    icon: FaWhatsapp,
    value: "+971 56 265 0112",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/mohammad-samer-dev",
    icon: LuLinkedin,
    value: "mohammad-samer-dev",
  },
  {
    key: "github",
    href: "https://github.com/Mohammadev-71",
    icon: LuGithub,
    value: "Mohammadev-71",
  },
] as const;

export default function Contact() {
  const t = useTranslations("contact");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const object = {
      access_key: process.env.NEXT_PUBLIC_Email_Access_KEY,
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const json = JSON.stringify(object);

    try {
      setIsLoading(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json();
      alert(t(data.success ? "sendSuccessfully" : "fieldSending"));
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (

    // Main container:
    <main className="relative min-h-screen overflow-hidden bg-white px-4 pb-20 pt-32 dark:bg-black sm:px-6 lg:px-10">

      {/* Background light: */}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-72 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_68%)]" />

      
      <div className="relative z-[1] mx-auto max-w-6xl">


        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center  animate-popIn [animation-duration:0.5s] ">
          <CommentBox comment={t("comment")} />
          <h1 className="text-center text-3xl md:text-4xl font-bold  text-emerald-700 dark:text-emerald-500">
            {t("title")}
          </h1>
          
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">


          <section className="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-950 p-4 text-white shadow-sm shadow-emerald-700 dark:border-emerald-400/10 dark:bg-zinc-900 sm:p-8  animate-popIn [animation-duration:1s]">
            <div className="absolute -end-20 -top-20 h-52 w-52 rounded-full border border-emerald-300/15" />


            <div className="absolute -bottom-24 -start-16 h-56 w-56 rounded-full border border-emerald-300/10" />

            
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400 text-emerald-950">
                <LuMessageCircle size={25} />
              </div>
              <h2 className="max-w-xs text-2xl font-bold sm:text-3xl">
                {t("cardTitle")}
              </h2>
              <p className="mt-4 max-w-sm leading-7 text-emerald-100/75">
                {t("cardSubtitle")}
              </p>

              <div className="mt-10 space-y-4">
                {contactLinks.map(({ key, href, icon: Icon, value }) => (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-emerald-300/40 hover:bg-white/10"
                  >
                    <Icon className="shrink-0 text-emerald-300" size={19} />
                    <span className="min-w-0 flex-1 truncate text-sm text-emerald-50/85">
                      {value}
                    </span>
                    <LuArrowUpRight
                      className="shrink-0 text-emerald-300/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      size={16}
                    />
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm text-emerald-100/70">
                <span className="flex items-center gap-2">
                  <LuMapPin size={16} /> {t("location")}
                </span>
                <span className="flex items-center gap-2">
                  <LuClock3 size={16} /> {t("availability")}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8  animate-popIn [animation-duration:1s]">
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {t("formEyebrow")}
              </p>
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
                {t("formTitle")}
              </h2>
            </div>

            <form onSubmit={(e) => sendEmail(e)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t("fields.name")}
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder={t("fields.namePlaceholder")}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t("fields.email")}
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder={t("fields.emailPlaceholder")}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t("fields.message")}
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={t("fields.messagePlaceholder")}
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 font-normal leading-7 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
              </label>
              <button
                disabled={isLoading}
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
              >
                {isLoading ? t("loading") : t("send")} <LuSend size={17} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

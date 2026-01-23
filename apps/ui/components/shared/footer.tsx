import { fadeUp } from "cnippet-aos";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";

const pages = [
  "home",
  "button",
  "accordion",
  "alert",
  "form",
  "card",
  "breadcrumb",
];

const socials = ["Instagram", "X", "Linkedin"];

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

export function Footer() {
  const [currentTime, setCurrentTime] = React.useState(formatTime());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="px-6 pt-20 pb-10 text-primary md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_auto]">
          <motion.div
            {...fadeUp({ delay: 0.1, duration: 0.8, once: true, scroll: true })}
            className="flex flex-col justify-between gap-12"
          >
            <div className="max-w-xl space-y-6">
              <p className="font-light text-base sm:text-lg">
                Start your project today! Contact us to learn more and
                let&apos;s work together to achieve your goals.
              </p>
              <button className="group flex cursor-pointer items-center justify-start gap-0">
                <span className="rounded-full bg-sidebar px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors">
                  Start a Project
                </span>
                <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-sidebar p-5 text-black duration-500 ease-in-out group-hover:bg-secondary group-hover:text-primary group-hover:transition-colors">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                </div>
              </button>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp({ delay: 0.2, duration: 0.8, once: true, scroll: true })}
            className="flex flex-wrap gap-12 text-base lg:items-start lg:gap-16"
          >
            <motion.div
              {...fadeUp({
                delay: 0.25,
                duration: 0.8,
                once: true,
                scroll: true,
              })}
              className="flex items-start gap-5"
            >
              <span className="block text-neutral-500 text-xs uppercase tracking-[0.35em]">
                ↳ Pages
              </span>
              <ul className="-mt-1 space-y-2">
                {pages.map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm capitalize transition hover:text-black dark:hover:text-white/80"
                      href={
                        item === "home"
                          ? "/"
                          : item === "button"
                            ? "ui/actions/button"
                            : item === "button"
                              ? "ui/data/accordion"
                              : item === "alert"
                                ? "ui/feedback/alert"
                                : item === "form"
                                  ? "ui/forms/form"
                                  : item === "card"
                                    ? "ui/layout/card"
                                    : item === "breadcrumb"
                                      ? "ui/navigation/breadcrumb"
                                      : ""
                      }
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp({
                delay: 0.35,
                duration: 0.8,
                once: true,
                scroll: true,
              })}
              className="flex items-start gap-5"
            >
              <span className="mb-2 block text-neutral-500 text-xs uppercase tracking-[0.35em]">
                ↳ Social
              </span>
              <ul className="-mt-1 space-y-2">
                {socials.map((item) => (
                  <li key={item}>
                    <Link
                      className="text-sm transition hover:text-black dark:hover:text-white/80"
                      href="#"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          {...fadeUp({ delay: 0.3, duration: 0.8, once: true, scroll: true })}
          className="flex flex-col justify-between gap-4 text-neutral-800 text-xs uppercase tracking-[0.35em] sm:flex-row md:items-end dark:text-neutral-600"
        >
          <div className="font-medium text-[2rem] uppercase leading-none sm:text-[6rem] md:text-[7rem] lg:text-[6rem]">
            ©Cnippet
          </div>

          <div className="flex flex-col space-x-5 font-mono">
            <span>INDIA: {currentTime}</span>
            <span className="text-[0.65rem] text-neutral-500 tracking-[0.4em]">
              ©2025 Cnippet All Rights Reserved
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

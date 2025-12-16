import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "cnippet-aos";

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
    hour12: false,
    hour: "2-digit",
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
    <footer className="text-primary px-6 pt-20 pb-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_auto]">
          <motion.div
            {...fadeUp({ delay: 0.1, duration: 0.8, scroll: true, once: true })}
            className="flex flex-col justify-between gap-12"
          >
            <div className="max-w-xl space-y-6">
              <p className="text-base font-light sm:text-lg">
                Start your project today! Contact us to learn more and
                let&apos;s work together to achieve your goals.
              </p>
              <button className="group flex cursor-pointer items-center justify-start gap-0">
                <span className="bg-sidebar group-hover:bg-secondary group-hover:text-primary rounded-full px-6 py-3 text-black duration-500 ease-in-out group-hover:transition-colors">
                  Start a Project
                </span>
                <div className="bg-sidebar group-hover:bg-secondary group-hover:text-primary relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full p-5 text-black duration-500 ease-in-out group-hover:transition-colors">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                </div>
              </button>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp({ delay: 0.2, duration: 0.8, scroll: true, once: true })}
            className="flex flex-wrap gap-12 text-base lg:items-start lg:gap-16"
          >
            <motion.div
              {...fadeUp({
                delay: 0.25,
                duration: 0.8,
                scroll: true,
                once: true,
              })}
              className="flex items-start gap-5"
            >
              <span className="block text-xs tracking-[0.35em] text-neutral-500 uppercase">
                ↳ Pages
              </span>
              <ul className="space-y-2 -mt-1">
                {pages.map((item) => (
                  <li key={item}>
                    <Link
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
                      className="text-sm capitalize transition hover:text-black dark:hover:text-white/80"
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
                scroll: true,
                once: true,
              })}
              className="flex items-start gap-5"
            >
              <span className="mb-2 block text-xs tracking-[0.35em] text-neutral-500 uppercase">
                ↳ Social
              </span>
              <ul className="space-y-2 -mt-1">
                {socials.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm transition hover:text-black dark:hover:text-white/80"
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
          {...fadeUp({ delay: 0.3, duration: 0.8, scroll: true, once: true })}
          className="flex flex-col justify-between gap-4 text-xs tracking-[0.35em] text-neutral-800 uppercase sm:flex-row md:items-end dark:text-neutral-600"
        >
          <div className="text-[2rem] leading-none font-medium uppercase sm:text-[6rem] md:text-[7rem] lg:text-[6rem]">
            ©Cnippet
          </div>

          <div className="flex flex-col space-x-5 font-mono">
            <span>INDIA: {currentTime}</span>
            <span className="text-[0.65rem] tracking-[0.4em] text-neutral-500">
              ©2025 Cnippet All Rights Reserved
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

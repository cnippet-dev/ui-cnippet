import Image from "next/image";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { motion } from "motion/react";
import { fadeUp } from "cnippet-aos";

const items = [
  {
    title: "accordion",
    number: "10",
    url: "/ui/data/accordion",
  },
  {
    title: "alert",
    number: "10",
    url: "/ui/feedback/alert",
  },
  {
    title: "avatar",
    number: "10",
    url: "/ui/media/avatar",
  },
  {
    title: "badge",
    number: "10",
    url: "/ui/feedback/badge",
  },
  {
    title: "breadcrumb",
    number: "10",
    url: "/ui/navigation/breadcrumb",
  },
  {
    title: "button",
    number: "10",
    url: "/ui/actions/button",
  },
  {
    title: "checkbox",
    number: "10",
    url: "/ui/forms/checkbox",
  },
  {
    title: "dialog",
    number: "10",
    url: "/ui/overlays/dialog",
  },
];

const Components = () => {
  return (
    <>
      <section className=" relative mx-auto max-w-6xl pb-20">
        <div>
          <motion.h2
            {...fadeUp({
              delay: 0.1,
              duration: 0.8,
              scroll: true,
              once: true,
            })}
            className="font-funnel mb-2 text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-400"
          >
            Essential UI components
          </motion.h2>
          <motion.p
            {...fadeUp({ delay: 0.3, duration: 0.8, y: 10 })}
            className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400"
          >
            Foundation components built for performance and accessibility.
          </motion.p>
          <motion.a
            {...fadeUp({ delay: 0.4, duration: 0.8, y: 10 })}
            href="/components"
            target="_blank"
            className="flex items-center pt-2"
          >
            Explore Components
            <RiArrowRightUpLine className="ml-1 size-4 transition-transform duration-300 group-hover:rotate-45" />
          </motion.a>
        </div>
        <div className=" pt-10 grid grid-cols-4 gap-5">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className="space-y-3 text-center">
                <Link
                  className="peer relative inline-flex overflow-hidden rounded-xl border sm:flex dark:border-zinc-700/80"
                  href={item.url}
                >
                  <Image
                    src={`/images/${item.title}.png`}
                    alt=""
                    width={1920}
                    height={1080}
                    className=" h-52 w-full object-cover"
                  />
                </Link>

                <div className="[&amp;_a]:peer-hover:underline">
                  <h2>
                    <a
                      className="font-medium text-sm hover:underline capitalize"
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  </h2>
                  <p className="text-[13px] text-muted-foreground">
                    20 Components
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Components;

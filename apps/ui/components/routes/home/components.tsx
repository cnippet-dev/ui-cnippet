import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "cnippet-aos";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon,
  GlobeIcon,
  Loader2,
  MailOpen,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Particle from "@/registry/default/variants/v-dialog-1";
import Particle1 from "@/registry/default/variants/v-alert-dialog-1";
import Particle2 from "@/registry/default/variants/v-sheet-1";
import Particle3 from "@/registry/default/variants/v-toast-1";
import Particle4 from "@/registry/default/variants/v-switch-1";
import Particle5 from "@/registry/default/variants/v-toolbar-1";
import Particle6 from "@/registry/default/variants/v-toggle-1";
import Particle7 from "@/registry/default/variants/v-toggle-group-1";

const selectItems = [
  // { label: "Select framework", value: null },
  { label: "@gmail.com", value: "gmail" },
  { label: "@hotmail.com", value: "hotmail" },
  { label: "@yahoo.com", value: "yahoo" },
];

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
      <section className=" relative px-4 sm:px-8 md:px-10 w-full pb-16 sm:pb-20">
        <div className="">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              {...fadeUp({
                delay: 0.1,
                duration: 0.8,
                scroll: true,
                once: true,
              })}
              className="font-funnel mb-2 text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-200"
            >
              Essential UI components
            </motion.h2>
            <motion.p
              {...fadeUp({ delay: 0.3, duration: 0.8, y: 10 })}
              className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400"
            >
              Foundation components built for performance and accessibility.
              Each component is carefully crafted with animations and
              interactions to elevate your user experience.
            </motion.p>
          </div>
          <div className="max-w-6xl mx-auto pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item, index) => (
              <div key={`${item.title}-${index}`}>
                <div className="space-y-3 text-center">
                  <Link
                    className="peer relative inline-flex overflow-hidden rounded-xl border sm:flex dark:border-zinc-700/80"
                    href={item.url}
                  >
                    <Image
                      src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
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
        </div>
      </section>

      <section className=" relative px-4 sm:px-8 md:px-10 w-full pb-16 sm:pb-20">
        <div className="">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              {...fadeUp({
                delay: 0.1,
                duration: 0.8,
                scroll: true,
                once: true,
              })}
              className="font-funnel mb-2 text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-200"
            >
              Components at a glance
            </motion.h2>
            <motion.p
              {...fadeUp({ delay: 0.3, duration: 0.8, y: 10 })}
              className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400"
            >
              Foundation components built for performance and accessibility.
              Each component is carefully crafted with animations and
              interactions to elevate your user experience.
            </motion.p>
          </div>
          <div className="max-w-6xl mx-auto pt-10 grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 md:gap-10">
            <Card className="w-full md:col-span-5 md:row-span-2 bg-transparent border-none p-0 shadow-none before:shadow-none dark:before:shadow-none">
              <CardHeader className=" p-0">
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardPanel className="p-0">
                <div className=" text-sm mb-3">Basic buttons</div>
                <div className="flex flex-wrap mb-8 items-center justify-center gap-3 sm:justify-start">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">
                    <Link href="/">Link</Link>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Next">
                    <ChevronRight />
                  </Button>
                  <Button>
                    <MailOpen /> Login with Email
                  </Button>
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                </div>

                <div className=" text-sm mb-3">Switch</div>
                <div className=" mb-8">
                  <Particle4 />
                </div>

                <div className=" text-sm mb-3">Toolbar</div>
                <div className=" mb-8">
                  <Particle5 />
                </div>

                <div className=" text-sm mb-3">Toggle Group</div>
                <div className=" mb-8">
                  <Particle7 />
                </div>
              </CardPanel>
            </Card>

            <Card className="w-full md:col-span-4 bg-transparent border-none p-0 shadow-none before:shadow-none dark:before:shadow-none">
              <CardHeader className=" p-0">
                <CardTitle> Inputs</CardTitle>
              </CardHeader>
              <CardPanel className=" p-0">
                <div className="w-full max-w-md space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="input-12">
                      Input with end inline add-on
                    </Label>
                    <div className="relative">
                      <Input
                        size="lg"
                        id="input-12"
                        placeholder="cnippet"
                        type="text"
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                        .dev
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="input-18">Input with end select</Label>
                    <div className="flex rounded-lg shadow-sm shadow-black/5">
                      <Input
                        size="lg"
                        id="input-18"
                        className="-me-px rounded-e-none shadow-none focus-visible:z-10 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-none"
                        placeholder="google"
                        type="text"
                      />
                      <Select defaultValue="gmail" items={selectItems}>
                        <SelectTrigger className=" rounded-s-none w-fit shadow-none dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectPopup>
                          {selectItems.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectPopup>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardPanel>
            </Card>

            <Card className="w-full md:col-span-3 bg-transparent border-none p-0 shadow-none before:shadow-none dark:before:shadow-none">
              <CardHeader className=" p-0">
                <CardTitle>Tooltips</CardTitle>
              </CardHeader>
              <CardPanel className=" p-0">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" />}>
                      Hover me
                    </TooltipTrigger>
                    <TooltipPopup className="w-60">
                      <div className="space-y-1 w-full">
                        <GlobeIcon
                          className="mt-0.5 shrink-0 opacity-60"
                          size={16}
                          aria-hidden="true"
                        />
                        <p className="text-[13px] font-medium text-white">
                          Tooltip with title and icon
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Tooltips are highly customizable with dynamic
                          placement, rich content, and a robust API.
                        </p>
                      </div>
                    </TooltipPopup>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" />}>
                      W/ image
                    </TooltipTrigger>
                    <TooltipPopup className="w-60">
                      <div className="space-y-1 w-full">
                        <div className="space-y-1">
                          <Image
                            src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg"
                            className="w-full rounded"
                            width={382}
                            height={216}
                            alt="Content image"
                          />
                          <p className="text-[13px] font-medium">
                            Tooltip with title and icon
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Tooltips are made to be highly customizable, with
                            features like dynamic placement, rich content, and a
                            robust API.
                          </p>
                        </div>
                      </div>
                    </TooltipPopup>
                  </Tooltip>

                  <div className="inline-grid w-fit grid-cols-3 gap-1">
                    <Tooltip>
                      <TooltipTrigger
                        className="col-start-2"
                        render={<Button variant="outline" />}
                      >
                        <ChevronUpIcon size={16} aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipPopup>Pan top</TooltipPopup>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        className="col-start-1"
                        render={<Button variant="outline" />}
                      >
                        <ChevronLeftIcon size={16} aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipPopup side="left">Pan left</TooltipPopup>
                    </Tooltip>
                    <div className="flex items-center justify-center">
                      <CircleIcon className="opacity-60" size={16} />
                    </div>
                    <Tooltip>
                      <TooltipTrigger
                        className=""
                        render={<Button variant="outline" />}
                      >
                        <ChevronRightIcon size={16} aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipPopup side="right">Pan right</TooltipPopup>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        className=" col-start-2"
                        render={<Button variant="outline" />}
                      >
                        <ChevronDownIcon size={16} aria-hidden="true" />
                      </TooltipTrigger>
                      <TooltipPopup side="bottom">Pan down</TooltipPopup>
                    </Tooltip>
                  </div>
                </div>
              </CardPanel>
            </Card>

            <Card className="w-full md:col-span-3 bg-transparent border-none p-0 shadow-none before:shadow-none dark:before:shadow-none">
              <CardHeader className=" p-0">
                <CardTitle>Overlays</CardTitle>
              </CardHeader>
              <CardPanel className=" p-0">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Particle />

                  <Particle2 />
                  <Particle1 />
                </div>
              </CardPanel>
            </Card>

            <Card className="w-full md:col-span-3 bg-transparent border-none p-0 shadow-none before:shadow-none dark:before:shadow-none">
              <CardHeader className=" p-0">
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardPanel className=" p-0">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Particle3 />
                </div>
              </CardPanel>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Components;

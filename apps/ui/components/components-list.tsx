import { fadeUp } from "cnippet-aos";
import {
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
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import Particle9 from "@/registry/default/variants/v-checkbox-1";
import Particle12 from "@/registry/default/variants/v-combobox-1";
import Particle from "@/registry/default/variants/v-dialog-1";
import Particle10 from "@/registry/default/variants/v-field-1";
import Particle13 from "@/registry/default/variants/v-meter-1";
import Particle14 from "@/registry/default/variants/v-number-field-1";
import Particle2 from "@/registry/default/variants/v-sheet-1";
import Particle15 from "@/registry/default/variants/v-skeleton-1";
import Particle4 from "@/registry/default/variants/v-switch-1";
import Particle3 from "@/registry/default/variants/v-toast-1";
import Particle8 from "@/registry/default/variants/v-toast-2";
import Particle7 from "@/registry/default/variants/v-toggle-group-1";
import Particle5 from "@/registry/default/variants/v-toolbar-1";

const selectItems = [
  // { label: "Select framework", value: null },
  { label: "@gmail.com", value: "gmail" },
  { label: "@hotmail.com", value: "hotmail" },
  { label: "@yahoo.com", value: "yahoo" },
];

const items = [
  {
    number: "2  ",
    title: "accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "5",
    title: "alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "4",
    title: "avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "3",
    title: "badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "2",
    title: "breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "3",
    title: "button",
    url: "/ui/actions/button",
  },
  {
    number: "4",
    title: "checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "5",
    title: "dialog",
    url: "/ui/overlays/dialog",
  },
];

const Components = () => {
  return (
    <>
      <section className="relative w-full px-4 pb-16 sm:px-8 sm:pb-20 md:px-0">
        <div className="">
          {/* <div className="mx-auto max-w-6xl">
            <motion.h2
              {...fadeUp({
                delay: 0.1,
                duration: 0.8,
                once: true,
                scroll: true,
              })}
              className="mb-2 font-funnel font-medium text-4xl text-gray-900 tracking-tight dark:text-gray-200"
            >
              Essential UI components
            </motion.h2>
            <motion.p
              {...fadeUp({ delay: 0.3, duration: 0.8, y: 10 })}
              className="max-w-2xl text-gray-700 text-sm leading-relaxed tracking-tight dark:text-gray-400"
            >
              Foundation components built for performance and accessibility.
              Each component is carefully crafted with animations and
              interactions to elevate your user experience.
            </motion.p>
          </div> */}
          <div className="grid max-w-7xl grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                {...fadeUp({
                  delay: 0.5 + index * 0.1,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <div className="space-y-3 text-center">
                  <Link
                    className="peer relative inline-flex overflow-hidden rounded-xl border sm:flex dark:border-zinc-700/80"
                    href={item.url}
                  >
                    <Image
                      alt=""
                      className="h-52 w-full object-cover"
                      height={1080}
                      src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                      width={1920}
                    />
                  </Link>

                  <div className="[&amp;_a]:peer-hover:underline">
                    <h2>
                      <Link
                        className="font-medium text-sm capitalize hover:underline"
                        href={item.url}
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-[13px] text-muted-foreground">
                      {item.number} Components
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 pb-16 sm:px-8 sm:py-20 md:px-0">
        <div className="">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading text-4xl/[1.1] text-foreground md:text-4xl/[1.1]">
              Components at a glance
            </h2>
            <p className="text-muted-foreground">
              Foundation components built for performance and accessibility.
              Each component is carefully crafted with animations and
              interactions to elevate your user experience.
            </p>
          </div>
          <div className="grid max-w-6xl grid-cols-1 gap-6 pt-10 md:grid-cols-12 md:gap-4">
            <div className="col-span-4 flex flex-col justify-between space-y-4">
              <motion.div
                {...fadeUp({
                  delay: 0.5,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Buttons</CardTitle>
                  </CardHeader>
                  <CardPanel className="flex h-full flex-col justify-between p-0">
                    <div className="mb-3 text-sm">Basic buttons</div>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">
                        <Link href="/">Link</Link>
                      </Button>
                      <Button aria-label="Next" size="icon" variant="outline">
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

                    <div className="mb-3 text-sm">Switch</div>
                    <div className="mb-8">
                      <Particle4 />
                    </div>

                    <div className="mb-3 text-sm">Toolbar</div>
                    <div className="mb-8">
                      <Particle5 />
                    </div>

                    <div className="mb-3 text-sm">Toggle Group</div>
                    <div className="">
                      <Particle7 />
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 0.6,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Pickers</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="mb-3 text-sm">Combobox</div>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle12 />
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>
            </div>

            <div className="col-span-4 flex flex-col justify-between space-y-4">
              <motion.div
                {...fadeUp({
                  delay: 0.7,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle> Inputs</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="w-full max-w-md space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="input-12">
                          Input with end inline add-on
                        </Label>
                        <div className="relative">
                          <Input
                            id="input-12"
                            placeholder="cnippet"
                            size="lg"
                            type="text"
                          />
                          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                            .dev
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="input-18">Input with end select</Label>
                        <div className="flex rounded-lg shadow-black/5 shadow-sm">
                          <Input
                            className="-me-px rounded-e-none shadow-none focus-visible:z-10 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-none"
                            id="input-18"
                            placeholder="google"
                            size="lg"
                            type="text"
                          />
                          <Select defaultValue="gmail" items={selectItems}>
                            <SelectTrigger className="w-fit rounded-s-none shadow-none dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-none">
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
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 0.8,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Overlays</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="flex flex-wrap gap-3">
                      <Particle />

                      <Particle2 />
                      {/* <Particle1 /> */}
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 0.9,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Feedback</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="mb-3 text-sm">Toast</div>
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle3 />
                      <Particle8 />
                    </div>

                    <div className="mb-3 text-sm">Skeleton</div>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle15 />
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>
            </div>

            <div className="col-span-4 flex flex-col justify-between space-y-4">
              <motion.div
                {...fadeUp({
                  delay: 1.0,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Tooltips</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="flex flex-wrap gap-5">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button className="w-fit" variant="outline" />
                          }
                        >
                          Hover me
                        </TooltipTrigger>
                        <TooltipPopup className="w-60">
                          <div className="w-full space-y-1">
                            <GlobeIcon
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 opacity-60"
                              size={16}
                            />
                            <p className="font-medium text-[13px] text-white">
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
                        <TooltipTrigger
                          render={
                            <Button className="w-fit" variant="outline" />
                          }
                        >
                          W/ image
                        </TooltipTrigger>
                        <TooltipPopup className="w-60">
                          <div className="w-full space-y-1">
                            <div className="space-y-1">
                              <Image
                                alt="Content image"
                                className="w-full rounded"
                                height={216}
                                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg"
                                width={382}
                              />
                              <p className="font-medium text-[13px]">
                                Tooltip with title and icon
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Tooltips are made to be highly customizable,
                                with features like dynamic placement, rich
                                content, and a robust API.
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
                            <ChevronUpIcon aria-hidden="true" size={16} />
                          </TooltipTrigger>
                          <TooltipPopup>Pan top</TooltipPopup>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger
                            className="col-start-1"
                            render={<Button variant="outline" />}
                          >
                            <ChevronLeftIcon aria-hidden="true" size={16} />
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
                            <ChevronRightIcon aria-hidden="true" size={16} />
                          </TooltipTrigger>
                          <TooltipPopup side="right">Pan right</TooltipPopup>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger
                            className="col-start-2"
                            render={<Button variant="outline" />}
                          >
                            <ChevronDownIcon aria-hidden="true" size={16} />
                          </TooltipTrigger>
                          <TooltipPopup side="bottom">Pan down</TooltipPopup>
                        </Tooltip>
                      </div>
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 1.1,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
              >
                <Card className="w-full rounded-xl border-none bg-sidebar p-5 dark:bg-card">
                  <CardHeader className="p-0">
                    <CardTitle>Form</CardTitle>
                  </CardHeader>
                  <CardPanel className="p-0">
                    <div className="mb-3 text-sm">Checkbox</div>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle9 />
                    </div>
                    <div className="mb-3 text-sm">Field</div>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle10 />
                    </div>
                    <div className="mb-3 text-sm">Meter</div>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle13 />
                    </div>
                    <div className="mb-3 text-sm">Number Field</div>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Particle14 />
                    </div>
                  </CardPanel>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Components;

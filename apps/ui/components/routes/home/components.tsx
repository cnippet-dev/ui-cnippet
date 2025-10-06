"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { RiArrowRightUpLine } from "@remixicon/react";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CircleIcon,
    GlobeIcon,
    ChevronDown,
    MailOpen,
    Loader2,
    ChevronRight,
    Minus,
    Plus,
    BellIcon,
} from "lucide-react";

import { Grid, Block } from "@/components/motion/grid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

import Chart1 from "@/registry/default/charts/bar-chart/bar-chart-demo";
import Chart2 from "@/registry/default/charts/line-chart/line-chart-demo";
import Chart3 from "@/registry/default/charts/radar-chart/radar-chart-demo";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/motion/dialog-cn";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Calendar as Cal } from "@/components/ui/calendar";
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import CldImage from "@/components/ui/cld-image";
import AppleStyleDock from "@/registry/default/motions/dock/dock-demo";
import TiltCard1 from "@/registry/default/motions/tilt/tilt-demo";
import ImageComparisonHover from "@/registry/default/motions/image-comparison/image-comparison-demo";
import { DashedBorder } from "@/components/dashed-layout";

const initialNotifications = [
    {
        id: 1,
        user: "Deepak Negi",
        action: "requested review on",
        target: "PR #42: Feature implementation",
        timestamp: "15 minutes ago",
        unread: true,
    },
    {
        id: 2,
        user: "Tushar",
        action: "shared",
        target: "New component library",
        timestamp: "45 minutes ago",
        unread: true,
    },
    {
        id: 3,
        user: "Aman",
        action: "assigned you to",
        target: "API integration task",
        timestamp: "4 hours ago",
        unread: false,
    },
    {
        id: 4,
        user: "Anita",
        action: "replied to your comment in",
        target: "Authentication flow",
        timestamp: "12 hours ago",
        unread: false,
    },
    {
        id: 5,
        user: "Sarah",
        action: "commented on",
        target: "Dashboard redesign",
        timestamp: "2 days ago",
        unread: false,
    },
    {
        id: 6,
        user: "Tanya",
        action: "mentioned you in",
        target: "Origin UI open graph image",
        timestamp: "2 weeks ago",
        unread: false,
    },
];

function Dot({ className }: { className?: string }) {
    return (
        <svg
            width="6"
            height="6"
            fill="currentColor"
            viewBox="0 0 6 6"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <circle cx="3" cy="3" r="3" />
        </svg>
    );
}

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
];

const images = [
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h3.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h7.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h8.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h9.jpg",
    "https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h10.jpg",
];

const GridComponents = () => {
    const [goal, setGoal] = useState(350);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<DateValue | null>(
        today(getLocalTimeZone()),
    );

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    }

    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter((n) => n.unread).length;

    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                unread: false,
            })),
        );
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, unread: false }
                    : notification,
            ),
        );
    };

    return (
        <>
            <section className="relative h-full">
                <DashedBorder />

                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div>
                        <h2 className="font-funnel mb-2 text-3xl font-normal tracking-tight text-gray-900 dark:text-gray-400">
                            Core components
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400">
                            Components built on top of Shadcn/UI, perfect for
                            building modern web applications.
                        </p>
                        <Link
                            href="/components"
                            target="_blank"
                            className="flex items-center pt-2"
                        >
                            Explore Components
                            <RiArrowRightUpLine className="ml-1 size-4 transition-transform duration-300 group-hover:rotate-45" />
                        </Link>
                    </div>
                    <Grid className="max-w-7xl gap-0">
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-5 md:border-r dark:border-neutral-700">
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Buttons
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                                        <Button>Default</Button>
                                        <Button variant="secondary">
                                            Secondary
                                        </Button>
                                        <Button variant="destructive">
                                            Destructive
                                        </Button>
                                        <Button variant="outline">
                                            Outline
                                        </Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="link">
                                            <Link href="/">Link</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            aria-label="Next"
                                        >
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
                                </CardContent>
                            </Card>
                        </Block>

                        <Block className="relative col-span-12 row-span-2 grid grid-cols-1 gap-6 border-b border-dashed p-2 pb-5 md:col-span-4 md:border-r dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Inputs
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="w-full max-w-md space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="input-12">
                                                Input with end inline add-on
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="input-12"
                                                    className="peer pe-12"
                                                    placeholder="google"
                                                    type="text"
                                                />
                                                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                                                    .com
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="input-18">
                                                Input with end select
                                            </Label>
                                            <div className="flex rounded-lg shadow-sm shadow-black/5">
                                                <Input
                                                    id="input-18"
                                                    className="-me-px rounded-e-none shadow-none focus-visible:z-10"
                                                    placeholder="google"
                                                    type="text"
                                                />
                                                <div className="relative inline-flex">
                                                    <select
                                                        className="peer border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/20 inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border ps-3 pe-8 text-sm transition-shadow focus:z-10 focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        aria-label="Domain suffix"
                                                    >
                                                        <option>
                                                            @gmail.com
                                                        </option>
                                                        <option>
                                                            @hotmail.com
                                                        </option>
                                                        <option>
                                                            @yahoo.com
                                                        </option>
                                                    </select>
                                                    <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
                                                        <ChevronDown
                                                            size={16}
                                                            strokeWidth={2}
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>

                        <Block className="relative col-span-12 row-span-2 grid grid-cols-1 gap-6 border-b border-dashed p-2 pb-5 md:col-span-3 dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>

                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Tooltip
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-fit bg-transparent"
                                                    >
                                                        Hover over me
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-black py-3">
                                                    <div className="flex gap-3">
                                                        <GlobeIcon
                                                            className="mt-0.5 shrink-0 opacity-60"
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                        <div className="space-y-1">
                                                            <p className="text-[13px] font-medium text-white">
                                                                Tooltip with
                                                                title and icon
                                                            </p>
                                                            <p className="text-muted-foreground text-xs">
                                                                Tooltips are
                                                                highly
                                                                customizable
                                                                with dynamic
                                                                placement, rich
                                                                content, and a
                                                                robust API.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        W/ image
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="py-3">
                                                    <div className="space-y-2">
                                                        <Image
                                                            src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1753946156/hero-4.png"
                                                            className="w-full rounded"
                                                            width={382}
                                                            height={216}
                                                            alt="Content image"
                                                        />
                                                        <div className="space-y-1">
                                                            <p className="text-[13px] font-medium">
                                                                Tooltip with
                                                                title and icon
                                                            </p>
                                                            <p className="text-muted-foreground text-xs">
                                                                Tooltips are
                                                                made to be
                                                                highly
                                                                customizable,
                                                                with features
                                                                like dynamic
                                                                placement, rich
                                                                content, and a
                                                                robust API.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <div className="inline-grid w-fit grid-cols-3 gap-1">
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            className="col-start-2"
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label="Pan camera up"
                                                        >
                                                            <ChevronUpIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="top"
                                                        className="px-2 py-1 text-xs"
                                                    >
                                                        Pan top
                                                        <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                                            ⌘T
                                                        </kbd>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            className="col-start-1"
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label="Pan camera left"
                                                        >
                                                            <ChevronLeftIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="left"
                                                        className="px-2 py-1 text-xs"
                                                    >
                                                        Pan left
                                                        <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                                            ⌘L
                                                        </kbd>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <div
                                                className="flex items-center justify-center"
                                                aria-hidden="true"
                                            >
                                                <CircleIcon
                                                    className="opacity-60"
                                                    size={16}
                                                />
                                            </div>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label="Pan camera right"
                                                        >
                                                            <ChevronRightIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="right"
                                                        className="px-2 py-1 text-xs"
                                                    >
                                                        Pan right
                                                        <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                                            ⌘R
                                                        </kbd>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            className="col-start-2"
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label="Pan camera down"
                                                        >
                                                            <ChevronDownIcon
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="bottom"
                                                        className="px-2 py-1 text-xs"
                                                    >
                                                        Pan bottom
                                                        <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                                            ⌘B
                                                        </kbd>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>

                        <Block className="col-span-12 row-span-2 grid grid-cols-1 gap-6 border-b border-dashed p-2 pb-5 md:col-span-3 md:border-r dark:border-neutral-700">
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Overlays
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-col items-center gap-6">
                                        <Dialog>
                                            <DialogTrigger className="bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                                                Join the waitlist
                                            </DialogTrigger>
                                            <DialogContent className="m-auto w-full max-w-md bg-white p-6 dark:bg-zinc-900">
                                                <DialogHeader>
                                                    <DialogTitle className="text-zinc-900 dark:text-white">
                                                        Join the waitlist
                                                    </DialogTitle>
                                                    <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                                                        Enter your email address
                                                        to receive updates when
                                                        we launch.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="mt-6 flex flex-col space-y-4">
                                                    <label
                                                        htmlFor="name"
                                                        className="sr-only"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="email"
                                                        className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5"
                                                        placeholder="Enter your email"
                                                    />
                                                    <button
                                                        className="inline-flex items-center justify-center self-end rounded-lg bg-black px-4 py-2 text-sm font-medium text-zinc-50 dark:bg-white dark:text-zinc-900"
                                                        type="submit"
                                                    >
                                                        Join now
                                                    </button>
                                                </div>
                                                <DialogClose />
                                            </DialogContent>
                                        </Dialog>

                                        <Drawer>
                                            <DrawerTrigger asChild>
                                                <Button variant="outline">
                                                    Open Drawer
                                                </Button>
                                            </DrawerTrigger>
                                            <DrawerContent>
                                                <div className="mx-auto w-full max-w-sm">
                                                    <DrawerHeader>
                                                        <DrawerTitle>
                                                            Move Goal
                                                        </DrawerTitle>
                                                        <DrawerDescription>
                                                            Set your daily
                                                            activity goal.
                                                        </DrawerDescription>
                                                    </DrawerHeader>
                                                    <div className="p-4 pb-0">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 shrink-0 rounded-full bg-transparent"
                                                                onClick={() =>
                                                                    onClick(-10)
                                                                }
                                                                disabled={
                                                                    goal <= 200
                                                                }
                                                            >
                                                                <Minus />
                                                                <span className="sr-only">
                                                                    Decrease
                                                                </span>
                                                            </Button>
                                                            <div className="flex-1 text-center">
                                                                <div className="text-7xl font-bold tracking-tighter">
                                                                    {goal}
                                                                </div>
                                                                <div className="text-muted-foreground text-[0.70rem] uppercase">
                                                                    Calories/day
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 shrink-0 rounded-full bg-transparent"
                                                                onClick={() =>
                                                                    onClick(10)
                                                                }
                                                                disabled={
                                                                    goal >= 400
                                                                }
                                                            >
                                                                <Plus />
                                                                <span className="sr-only">
                                                                    Increase
                                                                </span>
                                                            </Button>
                                                        </div>
                                                        <div className="mt-3 h-[120px]">
                                                            <ResponsiveContainer
                                                                width="100%"
                                                                height="100%"
                                                            >
                                                                <BarChart
                                                                    data={data}
                                                                >
                                                                    <Bar
                                                                        dataKey="goal"
                                                                        style={
                                                                            {
                                                                                fill: "hsl(var(--foreground))",
                                                                                opacity: 0.9,
                                                                            } as React.CSSProperties
                                                                        }
                                                                    />
                                                                </BarChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                    <DrawerFooter>
                                                        <Button>Submit</Button>
                                                        <DrawerClose asChild>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                        </DrawerClose>
                                                    </DrawerFooter>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="relative bg-transparent"
                                                    aria-label="Open notifications"
                                                >
                                                    <BellIcon
                                                        size={16}
                                                        aria-hidden="true"
                                                    />
                                                    {unreadCount > 0 && (
                                                        <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 bg-blue-600 px-1">
                                                            {unreadCount > 99
                                                                ? "99+"
                                                                : unreadCount}
                                                        </Badge>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80 p-1">
                                                <div className="flex items-baseline justify-between gap-4 px-3 py-2">
                                                    <div className="text-sm font-semibold">
                                                        Notifications
                                                    </div>
                                                    {unreadCount > 0 && (
                                                        <button
                                                            className="text-xs font-medium hover:underline"
                                                            onClick={
                                                                handleMarkAllAsRead
                                                            }
                                                        >
                                                            Mark all as read
                                                        </button>
                                                    )}
                                                </div>
                                                <div
                                                    role="separator"
                                                    aria-orientation="horizontal"
                                                    className="bg-border -mx-1 my-1 h-px"
                                                ></div>
                                                {notifications.map(
                                                    (notification) => (
                                                        <div
                                                            key={
                                                                notification.id
                                                            }
                                                            className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
                                                        >
                                                            <div className="relative flex items-start pe-3">
                                                                <div className="flex-1 space-y-1">
                                                                    <button
                                                                        className="text-foreground/80 text-left after:absolute after:inset-0"
                                                                        onClick={() =>
                                                                            handleNotificationClick(
                                                                                notification.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="text-foreground font-medium hover:underline">
                                                                            {
                                                                                notification.user
                                                                            }
                                                                        </span>{" "}
                                                                        {
                                                                            notification.action
                                                                        }{" "}
                                                                        <span className="text-foreground font-medium hover:underline">
                                                                            {
                                                                                notification.target
                                                                            }
                                                                        </span>
                                                                        .
                                                                    </button>
                                                                    <div className="text-muted-foreground text-xs">
                                                                        {
                                                                            notification.timestamp
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {notification.unread && (
                                                                    <div className="absolute end-0 self-center">
                                                                        <span className="sr-only">
                                                                            Unread
                                                                        </span>
                                                                        <Dot />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </PopoverContent>
                                        </Popover>

                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline">
                                                    Open sheet
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="p-5">
                                                <SheetHeader>
                                                    <SheetTitle>
                                                        Edit profile
                                                    </SheetTitle>
                                                    <SheetDescription>
                                                        Make changes to your
                                                        profile here. Click save
                                                        when you&apos;re done.
                                                    </SheetDescription>
                                                </SheetHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center justify-between gap-4">
                                                        <Label htmlFor="name">
                                                            Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="Enter your name"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="username">
                                                            Username
                                                        </Label>
                                                        <Input
                                                            id="username"
                                                            placeholder="example@cnippet.dev"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <SheetFooter>
                                                    <SheetClose asChild>
                                                        <Button type="submit">
                                                            Save changes
                                                        </Button>
                                                    </SheetClose>
                                                </SheetFooter>
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>

                        <Block className="relative col-span-12 row-span-2 grid grid-cols-1 gap-6 border-b border-dashed p-2 pb-5 md:col-span-4 md:border-r dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>

                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Controls
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            Open Command Menu ⌘ / or /
                                        </Button>
                                        {isOpen && (
                                            <CommandDialog
                                                open={isOpen}
                                                onOpenChange={setIsOpen}
                                            >
                                                <Command className="max-w-lg rounded-lg border shadow-md">
                                                    <CommandInput placeholder="Type a command or search..." />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No results found.
                                                        </CommandEmpty>
                                                        <CommandGroup heading="Suggestions">
                                                            <CommandItem>
                                                                <Calendar />
                                                                <span>
                                                                    Calendar
                                                                </span>
                                                            </CommandItem>
                                                            <CommandItem>
                                                                <Smile />
                                                                <span>
                                                                    Search Emoji
                                                                </span>
                                                            </CommandItem>
                                                            <CommandItem
                                                                disabled
                                                            >
                                                                <Calculator />
                                                                <span>
                                                                    Calculator
                                                                </span>
                                                            </CommandItem>
                                                        </CommandGroup>
                                                        <CommandSeparator />
                                                        <CommandGroup heading="Settings">
                                                            <CommandItem>
                                                                <User />
                                                                <span>
                                                                    Profile
                                                                </span>
                                                                <CommandShortcut>
                                                                    ⌘P
                                                                </CommandShortcut>
                                                            </CommandItem>
                                                            <CommandItem>
                                                                <CreditCard />
                                                                <span>
                                                                    Billing
                                                                </span>
                                                                <CommandShortcut>
                                                                    ⌘B
                                                                </CommandShortcut>
                                                            </CommandItem>
                                                            <CommandItem>
                                                                <Settings />
                                                                <span>
                                                                    Settings
                                                                </span>
                                                                <CommandShortcut>
                                                                    ⌘S
                                                                </CommandShortcut>
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </CommandDialog>
                                        )}

                                        <ContextMenu>
                                            <ContextMenuTrigger className="flex h-40 w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                                                Right click here
                                            </ContextMenuTrigger>
                                            <ContextMenuContent className="w-64">
                                                <ContextMenuItem inset>
                                                    Back
                                                    <ContextMenuShortcut>
                                                        ⌘[
                                                    </ContextMenuShortcut>
                                                </ContextMenuItem>
                                                <ContextMenuItem inset disabled>
                                                    Forward
                                                    <ContextMenuShortcut>
                                                        ⌘]
                                                    </ContextMenuShortcut>
                                                </ContextMenuItem>
                                                <ContextMenuItem inset>
                                                    Reload
                                                    <ContextMenuShortcut>
                                                        ⌘R
                                                    </ContextMenuShortcut>
                                                </ContextMenuItem>
                                                <ContextMenuSub>
                                                    <ContextMenuSubTrigger
                                                        inset
                                                    >
                                                        More Tools
                                                    </ContextMenuSubTrigger>
                                                    <ContextMenuSubContent className="w-48">
                                                        <ContextMenuItem>
                                                            Save Page As...
                                                            <ContextMenuShortcut>
                                                                ⇧⌘S
                                                            </ContextMenuShortcut>
                                                        </ContextMenuItem>
                                                        <ContextMenuItem>
                                                            Create Shortcut...
                                                        </ContextMenuItem>
                                                        <ContextMenuItem>
                                                            Name Window...
                                                        </ContextMenuItem>
                                                        <ContextMenuSeparator />
                                                        <ContextMenuItem>
                                                            Developer Tools
                                                        </ContextMenuItem>
                                                    </ContextMenuSubContent>
                                                </ContextMenuSub>
                                                <ContextMenuSeparator />
                                                <ContextMenuCheckboxItem
                                                    checked
                                                >
                                                    Show Bookmarks Bar
                                                    <ContextMenuShortcut>
                                                        ⌘⇧B
                                                    </ContextMenuShortcut>
                                                </ContextMenuCheckboxItem>
                                                <ContextMenuCheckboxItem>
                                                    Show Full URLs
                                                </ContextMenuCheckboxItem>
                                                <ContextMenuSeparator />
                                                <ContextMenuRadioGroup value="pedro">
                                                    <ContextMenuLabel inset>
                                                        People
                                                    </ContextMenuLabel>
                                                    <ContextMenuSeparator />
                                                    <ContextMenuRadioItem value="pedro">
                                                        Pedro Duarte
                                                    </ContextMenuRadioItem>
                                                    <ContextMenuRadioItem value="colm">
                                                        Colm Tuite
                                                    </ContextMenuRadioItem>
                                                </ContextMenuRadioGroup>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>

                        <Block className="relative col-span-12 row-span-2 grid grid-cols-1 gap-6 border-b border-dashed p-2 pb-5 md:col-span-5 dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Calendar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        <Cal
                                            className="rounded-md border p-2"
                                            value={date}
                                            onChange={setDate}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>
                    </Grid>

                    <div>
                        <h2 className="font-funnel mb-2 text-3xl font-normal tracking-tight text-gray-900 dark:text-gray-400">
                            Motion components
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400">
                            Components built on top of framer motion, perfect
                            for building modern web applications.
                        </p>
                        <Link
                            href="/motions"
                            target="_blank"
                            className="flex items-center"
                        >
                            Explore Components
                            <RiArrowRightUpLine className="ml-1 size-4 transition-transform duration-300 group-hover:rotate-45" />
                        </Link>
                    </div>
                    <Grid className="max-w-7xl gap-0">
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-6 md:border-r dark:border-neutral-700">
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Infinite Slider
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                                        <InfiniteSlider gap={24}>
                                            {images.map((image, i) => (
                                                <CldImage
                                                    key={i}
                                                    src={image}
                                                    alt="Apple Music logo"
                                                    width={1920}
                                                    height={1080}
                                                    sizes="100vw"
                                                    className="aspect-square w-24 object-cover md:w-36"
                                                />
                                            ))}
                                        </InfiniteSlider>
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-6 dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Dock
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-4 py-12 md:p-2">
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                                        <AppleStyleDock />
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-6 md:border-r dark:border-neutral-700">
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Tilt Card
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                                        <TiltCard1 />
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-6 dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Image Comparision
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                                        <ImageComparisonHover />
                                    </div>
                                </CardContent>
                            </Card>
                        </Block>
                    </Grid>

                    <div>
                        <h2 className="font-funnel mb-2 text-3xl font-normal tracking-tight text-gray-900 dark:text-gray-400">
                            Chart components
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed tracking-tight text-gray-700 dark:text-gray-400">
                            Components built on top of Shadcn/UI, perfect for
                            building modern web applications.
                        </p>
                        <Link
                            href="/charts"
                            target="_blank"
                            className="flex items-center pt-2"
                        >
                            Explore Components
                            <RiArrowRightUpLine className="ml-1 size-4 transition-transform duration-300 group-hover:rotate-45" />
                        </Link>
                    </div>
                    <Grid className="max-w-7xl gap-0">
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-4 md:border-r dark:border-neutral-700">
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Bar Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Chart1 />
                                </CardContent>
                            </Card>
                        </Block>
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-4 md:border-r dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Line Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Chart2 />
                                </CardContent>
                            </Card>
                        </Block>
                        <Block className="relative col-span-12 row-span-2 border-b border-dashed p-2 md:col-span-4 dark:border-neutral-700">
                            <div
                                className="dot-center hidden md:block"
                                data-framer-name="Ellipsis"
                            ></div>
                            <Card className="space-y-5 border-none shadow-none">
                                <CardHeader className="p-2">
                                    <CardTitle className="font-funnel text-xl font-normal tracking-wide">
                                        Radar Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <Chart3 />
                                </CardContent>
                            </Card>
                        </Block>
                    </Grid>
                </div>
            </section>
        </>
    );
};

export default GridComponents;

"use client";

import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className,
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="h-full text-muted sm:w-full"
        height="100%"
        viewBox="0 0 200 100"
        width="100%"
      >
        <g
          fill="none"
          pathLength="100"
          stroke="currentColor"
          strokeDasharray="100 100"
          strokeWidth="0.4"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            calcMode="spline"
            dur="1s"
            fill="freeze"
            from="100"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
            to="0"
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            fill="url(#db-blue-grad)"
            r="12"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            fill="url(#db-blue-grad)"
            r="12"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            fill="url(#db-blue-grad)"
            r="12"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            fill="url(#db-blue-grad)"
            r="12"
          />
        </g>
        {/* Buttons */}
        <g fill="none" stroke="currentColor" strokeWidth="0.4">
          {/* First Button */}
          <g>
            <rect fill="#18181B" height="10" rx="5" width="34" x="14" y="5" />
            <DatabaseIcon x="18" y="7.5" />
            <text
              fill="white"
              fontSize="5"
              fontWeight="500"
              stroke="none"
              x="28"
              y="12"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect fill="#18181B" height="10" rx="5" width="34" x="60" y="5" />
            <DatabaseIcon x="64" y="7.5" />
            <text
              fill="white"
              fontSize="5"
              fontWeight="500"
              stroke="none"
              x="74"
              y="12"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect fill="#18181B" height="10" rx="5" width="34" x="108" y="5" />
            <DatabaseIcon x="112" y="7.5" />
            <text
              fill="white"
              fontSize="5"
              fontWeight="500"
              stroke="none"
              x="122"
              y="12"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect fill="#18181B" height="10" rx="5" width="40" x="150" y="5" />
            <DatabaseIcon x="154" y="7.5" />
            <text
              fill="white"
              fontSize="5"
              fontWeight="500"
              stroke="none"
              x="165"
              y="12"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              stroke="white"
              strokeWidth="0.5"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              stroke="white"
              strokeWidth="0.5"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              stroke="white"
              strokeWidth="0.5"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              stroke="white"
              strokeWidth="0.5"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient fx="1" id="db-blue-grad">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 py-1 sm:-top-4 sm:py-1.5">
          <SparklesIcon className="size-3" />
          <span className="ml-2 text-[10px]">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t bg-[#141516] font-semibold text-xs">
          {circleText ? circleText : "SVG"}
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 flex h-7 items-center gap-2 rounded-full border bg-[#101112] px-3 text-xs">
            <HeartHandshakeIcon className="size-4" />
            <span>{buttonTexts?.first || "LegionDev"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 items-center gap-2 rounded-full border bg-[#101112] px-3 text-xs sm:flex">
            <Folder className="size-4" />
            <span>{buttonTexts?.second || "v2_updates"}</span>
          </div>
          {/* Circles */}
          <motion.div
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-accent/5"
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-accent/5"
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-accent/5"
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-accent/5"
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      fill="none"
      height="5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="5"
      x={x}
      xmlns="http://www.w3.org/2000/svg"
      y={y}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};

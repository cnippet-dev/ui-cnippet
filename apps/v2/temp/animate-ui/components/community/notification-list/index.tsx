"use client";

import { ArrowUpRight, RotateCcw } from "lucide-react";
import { motion, type Transition } from "motion/react";

const notifications = [
  {
    count: 2,
    id: 1,
    subtitle: "1,227 packages added!",
    time: "just now",
    title: "NPM Install Complete",
  },
  {
    id: 2,
    subtitle: "Build finished in 12.34s",
    time: "1m 11s",
    title: "Build Succeeded",
  },
  {
    id: 3,
    subtitle: "No problems found",
    time: "5m",
    title: "Lint Passed",
  },
];

const transition: Transition = {
  damping: 26,
  stiffness: 300,
  type: "spring",
};

const getCardVariants = (i: number) => ({
  collapsed: {
    marginTop: i === 0 ? 0 : -44,
    scaleX: 1 - i * 0.05,
  },
  expanded: {
    marginTop: i === 0 ? 0 : 4,
    scaleX: 1,
  },
});

const textSwitchTransition: Transition = {
  duration: 0.22,
  ease: "easeInOut",
};

const notificationTextVariants = {
  collapsed: { opacity: 1, pointerEvents: "auto", y: 0 },
  expanded: { opacity: 0, pointerEvents: "none", y: -16 },
};

const viewAllTextVariants = {
  collapsed: { opacity: 0, pointerEvents: "none", y: 16 },
  expanded: { opacity: 1, pointerEvents: "auto", y: 0 },
};

function NotificationList() {
  return (
    <motion.div
      className="w-xs space-y-3 rounded-3xl bg-neutral-200 p-3 shadow-md dark:bg-neutral-900"
      initial="collapsed"
      whileHover="expanded"
    >
      <div>
        {notifications.map((notification, i) => (
          <motion.div
            className="relative rounded-xl bg-neutral-100 px-4 py-2 shadow-sm transition-shadow duration-200 hover:shadow-lg dark:bg-neutral-800"
            key={notification.id}
            style={{
              zIndex: notifications.length - i,
            }}
            transition={transition}
            variants={getCardVariants(i)}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-medium text-sm">{notification.title}</h1>
              {notification.count && (
                <div className="flex items-center gap-0.5 font-medium text-neutral-500 text-xs dark:text-neutral-300">
                  <RotateCcw className="size-3" />
                  <span>{notification.count}</span>
                </div>
              )}
            </div>
            <div className="font-medium text-neutral-500 text-xs">
              <span>{notification.time}</span>
              &nbsp;•&nbsp;
              <span>{notification.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex size-5 items-center justify-center rounded-full bg-neutral-400 font-medium text-white text-xs">
          {notifications.length}
        </div>
        <span className="grid">
          <motion.span
            className="col-start-1 row-start-1 font-medium text-neutral-600 text-sm dark:text-neutral-300"
            transition={textSwitchTransition}
            variants={notificationTextVariants}
          >
            Notifications
          </motion.span>
          <motion.span
            className="col-start-1 row-start-1 flex cursor-pointer select-none items-center gap-1 font-medium text-neutral-600 text-sm dark:text-neutral-300"
            transition={textSwitchTransition}
            variants={viewAllTextVariants}
          >
            View all <ArrowUpRight className="size-4" />
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
}

export { NotificationList };

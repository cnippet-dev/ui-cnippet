"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/ui/avatar";
import { cn } from "@workspace/ui/lib/utils";
import { LayoutGroup, motion } from "motion/react";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/animate/tooltip";

const USERS = [
  {
    fallback: "AK",
    id: 1,
    online: true,
    src: "https://pbs.twimg.com/profile_images/1897311929028255744/otxpL-ke_400x400.jpg",
    tooltip: "Arhamkhnz",
  },
  {
    fallback: "SK",
    id: 2,
    online: true,
    src: "https://pbs.twimg.com/profile_images/1948770261848756224/oPwqXMD6_400x400.jpg",
    tooltip: "Skyleen",
  },
  {
    fallback: "CN",
    id: 3,
    online: true,
    src: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
    tooltip: "Shadcn",
  },
  {
    fallback: "AW",
    id: 4,
    online: false,
    src: "https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg",
    tooltip: "Adam Wathan",
  },
  {
    fallback: "GR",
    id: 5,
    online: false,
    src: "https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg",
    tooltip: "Guillermo Rauch",
  },
  {
    fallback: "JH",
    id: 6,
    online: false,
    src: "https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg",
    tooltip: "Jhey",
  },
];

const AVATAR_MOTION_TRANSITION = {
  damping: 25,
  stiffness: 200,
  type: "spring",
} as const;

const GROUP_CONTAINER_TRANSITION = {
  damping: 20,
  stiffness: 150,
  type: "spring",
} as const;

function UserPresenceAvatar() {
  const [users, setUsers] = React.useState(USERS);
  const [togglingGroup, setTogglingGroup] = React.useState<
    "online" | "offline" | null
  >(null);

  const online = users.filter((u) => u.online);
  const offline = users.filter((u) => !u.online);

  const toggleStatus = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    setTogglingGroup(user.online ? "online" : "offline");
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      const target = updated[idx];
      if (!target) return prev;
      updated.splice(idx, 1);
      updated.push({ ...target, online: !target.online });
      return updated;
    });
    // Reset group z-index after the animation duration (keep in sync with animation timing)
    setTimeout(() => setTogglingGroup(null), 500);
  };

  return (
    <div className="flex items-center gap-5">
      <LayoutGroup>
        <TooltipProvider>
          {online.length > 0 && (
            <motion.div
              className={cn(
                "rounded-full bg-neutral-300 p-0.5 dark:bg-neutral-700",
                togglingGroup === "online" ? "z-5" : "z-10",
              )}
              layout
              transition={GROUP_CONTAINER_TRANSITION}
            >
              <div
                className="flex h-12 items-center -space-x-3"
                key={`${online.map((u) => u.id).join("_")}-online`}
              >
                {online.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger asChild>
                      <motion.div
                        animate={{
                          filter: "grayscale(0)",
                          scale: 1,
                        }}
                        className="cursor-pointer"
                        initial={false}
                        layoutId={`avatar-${user.id}`}
                        onClick={() => toggleStatus(user.id)}
                        title="Click to go offline"
                        transition={AVATAR_MOTION_TRANSITION}
                      >
                        <Avatar className="size-12 border-3 border-neutral-300 dark:border-neutral-700">
                          <AvatarImage src={user.src} />
                          <AvatarFallback>{user.fallback}</AvatarFallback>
                          <TooltipContent>
                            <p>{user.tooltip}</p>
                          </TooltipContent>
                        </Avatar>
                      </motion.div>
                    </TooltipTrigger>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}

          {offline.length > 0 && (
            <motion.div
              className={cn(
                "rounded-full bg-neutral-300 p-0.5 dark:bg-neutral-700",
                togglingGroup === "offline" ? "z-5" : "z-10",
              )}
              layout
              transition={GROUP_CONTAINER_TRANSITION}
            >
              <div
                className="flex h-12 items-center -space-x-3"
                key={`${offline.map((u) => u.id).join("_")}-offline`}
              >
                {offline.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger asChild>
                      <motion.div
                        animate={{
                          filter: "grayscale(1)",
                          scale: 1,
                        }}
                        className="cursor-pointer"
                        initial={false}
                        layoutId={`avatar-${user.id}`}
                        onClick={() => toggleStatus(user.id)}
                        title="Click to go online"
                        transition={AVATAR_MOTION_TRANSITION}
                      >
                        <Avatar className="size-12 border-3 border-neutral-300 dark:border-neutral-700">
                          <AvatarImage src={user.src} />
                          <AvatarFallback>{user.fallback}</AvatarFallback>
                          <TooltipContent>
                            <p>{user.tooltip}</p>
                          </TooltipContent>
                        </Avatar>
                      </motion.div>
                    </TooltipTrigger>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}
        </TooltipProvider>
      </LayoutGroup>
    </div>
  );
}

export { UserPresenceAvatar };

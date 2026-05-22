/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@workspace/ui/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import { easeOut, motion } from "motion/react";
import * as React from "react";

export interface FlipCardData {
  name: string;
  username: string;
  image: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    posts?: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface FlipCardProps {
  data: FlipCardData;
}

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
    front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div
      className="perspective-1000 relative mx-auto mt-2 h-60 w-40 cursor-pointer md:h-80 md:w-60"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* FRONT: Profile */}
      <motion.div
        animate={isFlipped ? "back" : "front"}
        className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-md border-2 border-foreground/20 bg-gradient-to-br from-muted via-background to-muted px-4 py-6 text-center"
        style={{ transformStyle: "preserve-3d" }}
        variants={cardVariants}
      >
        <img
          alt={data.name}
          className="mb-4 size-20 rounded-full border-2 object-cover md:size-24"
          src={data.image}
        />
        <h2 className="font-bold text-foreground text-lg">{data.name}</h2>
        <p className="text-muted-foreground text-sm">@{data.username}</p>
      </motion.div>

      {/* BACK: Bio + Stats + Socials */}
      <motion.div
        animate={isFlipped ? "front" : "back"}
        className="backface-hidden absolute inset-0 flex flex-col items-center justify-between gap-y-4 rounded-md border-2 border-foreground/20 bg-gradient-to-tr from-muted via-background to-muted px-4 py-6"
        initial={{ rotateY: 180 }}
        style={{ rotateY: 180, transformStyle: "preserve-3d" }}
        variants={cardVariants}
      >
        <p className="text-center text-muted-foreground text-xs md:text-sm">
          {data.bio}
        </p>

        <div className="flex w-full items-center justify-between px-6">
          <div>
            <p className="font-bold text-base">{data.stats.following}</p>
            <p className="text-muted-foreground text-xs">Following</p>
          </div>
          <div>
            <p className="font-bold text-base">{data.stats.followers}</p>
            <p className="text-muted-foreground text-xs">Followers</p>
          </div>
          {data.stats.posts && (
            <div>
              <p className="font-bold text-base">{data.stats.posts}</p>
              <p className="text-muted-foreground text-xs">Posts</p>
            </div>
          )}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4">
          {data.socialLinks?.linkedin && (
            <a
              className="transition-transform hover:scale-105"
              href={data.socialLinks.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin size={20} />
            </a>
          )}
          {data.socialLinks?.github && (
            <a
              className="transition-transform hover:scale-105"
              href={data.socialLinks.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github size={20} />
            </a>
          )}
          {data.socialLinks?.twitter && (
            <a
              className="transition-transform hover:scale-105"
              href={data.socialLinks.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter size={20} />
            </a>
          )}
        </div>

        <Button>Follow</Button>
      </motion.div>
    </div>
  );
}

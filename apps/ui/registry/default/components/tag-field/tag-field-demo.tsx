"use client";
import React, { useState, useRef, useEffect } from "react";
import { TagsInput } from "@/components/ui/tag-field";

export default function App() {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className="mx-auto mt-10 max-w-md">
            <TagsInput tags={tags} setTags={setTags} />
            <div className="mt-4">
                <p className="text-sm">Current Tags:</p>
                <div className="mt-2 flex gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-gray-200 px-2 text-sm text-gray-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

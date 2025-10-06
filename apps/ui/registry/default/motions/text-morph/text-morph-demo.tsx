"use client";
import { useState } from "react";
import { TextMorph } from "@/components/motion/text-morph";

export default function TextMorphButton() {
    const [text, setText] = useState("Click here");

    return (
        <button
            onClick={() =>
                setText(
                    text === "Click here" ? "You are Awesome" : "Click here",
                )
            }
            className="text-xl font-medium"
        >
            <TextMorph>{text}</TextMorph>
        </button>
    );
}

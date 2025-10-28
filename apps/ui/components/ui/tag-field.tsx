"use client";
import React, { useState, useRef, useEffect } from "react";
import { Badge } from "./badge";
import { XIcon } from "lucide-react";
import { Input } from "./input";

interface TagsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  editTag?: boolean;
}

export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  setTags,
  editTag = true,
}) => {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedInput = input.trim();

    if ((e.key === "Enter" || e.key === ",") && trimmedInput) {
      e.preventDefault();
      if (editingIndex !== null) {
        const updatedTags = [...tags];
        updatedTags[editingIndex] = trimmedInput;
        setTags(updatedTags);
        setEditingIndex(null);
      } else if (!tags.includes(trimmedInput)) {
        setTags([...tags, trimmedInput]);
      }
      setInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    if (editingIndex !== null) {
      setEditingIndex(null);
    }
  };

  const handleEditTag = (index: number) => {
    if (editTag) {
      setInput(tags[index]);
      setEditingIndex(index);
      setTimeout(() => editInputRef.current?.focus(), 0); // Focus on edit input
    }
  };

  const handleBlur = () => {
    if (editingIndex !== null) {
      const updatedTags = [...tags];
      const trimmedInput = input.trim();
      if (trimmedInput) {
        updatedTags[editingIndex] = trimmedInput;
      } else {
        updatedTags.splice(editingIndex, 1);
      }
      setTags(updatedTags);
      setEditingIndex(null);
    }
    setInput("");
  };

  useEffect(() => {
    // Resize the input width based on text content
    if (editInputRef.current) {
      editInputRef.current.style.width = `${input.length + 1}ch`;
    }
  }, [input]);

  return (
    <div className="bg-background flex items-center gap-2 rounded-md border px-2 dark:border-neutral-700">
      {tags.map((tag, index) => (
        <div key={tag} className="relative">
          {editTag && editingIndex === index ? (
            <Input
              ref={editInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleAddTag}
              onBlur={handleBlur}
              className="w-full rounded border-none px-2 text-sm shadow-none outline-0 transition-none focus:border-none focus:ring-0 focus:outline-0 focus-visible:ring-0"
              placeholder="Edit tag..."
              style={{ width: `${input.length + 1 * 1.2}px` }}
              autoFocus
            />
          ) : (
            <Badge onClick={() => handleEditTag(index)}>
              {tag}
              <button
                className="focus-visible:border-ring focus-visible:ring-ring/50 text-primary-foreground/60 hover:text-primary-foreground -my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
              >
                <XIcon size={12} aria-hidden="true" />
              </button>
            </Badge>
            // <span
            //     onClick={() => handleEditTag(index)}
            //     className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 px-1 py-1 pl-2 text-sm font-medium text-white hover:bg-blue-600"
            // >
            //     {tag}
            //     <button
            //         onClick={(e) => {
            //             e.stopPropagation();
            //             handleRemoveTag(tag);
            //         }}
            //         className="bg-background rounded px-1 text-white hover:text-gray-300 focus:outline-none"
            //     >
            //         &times;
            //     </button>
            // </span>
          )}
        </div>
      ))}
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAddTag}
        className={`w-full rounded border-none px-2 text-sm shadow-none outline-0 transition-none focus:border-none focus:ring-0 focus:outline-0 focus-visible:ring-0 ${
          editingIndex !== null ? "opacity-0" : "opacity-100"
        }`}
        placeholder="Add a tag..."
      />
    </div>
  );
};

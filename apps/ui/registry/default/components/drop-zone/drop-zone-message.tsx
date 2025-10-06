"use client";

import {
    FileUploader,
    FileInput,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/drop-zone";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

const FileUploadDropzone = () => {
    const [files, setFiles] = useState<File[] | null>([]);
    const [message, setMessage] = useState("");

    const dropzone = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: true,
        maxFiles: 4,
        maxSize: 1 * 1024 * 1024,
    } satisfies DropzoneOptions;

    return (
        <div
            className={`${
                files?.length == 0 && "flex gap-0"
            } bg-background relative mx-auto w-96 rounded-md border p-2`}
        >
            <FileUploader
                value={files}
                orientation="vertical"
                onValueChange={setFiles}
                className="w-fit pr-3"
                dropzoneOptions={dropzone}
            >
                {files?.length === 0 ? (
                    // Layout when no files are present
                    <div className="flex items-center gap-2">
                        <FileInput
                            className="bg-primary text-background w-fit rounded-md"
                            parentclass="w-fit"
                        >
                            <Paperclip className="size-8 p-1.5" />
                            <span className="sr-only">Select your files</span>
                        </FileInput>
                    </div>
                ) : (
                    // Layout when files are present
                    <div className="mb-2 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <FileInput
                                className="bg-primary-foreground border-primary/20 text-primary w-fit rounded-md border"
                                parentclass="w-fit"
                            >
                                <Paperclip className="size-12 p-3" />
                                <span className="sr-only">
                                    Select your files
                                </span>
                            </FileInput>
                            <FileUploaderContent className="flex flex-row items-start gap-1">
                                {files?.map((file, i) => (
                                    <FileUploaderItem
                                        key={i}
                                        index={i}
                                        className="size-12 w-fit overflow-hidden rounded-md border p-0"
                                        aria-roledescription={`file ${i + 1} containing ${
                                            file.name
                                        }`}
                                    >
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            height={80}
                                            width={80}
                                            className="bg-primary size-12 rounded-md object-cover"
                                        />
                                    </FileUploaderItem>
                                ))}
                            </FileUploaderContent>
                        </div>
                    </div>
                )}
            </FileUploader>
            <input
                type="text"
                className="bg-background w-full outline-none"
                placeholder="Your message here..."
            />
        </div>
    );
};

export default FileUploadDropzone;

"use client";

import { useState } from "react";
import {
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
    FileInput,
} from "@/components/ui/drop-zone";
import { Paperclip } from "lucide-react";

const FileSvgDraw = () => {
    return (
        <>
            <svg
                className="text-primary mb-3 h-8 w-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p className="text-primary mb-1 text-sm">
                <span className="font-semibold">Click to upload</span>
                &nbsp; or drag and drop
            </p>
            <p className="text-primary text-xs">SVG, PNG, JPG or GIF</p>
        </>
    );
};

const FileUploaderTest = () => {
    const [files, setFiles] = useState<File[] | null>(null);

    const dropZoneConfig = {
        maxFiles: 5,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };

    return (
        <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropZoneConfig}
            className="relative mx-auto w-96 rounded-lg p-2"
        >
            <FileInput className="bg-background outline-primary/40 outline-2 outline-dashed">
                <div className="flex w-full flex-col items-center justify-center pt-3 pb-4">
                    <FileSvgDraw />
                </div>
            </FileInput>
            <FileUploaderContent>
                {files &&
                    files.length > 0 &&
                    files.map((file, i) => (
                        <FileUploaderItem
                            key={i}
                            index={i}
                            className="bg-background"
                        >
                            <Paperclip className="h-4 w-4 flex-shrink-0 stroke-current" />
                            <p className="inline-block w-full overflow-hidden text-xs text-ellipsis">
                                {file.name}
                            </p>
                        </FileUploaderItem>
                    ))}
            </FileUploaderContent>
        </FileUploader>
    );
};

export default FileUploaderTest;

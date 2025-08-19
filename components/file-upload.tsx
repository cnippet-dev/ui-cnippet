"use client";

import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface AvatarUploadProps {
    onSuccess: (url: string) => void;
    onError?: (error: string) => void;
}

export const AvatarUpload = ({ onSuccess, onError }: AvatarUploadProps) => {
    return (
        <CldUploadWidget
            uploadPreset="upload-cld"
            options={{
                resourceType: "image",
                maxFileSize: 5242880, // 5MB
                cropping: true,
                croppingAspectRatio: 1,
                croppingDefaultSelectionRatio: 1,
                croppingShowDimensions: true,
                sources: ["local", "camera"],
                multiple: false,
                styles: {
                    palette: {
                        window: "#FFFFFF",
                        sourceBg: "#F4F4F5",
                        windowBorder: "#90A0B3",
                        tabIcon: "#000000",
                        inactiveTabIcon: "#555a5f",
                        menuIcons: "#555a5f",
                        link: "#0000FF",
                        action: "#0000FF",
                        inProgress: "#0000FF",
                        complete: "#00B100",
                        error: "#EA0000",
                        textDark: "#000000",
                        textLight: "#FFFFFF",
                    },
                },
            }}
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess={(result: any) => {
                if (result?.info?.secure_url) {
                    onSuccess(result.info.secure_url);
                }
            }}
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError={(error: any) => {
                console.error("Upload error:", error);
                onError?.(error.message || "Image upload failed");
                toast.error("Image upload failed");
            }}
        >
            {({ open }) => (
                <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 rounded-full border-2 border-white bg-white shadow-lg hover:bg-gray-100"
                    onClick={(e) => {
                        e.preventDefault();
                        open();
                    }}
                >
                    <Camera className="h-4 w-4 text-gray-700" />
                </Button>
            )}
        </CldUploadWidget>
    );
};

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function AvatarPreview() {
  return (
    <div className="group relative flex h-12 w-29 items-center justify-center">
      {/* Single avatar — visible, fades out on hover */}
      <Skeleton className="absolute flex size-12 items-center justify-center rounded-full transition-opacity duration-300 group-hover:opacity-0">
        <svg
          className="size-9 text-neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12 2C6.47656 2 2 6.47717 2 12C2 14.897 3.23047 17.5063 5.19922 19.3326C6.98438 20.9879 9.375 22 12 22C14.625 22 17.0156 20.9879 18.8008 19.3326C20.7695 17.5063 22 14.897 22 12C22 6.47717 17.5234 2 12 2ZM5.97656 17.9968C7.30078 16.174 9.41016 15 12 15C14.5898 15 16.6992 16.174 18.0234 17.9968C16.4844 19.543 14.3555 20.5 12 20.5C9.64453 20.5 7.51562 19.543 5.97656 17.9968ZM12 6.75C10.2031 6.75 8.75 8.20508 8.75 10C8.75 11.7949 10.2031 13.25 12 13.25C13.7969 13.25 15.25 11.7949 15.25 10C15.25 8.20508 13.7969 6.75 12 6.75Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </Skeleton>

      {/* Stacked avatars — hidden, fades in on hover */}
      <div className="absolute flex space-x-[-0.9rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Skeleton className="flex size-12 items-center justify-center rounded-full">
          <Image
            alt="Avatar"
            className="size-11 rounded-full object-cover"
            height={48}
            src="https://images.cnippet.dev/image/upload/v1770400411/a2.jpg"
            width={48}
          />
        </Skeleton>
        <Skeleton className="flex size-12 items-center justify-center rounded-full">
          <Image
            alt="Avatar"
            className="size-11 rounded-full object-cover"
            height={48}
            src="https://images.cnippet.dev/image/upload/v1770400411/a5.jpg"
            width={48}
          />
        </Skeleton>
        <Skeleton className="flex size-12 items-center justify-center rounded-full">
          <Image
            alt="Avatar"
            className="size-11 rounded-full object-cover"
            height={48}
            src="https://images.cnippet.dev/image/upload/v1770400411/a3.jpg"
            width={48}
          />
        </Skeleton>
      </div>
    </div>
  );
}

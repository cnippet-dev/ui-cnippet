import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<main className="relative">
			<div className="mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-12">
				<div className="space-y-2 pt-10 pb-3">
					<Skeleton className="h-8 w-3/4 sm:h-10" />
					<Skeleton className="h-4 w-full max-w-[720px]" />
				</div>

				<div className="pb-12">
					<article className="prose prose-gray dark:prose-invert max-w-none">
						<div className="space-y-3">
							<Skeleton className="h-5 w-5/6" />
							<Skeleton className="h-5 w-11/12" />
							<Skeleton className="h-5 w-4/5" />
						</div>

						<div className="mt-6 space-y-3">
							<Skeleton className="h-5 w-10/12" />
							<Skeleton className="h-5 w-9/12" />
							<Skeleton className="h-5 w-8/12" />
						</div>

						<div className="mt-8 rounded-lg border p-4">
							<Skeleton className="h-4 w-1/3 mb-3" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-11/12" />
								<Skeleton className="h-4 w-10/12" />
							</div>
						</div>

						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Skeleton className="h-6 w-3/5" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-4/6" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-6 w-2/5" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-4/6" />
							</div>
						</div>
					</article>
				</div>
			</div>

			<div className="hidden xl:block">
				<div className="sticky top-16 -mt-10 pt-6">
					<div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-2 pb-6 pl-4">
						<div className="relative mt-8 origin-center -translate-x-3 p-6">
							<div className="space-y-3">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-5 w-52" />
								<div className="space-y-2 pt-1">
									<Skeleton className="h-3 w-40" />
									<Skeleton className="h-3 w-36" />
									<Skeleton className="h-3 w-44" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}



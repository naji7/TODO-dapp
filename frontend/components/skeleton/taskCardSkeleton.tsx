import { Skeleton } from "@nextui-org/react";

export default function TaskCardSkeleton() {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3 flex-row justify-between ">
      <div>
        <Skeleton className="flex rounded w-5 h-5 bg-gray-500" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg bg-gray-500" />
        <Skeleton className="h-3 w-4/5 rounded-lg bg-gray-500" />
      </div>
    </div>
  );
}

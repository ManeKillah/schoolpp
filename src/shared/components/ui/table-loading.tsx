import {Skeleton} from "@/shared/components/ui/skeleton";

export function TableLoading() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-7 w-[40%] rounded-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[200px] w-full rounded-md" />
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Skeleton className="h-7 w-[100px] rounded-full" />
        <Skeleton className="h-7 w-[100px] rounded-full" />
        <Skeleton className="h-7 w-[100px] rounded-full" />
        <Skeleton className="h-7 w-[100px] rounded-full" />
      </div>
    </div>
  );
}

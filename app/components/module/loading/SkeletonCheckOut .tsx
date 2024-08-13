import { Button, Skeleton } from "@nextui-org/react";

const skeletonLoad = [0, 1, 2];
const SkeletonCheckOut = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-6">
        {skeletonLoad.map((item) => (
          <Skeleton key={item} className="w-full rounded">
            <div className="h-4 w-full rounded bg-default-200"></div>
          </Skeleton>
        ))}
      </div>
      <Button
        className="bg-gradient-to-tr mt-3 w-full from-green-500 to-blue-500 text-white shadow-lg  rounded font-semibold uppercase"
        isLoading
        size="md"
      >
        Loading
      </Button>
    </>
  );
};

export default SkeletonCheckOut;

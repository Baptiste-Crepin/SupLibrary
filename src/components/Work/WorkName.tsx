import { useWork } from "@hooks/UseWork";
import { Skeleton } from "@mui/material";

export default function WorkName({ workKey }: { workKey: string }) {
  const { isLoading, data } = useWork(workKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  return (
    <>
      {data?.title}
    </>
  );
}
import { useType } from "@hooks/UseType";
import { Skeleton } from "@mui/material";

export default function TypeName({ typeKey }: { typeKey: string }) {
  const { isLoading, data } = useType(typeKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  return (
    <>
      {data?.kind}
    </>
  );
}
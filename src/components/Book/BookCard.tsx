import { useBook } from "@hooks/UseBook";
import { Skeleton } from "@mui/material";

export default function BookCard({ bookKey }: { bookKey: string }) {
  const { isLoading, data } = useBook(bookKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  return (
    <>
      {data?.title}
    </>
  );
}
import { useAuthor } from "@hooks/UseAuthor";
import { Skeleton } from "@mui/material";

export default function AuthorName({ authorKey }: { authorKey: string }) {
  const { isLoading, data } = useAuthor(authorKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  return (
    <>
      {data?.name}
    </>
  );
}
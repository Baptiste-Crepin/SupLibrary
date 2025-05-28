import { usePeople } from "@hooks/UsePeople";
import { Skeleton } from "@mui/material";

export default function PeopleName({ peopleKey }: { peopleKey: string }) {
  const { isLoading, data } = usePeople(peopleKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  return (
    <>
      {data?.displayname}
    </>
  );
}
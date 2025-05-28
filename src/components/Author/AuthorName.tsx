import { useAuthor } from "@hooks/UseAuthor";

export default function AuthorName({ authorKey }: { authorKey: string }) {
  const { isLoading, data } = useAuthor(authorKey);

  if (isLoading) {
    return <div> Loading...</div >;
  }

  return (
    <>
      {data?.displayname}
    </>
  );
}
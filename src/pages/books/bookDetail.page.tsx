import BookDetail from "@components/Book/BookDetail";
import { useParams } from "react-router";

export default function BookDetailPage() {
  const { bookKey } = useParams<{ bookKey: string }>();

  if (!bookKey) {
    return <div>Book not found</div>;
  }

  return (
    <BookDetail bookKey={bookKey} />
  )
}
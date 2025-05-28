import AuthorName from "@components/Author/AuthorName";
import BookName from "@components/Book/BookName";
import WorkName from "@components/Work/WorkName";
import { Typography } from "@mui/material";

export default function Change({ changeKey }: { changeKey: string }) {
  const [_, type, key] = changeKey.split("/");

  if (type === "people") {
    return
  }

  if (type === "works") {
    return (
      <Typography>
        WORK <WorkName workKey={changeKey} />
      </Typography>
    );
  }

  if (type === "authors") {
    return (
      <Typography>
        AUTHOR <AuthorName authorKey={changeKey} />
      </Typography>
    );
  }

  if (type === "books") {
    return (
      <Typography>
        BOOK <BookName bookKey={changeKey} />
      </Typography>
    );
  }

  return (
    <Typography>
      FALLBACK {type} {key}
    </Typography>
  );
}
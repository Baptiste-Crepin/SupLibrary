import { useWikipedia } from "@hooks/UseWikipedia";
import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router";

export default function WikipediaDetailsCard({ wikipediaUrl }: { wikipediaUrl: string }) {
  const { isLoading, data, isError } = useWikipedia(wikipediaUrl);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError) {
    console.log(isLoading, isError, data);
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Wikipedia Details
        </Typography>

        <Typography variant="body1" gutterBottom>
          {data?.title}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {data?.extract}
        </Typography>

        <Link to={wikipediaUrl} target="_blank" rel="noreferrer">
          Open in Wikipedia
        </Link>
      </CardContent>
    </Card>
  );
}
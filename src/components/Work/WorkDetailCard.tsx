import AuthorSummary from "@components/Author/AuthorSummary";
import { useWork } from "@hooks/UseWork";
import { Box, Button, Card, CardContent, CardHeader, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import RatingSummary from "../Rating/RatingSummary";

export default function WorkDetailCard({ workKey }: { workKey: string }) {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useWork(workKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={250} />;
  }

  if (isError && error) {
    if (isError && error) {
      return (
        <div className="error">

          <Typography variant="h6" gutterBottom>
            {error.status === 404
              ? "This work might have been removed or doesn't exist."
              : "An error occurred while loading the work."}
          </Typography>

          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Go back to the home page
          </Button>
        </div>
      );
    }
  }

  return (
    <Card sx={{ height: '100%', width: '100%', cursor: 'pointer' }}
      onClick={() => navigate(`${data?.key}`)}>
      <CardHeader title={data?.title} />
      <CardContent>
        {data?.covers?.[0] && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Box
              component="img"
              sx={{
                maxWidth: '100%',
                maxHeight: 250,
                objectFit: 'contain',
                borderRadius: 1
              }}
              alt={`Cover of ${data.title}`}
              src={`https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`}
            />
          </Box>
        )}

        {data && (data?.authors?.length ?? 0) > 0 && data?.authors?.[0] && (
          <Box sx={{ flex: 1 }}>
            <AuthorSummary authorKey={data?.authors?.[0].author.key} />
          </Box>
        )
        }

        {data &&
          <Box sx={{ flex: 1 }}>
            <RatingSummary workKey={data?.key} />
          </Box>
        }
      </CardContent>
    </Card>
  );
}
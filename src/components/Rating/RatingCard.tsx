import { useRatings } from "@hooks/UseWork";
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Card, CardContent, CardHeader, LinearProgress, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import RatingSummary from "./RatingSummary";


export default function RatingCard({ workKey }: { workKey: string }) {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useRatings(workKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
  }

  if (isError && error) {
    return (
      <div className="error">

        <Typography variant="h6" gutterBottom>
          {error.status === 404
            ? "Those ratings might have been removed or doesn't exist."
            : "An error occurred while loading the work."}
        </Typography>

        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go back to the home page
        </Button>
      </div>
    );
  }

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardHeader title="Rating Details" />
      <CardContent>
        <Stack spacing={2}>
          <RatingSummary workKey={workKey} />

          {[1, 2, 3, 4, 5].map(rating => {
            const count = data?.counts[rating];
            const percentage = data?.summary?.count ? (count ?? 0 / data.summary.count * 100) : 0;

            return (
              <Stack key={rating} direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                {/* Stars */}
                <Box sx={{ display: 'flex', minWidth: 100 }}>
                  {Array.from({ length: rating }, (_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 16, color: 'orange' }} />
                  ))}
                </Box>

                {/* Progress bar */}
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    flexGrow: 1,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    minWidth: 120
                  }}
                />

                {/* Count and percentage */}
                <Typography variant="body2" sx={{ minWidth: 80 }}>
                  {count} ({percentage.toFixed(1)}%)
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
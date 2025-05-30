import { useRatings } from "@hooks/UseWork";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function RatingSummary({ workKey }: { workKey: string }) {
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
        {data?.summary?.average?.toFixed(1)}
      </Typography>
      {Array.from({ length: 5 }, (_, index) => {
        const rating = data?.summary?.average || 0;
        const starNumber = index + 1;

        return starNumber <= Math.floor(rating) ? (
          <StarIcon key={index} sx={{ fontSize: 24, color: 'orange' }} />
        ) : (
          <StarBorderIcon key={index} sx={{ fontSize: 24, color: 'orange' }} />
        );
      })}
      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
        ({data?.summary?.count || 0} reviews)
      </Typography>
    </Box>
  );
}
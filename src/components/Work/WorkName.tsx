import { useWork } from "@hooks/UseWork";
import { Button, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function WorkName({ workKey }: { workKey: string }) {
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useWork(workKey);

  if (isLoading) {
    return <Skeleton variant="rectangular" height={20} />;
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
    <>
      {data?.title}
    </>
  );
}
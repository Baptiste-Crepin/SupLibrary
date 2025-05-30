import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        gap: 2
      }}
    >
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h4" component="h2">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </Box>
  )
}
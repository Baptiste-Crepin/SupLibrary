import RecentChangeList from "@components/RecentChange/RecentChangeList";
import { Box, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Stack spacing={2}>
      <Box
        component="img"
        sx={{
          height: {
            xs: 200,
            sm: 250,
            md: 300,
            lg: 400,
          },
          width: '100%',
          objectFit: 'cover',
        }}
        alt="Library background"
        src="/SupLibrary/background/library.jpg"
      />
      <Box sx={{ paddingX: 2 }}>
        <RecentChangeList />
      </Box>
    </Stack>
  )
}
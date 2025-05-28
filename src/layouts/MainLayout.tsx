import Search from '@components/Search/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from 'react-router';

function MainLayout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <LocalLibraryIcon onClick={() => navigate('/')} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            SupLibrary
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  )
}

export default MainLayout
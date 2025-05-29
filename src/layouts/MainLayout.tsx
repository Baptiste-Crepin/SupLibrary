import Search from '@components/Search/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from 'react-router';

function MainLayout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <LocalLibraryIcon onClick={() => navigate('/')} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              minWidth: 'max-content',
              flexShrink: 0,
              display: { xs: 'none', md: 'block' }, // Hidden on xs/sm, visible from md up
              cursor: 'pointer'
            }}
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
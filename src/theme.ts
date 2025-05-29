import { createTheme } from "@mui/material";

const white = '#ffffff';

export const theme = createTheme({

  palette: {
    mode: "light",
    primary: {
      main: '#1E3A5F',
    },
    secondary: {
      main: '#4A90A4',
    },
    background: {
      default: '#f5f5f5',
      paper: white,
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: white,
          '&:hover': {
            backgroundColor: white,
          },
          '&.Mui-focused': {
            backgroundColor: white,
          },
        },
      },
    },
  }
});
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const colorPalette = {
  primary: "#c63e41",
  secondary: "#3e58c6",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colorPalette.primary,
    },
    secondary: {
      main: colorPalette.secondary,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "primary" },
          style: { background: colorPalette.primary },
        },
      ],
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#e0e0e0",
            "&:hover": {
              backgroundColor: "#eeeeee",
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
export default function MaterialThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

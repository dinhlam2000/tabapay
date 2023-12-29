import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Components

import PageLayout from "./components/Layout/PageLayout";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2D3139",
    },
    primary: {
      main: "#36BFFA",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#0C6BA3",
    },
    secondary: {
      main: "#BCB4FE",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#6B3BEF",
    },
    success: {
      main: "#EBFDF3",
      contrastText: "#4FA07A",
    },
    warning: {
      main: "#FFFAEA",
      contrastText: "#B54707",
    },
    info: {
      main: "#F1F4F7",
      contrastText: "#000000",
    },
  },
  typography: {
    // fontSize: 14,
    h5: {
      fontSize: 16,
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
    },
    subtitle2: { fontSize: 12, fontWeight: 300 },
    subtitle1: {
      fontSize: 13,
      fontWeight: 300,
    },
    body1: {
      fontWeight: 500,
    },
    button: {},
  },
  components: {
    // Name of the component
    MuiChip: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontWeight: "550",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <PageLayout />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

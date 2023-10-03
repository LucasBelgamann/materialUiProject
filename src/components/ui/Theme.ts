import { createTheme } from "@mui/material/styles";

const arcBlue = "#0B7289";
const arcOrange = "#FFBA60";

declare module "@mui/material/styles" {
  interface CommonColors {
    blue: string;
    orange: string;
  }
}

export default createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    h3: {
        fontWeight: 300,
    }
  }
});

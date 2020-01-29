// tslint:disable-next-line
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      50: "#039be5",
      100: "#039be5",
      200: "#039be5",
      300: "#039be5",
      400: "#039be5",
      500: "#039be5",
      600: "#039be5",
      700: "#039be5",
      800: "#039be5",
      900: "#039be5",
      A100: "#039be5",
      A200: "#039be5",
      A400: "#039be5",
      A700: "#039be5"
    },
    grey: {
      300: "#c9cccf"
    }
  },
  typography: {
    fontFamily: "'roboto', sans-serif",
    fontSize: 12
  },
  overrides: {
    MuiInput: {
      // Remove animations on line under text input
      underline: {
        "&:after": {
          transition: undefined
        },
        "&:before": {
          transition: undefined
        },
        "&:hover:not($disabled):before": {
          borderBottom: undefined
        }
      }
    },

    MuiFab: {
      root: {
        "box-shadow": "none!important",
        margin: 3,
        width: 50,
        height: 50,
        lineHeight: 50,

        "&:hover": {
          backgroundColor: "#039be5"
        }
      }
    },

    MuiFormLabel: {
      root: {
        "&$error": {
          color: undefined
        },
        "&$focused": {
          color: undefined
        }
      }
    },

    MuiListItem: {
      root: {
        "&$selected, &$selected:hover": {
          color: "#039be5"
        }
      }
    }
  }
});

export default theme;

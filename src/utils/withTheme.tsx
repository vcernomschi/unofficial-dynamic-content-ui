// tslint:disable-next-line
import { ThemeProvider } from "@material-ui/core/styles";

import React from "react";
import Theme from "../Theme";

export function withTheme(children: React.ReactNode): React.ReactElement {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}

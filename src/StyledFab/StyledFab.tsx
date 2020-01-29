import { WithStyles, withStyles } from "@material-ui/core";

// tslint:disable-next-line
import Fab, { FabProps } from "@material-ui/core/Fab";
import clsx from "clsx";
import React from "react";

const styles = {
  root: {
    "&:hover": {
      fill: "#fff"
    }
  },

  light: {
    backgroundColor: "#fff"
  },

  dark: {}
};

export type StyledFabProps = WithStyles<typeof styles> &
  Omit<FabProps, "variant"> & {
    variant?: "dark" | "light";
  };

const StyledFab: React.SFC<StyledFabProps> = (props: StyledFabProps) => {
  const { variant = "dark", classes, ...other } = props;

  return (
    <Fab
      {...other}
      className={clsx(classes.root, {
        [classes.light]: variant === "light",
        [classes.dark]: variant === "dark"
      })}
    />
  );
};

export default withStyles(styles, { name: "DcStyledFab" })(StyledFab);

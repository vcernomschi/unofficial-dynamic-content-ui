import React, { PropsWithChildren } from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = {
  root: {
    display: "block",
    width: "32%",
    "min-width": "220px",
    "max-width": "350px",
    margin: "0 10px 10px 0",
    position: "relative" as "relative",

    "&:before": {
      content: "''",
      display: "block",
      "padding-top": "100%"
    }
  },

  content: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  "empty-slot": {},
  "populated-slot": {}
};

export type ChooserVariant = "empty-slot" | "populated-slot";

export interface ChooserProps
  extends PropsWithChildren<WithStyles<typeof styles>> {
  variant?: ChooserVariant;
  style?: React.CSSProperties;
  className?: string;
}

const Chooser: React.SFC<ChooserProps> = (props: ChooserProps) => {
  const { classes, children, className, variant = "empty", ...other } = props;

  return (
    <div
      {...other}
      className={clsx(
        classes.root,
        {
          [classes["empty-slot"]]: variant === "empty-slot",
          [classes["populated-slot"]]: variant === "populated-slot"
        },
        className
      )}
    >
      <div className={clsx(classes.content)}>{children}</div>
    </div>
  );
};

export default withStyles(styles, { name: "DcChooser" })(Chooser);

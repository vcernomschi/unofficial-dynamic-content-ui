import React, { PropsWithChildren } from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import { ChooserVariant } from "../Chooser/Chooser";

const styles = {
  root: {
    transition: "all .3s",
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "align-content": "center",
    "justify-content": "center",

    "&$empty-slot": {
      "background-color": "#e5e5e5",
      fill: "#e5e5e5",

      "&:hover": {
        "background-color": "#c9cccf",
        fill: "#c9cccf"
      }
    },

    "&$populated-slot": {
      fill: "#fff",
      "&:hover": {
        "background-color": "rgba(41,51,63,.8)"
      }
    },

    "&:hover $content": {
      display: "inherit"
    }
  },

  content: {},

  "empty-slot": {},

  "populated-slot": {
    "& $content": {
      display: "none"
    }
  }
};

export interface ChooserActionsProps
  extends PropsWithChildren<WithStyles<typeof styles>> {
  variant?: ChooserVariant;
  style?: React.CSSProperties;
  className?: string;
}

const ChooserActions: React.SFC<ChooserActionsProps> = (
  props: ChooserActionsProps
) => {
  const {
    classes,
    children,
    className,
    variant = "empty-slot",
    ...other
  } = props;

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

export default withStyles(styles, { name: "DcChooserActions" })(ChooserActions);

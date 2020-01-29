import React, { PropsWithChildren } from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";

export const styles = {
  root: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    boxShadow:
      "0 1px 5px 0 rgba(23,32,44,.2), 0 2px 2px 0 rgba(23,32,44,.1), 0 3px 1px -2px rgba(23,32,44,.1)"
  }
};

export interface CardProps
  extends PropsWithChildren<WithStyles<typeof styles>> {
  style?: React.CSSProperties;
  className?: string;
}

const Card: React.SFC<CardProps> = (props: CardProps) => {
  const { classes, children, className, ...other } = props;

  return (
    <div {...other} className={clsx(classes.root, className)}>
      {children}
    </div>
  );
};

export default withStyles(styles, { name: "DcCard" })(Card);

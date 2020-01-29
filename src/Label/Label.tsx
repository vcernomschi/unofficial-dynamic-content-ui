import { Typography, WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

// tslint:disable-next-line
import { TypographyProps } from "@material-ui/core/Typography";

const styles = {
  root: {
    padding: "7px 0",
    minHeight: 20,
    color: "#666",
    fontSize: "13px"
  }
};

export type LabelProps = WithStyles<typeof styles> & TypographyProps & {};

const Label: React.SFC<LabelProps> = (props: LabelProps) => {
  const { classes, className, ...other } = props;

  return <Typography {...other} className={clsx(classes.root, className)} />;
};

export default withStyles(styles, { name: "DcLabel" })(Label);

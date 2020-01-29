import React from "react";

import { Theme, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = (theme: Theme) => ({
  root: {
    padding: "0 10px 15px",
    fontWeight: theme.typography.fontWeightBold,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as "nowrap",
    overflow: "hidden",
    ...theme.typography.subtitle1
  },
  toolbar: {
    height: 30,
    padding: "10px 10px 0"
  },
  title: {}
});

export interface CardHeaderProps extends WithStyles<typeof styles> {
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}

const CardHeader: React.SFC<CardHeaderProps> = (props: CardHeaderProps) => {
  const { classes, className, title, ...other } = props;

  return (
    <div {...other} className={clsx(classes.root, className)}>
      <div className={clsx(classes.toolbar)} />
      <div className={clsx(classes.title)}>{title}</div>
    </div>
  );
};

export default withStyles(styles as any, { name: "DcCardHeader" })(CardHeader);

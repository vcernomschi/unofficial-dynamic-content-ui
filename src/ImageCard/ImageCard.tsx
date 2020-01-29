import React, { PropsWithChildren } from "react";

import { Theme, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import Card from "../Card";
import CardHeader from "../CardHeader";

const styles = (theme: Theme) => ({
  root: {
    padding: "0 10px 15px",
    fontWeight: theme.typography.fontWeightBold,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as "nowrap",
    overflow: "hidden",
    ...theme.typography.subtitle1
  },

  imageContainer: {
    position: "relative" as "relative"
  },

  image: {
    display: "block",
    verticalAlign: "middle" as "middle",
    boxSizing: "border-box" as "border-box",
    padding: "0 10px",
    position: "relative" as "relative",
    top: 0,
    left: 0,
    maxHeight: "100%",
    width: "100%"
  }
});

export interface ImageCardProps extends WithStyles<typeof styles> {
  label: string;
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

const ImageCard: React.SFC<ImageCardProps> = (props: ImageCardProps) => {
  const { label, src, classes, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title={label} />
      <div className={clsx(classes.imageContainer)}>
        <img
          className={clsx(classes.image)}
          src={src}
          alt={label}
          title={label}
        />
      </div>
    </Card>
  );
};

export default withStyles(styles as any, { name: "DcImageCard" })(ImageCard);

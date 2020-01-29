import React, { PropsWithChildren } from "react";

import { Theme, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import Card from "../Card";
import CardHeader from "../CardHeader";

import { ContentItem } from "../Icons";
import { VisualizationProps } from "../Visualization/Visualization";

export const styles = (theme: Theme) => ({
  root: {
    padding: "0 10px 15px",
    fontWeight: theme.typography.fontWeightBold,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as "nowrap",
    overflow: "hidden",
    ...theme.typography.subtitle1
  },
  body: {
    position: "absolute" as "absolute",
    top: 65,
    left: 10,
    right: 10,
    bottom: 10,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%"
  }
});

export interface ContentItemCardProps extends WithStyles<typeof styles> {
  label?: string;
  icon?: string;
  children?: React.ReactElement<VisualizationProps> | undefined;
  style?: React.CSSProperties;
  className?: string;
}

const ContentItemCard: React.SFC<ContentItemCardProps> = (
  props: ContentItemCardProps
) => {
  const { label, icon = ContentItem, classes, children, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title={label} />
      <div
        className={clsx(classes.body)}
        style={{
          backgroundImage: `url(${icon})`
        }}
      >
        {children}
      </div>
    </Card>
  );
};

export default withStyles(styles as any, { name: "DcContentItemCard" })(
  ContentItemCard
);

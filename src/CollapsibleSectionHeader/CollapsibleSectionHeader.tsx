import React, { PropsWithChildren } from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";
import Label from "../Label";

const styles = {
  root: {
    marginLeft: "-5px"
  },
  label: {
    display: "inline-flex"
  },
  icon: {
    marginRight: 5
  }
};

export interface CollapsibleSectionHeaderProps
  extends WithStyles<typeof styles> {
  icon: SvgIconComponent;
  title: string;
  style?: React.CSSProperties;
  className?: string;
}

const CollapsibleSectionHeader: React.SFC<CollapsibleSectionHeaderProps> = (
  props: CollapsibleSectionHeaderProps
) => {
  const { icon: Icon, title, classes, className, ...other } = props;

  return (
    <div {...other} className={clsx(classes.root, className)}>
      <Label className={clsx(classes.label)}>
        <Icon className={clsx(classes.icon)} fontSize="small" /> {title}
      </Label>
    </div>
  );
};

export default withStyles(styles, { name: "DcCollapsibleSectionHeader" })(
  CollapsibleSectionHeader
);

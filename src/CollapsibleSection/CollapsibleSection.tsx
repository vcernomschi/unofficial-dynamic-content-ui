import React, { PropsWithChildren } from "react";

import { Collapse, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = {
  root: {
    display: "block"
  },
  header: {
    display: "block",
    "&:hover": {
      cursor: "pointer"
    }
  },
  body: {},
  open: {}
};

export interface CollapsibleSectionProps
  extends PropsWithChildren<WithStyles<typeof styles>> {
  onChange?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const CollapsibleSection: React.SFC<CollapsibleSectionProps> = (
  props: CollapsibleSectionProps
) => {
  const {
    onChange,
    defaultExpanded = true,
    classes,
    children,
    className,
    ...other
  } = props;

  const [header, ...body] = React.Children.toArray(children);

  const [expanded, setExpandedState] = React.useState(defaultExpanded);

  const handleClick = React.useCallback(
    event => {
      setExpandedState(!expanded);
      if (onChange) {
        onChange(!expanded);
      }
    },
    [expanded, onChange, setExpandedState]
  );

  return (
    <div
      {...other}
      className={clsx(
        classes.root,
        {
          [classes.open]: expanded
        },
        className
      )}
    >
      <div className={classes.header} onClick={handleClick}>
        {header}
      </div>

      <Collapse
        className={clsx(classes.body)}
        collapsedHeight="0px"
        timeout={300}
        in={expanded}
      >
        {body}
      </Collapse>
    </div>
  );
};

export default withStyles(styles, { name: "DcCollapsibleSection" })(
  CollapsibleSection
);

import React, { PropsWithChildren } from "react";

import { Theme, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import { detokenize } from "../utils";

export const styles = (theme: Theme) => ({
  root: {
    border: "none",
    height: "100%",
    width: "100%"
  }
});

export interface VisualizationParams {
  contentItemId?: string;
  snapshotId?: string;
  stagingEnvironment?: string;
  locales?: string;
}

export interface VisualizationProps extends WithStyles<typeof styles> {
  className?: string;
  template: string;
  params: VisualizationParams;
  style?: React.CSSProperties;
}

const Visualization: React.SFC<VisualizationProps> = (
  props: VisualizationProps
) => {
  const { template, params, classes, className, ...other } = props;

  const src = detokenize(template, {
    "content.sys.id": params.contentItemId,
    "content.sys.iri": `http://content.cms.amplience.com/${params.contentItemId}`,
    "snapshot.id": params.snapshotId,
    "vse.domain": params.stagingEnvironment,
    "vse.src": `//${params.stagingEnvironment}/cms/content/query?fullBodyObject=true&query=%7B%22sys.iri%22%3A%22http%3A%2F%2Fcontent.cms.amplience.com%2F${params.contentItemId}%22%7D&scope=tree&store=staging`,
    locales: params.locales
  });

  return (
    <iframe
      className={clsx(classes.root, className)}
      scrolling="no"
      src={src}
      {...other}
    />
  );
};

export default withStyles(styles as any, { name: "DcVisualization" })(
  Visualization
);

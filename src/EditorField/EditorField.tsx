import React, { ComponentType } from "react";

import { withStyles, WithStyles } from "@material-ui/core";
import { getComponentForSchema } from "../EditorRegistry";
import { WithEditorFieldProps } from "./EditorFieldProps";

export const styles = {
  root: {}
};

export interface Props
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorField: React.SFC<Props> = (props: Props) => {
  const { schema, registry, classes } = props;

  const Field:
    | ComponentType<WithEditorFieldProps<any>>
    | undefined = getComponentForSchema(schema, registry);
  return Field !== undefined ? <Field {...props} /> : <div />;
};

export default withStyles(styles, { name: "DcEditorField" })(EditorField);

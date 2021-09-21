import React from "react";

import {
  FormControl,
  TextField as MuiTextField,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { WithEditorFieldProps } from "../EditorField";

export const styles = {
  root: {
    width: "100%"
  }
};

export interface EditorConstFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
}

const EditorConstField: React.SFC<EditorConstFieldProps> = (
  props: EditorConstFieldProps
) => {
  const {
    schema,
    classes,
    required,
    readonly,
    value
  } = props;

  return (
    <FormControl className={classes.root}>
      <MuiTextField
        autoComplete="off"
        label={schema.title || ""}
        disabled={true}
        required={required}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        value={value}
      />
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorConstField" })(
  EditorConstField
);

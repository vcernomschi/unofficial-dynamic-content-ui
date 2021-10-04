import React from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";

export const styles = {
  root: {
    width: "100%"
  }
};

export interface EditorTextFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorTextField: React.SFC<EditorTextFieldProps> = (
  props: EditorTextFieldProps
) => {
  const {
    schema,
    value,
    readonly,
    required,
    disabled,
    onChange,
    classes,
    pointer,
    errorReport,
    registry
  } = props;

  const handleChange = React.useCallback(
    event => {
      let newValue = event.target.value;
      if (newValue === "") {
        newValue = undefined;
      }

      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  const errors = getErrorsForPointer(pointer, errorReport);
  const errorMessages = getErrorMessages(schema, errors, registry);

  return (
    <FormControl className={classes.root}>
      <MuiTextField
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        defaultValue={schema.default}
        multiline={true}
        rowsMax={value && value.length > 1000 ? 5 : 1}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        error={errorMessages.length > 0}
        value={value}
      />
      <FormHelperText error={errorMessages.length > 0}>
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorTextField" })(
  EditorTextField
);

import React from "react";

import {
  FormControl,
  FormHelperText,
  withStyles,
  WithStyles
} from "@material-ui/core";
import clsx from "clsx";
import ColorPicker from "material-ui-color-picker";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";

export const styles = {
  root: {
    width: "100%"
  },
  input: {
    color: "rgba(0, 0, 0, 0.87)"
  }
};

export interface EditorColorFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorColorField: React.SFC<EditorColorFieldProps> = (
  props: EditorColorFieldProps
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
    newValue => {
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
      <ColorPicker
        name="color"
        defaultValue={value || ""}
        value={value || ""}
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || "",
          value: value || "",
          className: clsx(classes.input)
        }}
        error={errorMessages.length > 0}
        onChange={handleChange}
      />
      {/*<MuiTextField
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        error={errorMessages.length > 0}
        value={value || ""}
      />*/}
      <FormHelperText error={errorMessages.length > 0}>
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorColorField" })(
  EditorColorField
);

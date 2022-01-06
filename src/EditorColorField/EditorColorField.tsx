import React, { useState } from "react";

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

  const [localValue, setValue] = useState(schema.default || value || "");

  const handleChange = React.useCallback(
    newValue => {
      if (newValue === "") {
        newValue = undefined;
      }

      if (onChange) {
        setValue(newValue);
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
        defaultValue={localValue}
        value={localValue}
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || "",
          value: localValue || "",
          className: clsx(classes.input)
        }}
        error={errorMessages.length > 0}
        onChange={handleChange}
      />
      <FormHelperText error={errorMessages.length > 0}>
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorColorField" })(
  EditorColorField
);

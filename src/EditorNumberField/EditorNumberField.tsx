import React, { useState } from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
  withStyles,
  WithStyles
} from "@material-ui/core";
import clsx from "clsx";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";
import { getDefaultErrorMessages } from "../EditorRegistry";

export const styles = {
  root: {
    width: "100%"
  },
  input: {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    }
  }
};

export interface EditorNumberFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorNumberField: React.SFC<EditorNumberFieldProps> = (
  props: EditorNumberFieldProps
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
  const errors = getErrorsForPointer(pointer, errorReport);

  const [errorMessages, setError] = useState(
    getErrorMessages(schema, errors, registry)
  );

  const handleChange = React.useCallback(
    event => {
      let newValue = event.target.value;

      if (newValue === "") {
        newValue = undefined;
      }

      if (schema.maximum && newValue > schema.maximum && registry) {
        setError([
          registry.errorMessages.maximum(schema, {
            message: "",
            pointer,
            schema,
            data: {
              keyword: "length",
              params: {
                limit: schema.maximum
              }
            }
          })
        ]);
      } else if (schema.minimum && newValue < schema.minimum && registry) {
        setError([
          registry.errorMessages.minimum(schema, {
            message: "",
            pointer,
            schema,
            data: {
              keyword: "length",
              params: {
                limit: schema.minimum
              }
            }
          })
        ]);
      } else {
        setError([]);
      }

      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <FormControl className={classes.root}>
      <MuiTextField
        autoComplete="off"
        label={schema.title || ""}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        type={"number"}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || "",
          className: clsx(classes.input)
        }}
        error={errorMessages.length > 0}
        value={value || ""}
      />
      <FormHelperText error={errorMessages.length > 0}>
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorNumberField" })(
  EditorNumberField
);

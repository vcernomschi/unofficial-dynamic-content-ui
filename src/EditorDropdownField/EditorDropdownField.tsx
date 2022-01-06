import React from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
  WithStyles
} from "@material-ui/core";
import clsx from "clsx";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";

export const styles = {
  root: {
    width: "100%"
  },

  selectTitle: {
    display: "block",
    fontSize: "14px",
    textTransform: "uppercase" as "uppercase",
    padding: 16,
    fontWeight: 500
  }
};

export interface EditorDropdownFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorDropdownField: React.SFC<EditorDropdownFieldProps> = (
  props: EditorDropdownFieldProps
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
  const [localValue, setValue] = React.useState(value || schema.default || "");

  const handleChange = React.useCallback(
    event => {
      const newValue = event.target.value;
      if (onChange) {
        onChange(newValue);
        setValue(newValue)
      }
    },
    [onChange]
  );

  const errors = getErrorsForPointer(pointer, errorReport);
  const errorMessages = getErrorMessages(schema, errors, registry);

  const enumValues = schema.enum || [];

  return (
    <FormControl className={classes.root}>
      <InputLabel required={required}>{schema.title || ""}</InputLabel>
      <Select
        autoWidth={true}
        disabled={disabled}
        onChange={handleChange}
        inputProps={{
          readOnly: readonly,
          "aria-label": schema.description || ""
        }}
        error={errorMessages.length > 0}
        value={localValue}
      >
        <InputLabel className={clsx(classes.selectTitle)}>
          {schema.title || ""}
        </InputLabel>
        <MenuItem value={undefined}>None</MenuItem>
        {enumValues.map((enumValue: any) => (
          <MenuItem key={enumValue} value={enumValue}>
            {`${enumValue}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={errorMessages.length > 0}>
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorDropdownField" })(
  EditorDropdownField
);

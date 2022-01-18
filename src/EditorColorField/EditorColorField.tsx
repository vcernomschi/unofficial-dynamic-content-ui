import React, { useState } from "react";

import {
  FormControl,
  FormHelperText, Popover, TextField as MuiTextField,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";
import { ChromePicker } from "react-color";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

export const DEFAULT_CONVERTER = "rgba_hex";
export const converters = {
  rgba: (c: any) => `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`,
  hex: (c: any) => c.hex,
  rgba_hex: (c: any) => c.rgb.a === 1 ? converters.hex(c) : converters.rgba(c)
};

export const styles = {
  root: {
    width: "100%"
  },
  input: {
    color: "rgba(0, 0, 0, 0.87)"
  }
};

export interface EditorColorFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
}

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
    <PopupState variant="popover" popupId="color-popup-popover">
      {(popupState: any) => (
        <FormControl id={"color-popup"} className={classes.root}>
          <MuiTextField
            autoComplete="off"
            label={schema.title || ""}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            defaultValue={schema.default || localValue}
            inputProps={{
              readOnly: readonly,
              "aria-label": schema.description || ""
            }}
            error={errorMessages.length > 0}
            value={localValue}
            {...bindTrigger(popupState)}
          />

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            PaperProps={{
              className: "mui-paper-color"
            }}
            marginThreshold={0}
          >
            <ChromePicker
              color={localValue}
              onChange={(c: any) => {
                const newValue = converters[DEFAULT_CONVERTER](c);

                handleChange(newValue);
              }}
            />
          </Popover>
          <FormHelperText error={errorMessages.length > 0}>
            {errorMessages.length ? errorMessages[0] : schema.description}
          </FormHelperText>
        </FormControl>
      )}
    </PopupState>
  );
};

export default withStyles(styles, { name: "DcEditorColorField" })(
  EditorColorField
);

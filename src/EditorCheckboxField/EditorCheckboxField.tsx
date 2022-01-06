import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  withStyles,
  WithStyles
} from "@material-ui/core";
import clsx from "clsx";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { WithEditorFieldProps } from "../EditorField";

export const styles = {
  root: {
    padding: "9px 0",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  label: {
    margin: 0,
    "align-items": "baseline",
    padding: 0
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#ffffff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ffffff"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#039be5",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: "\"\""
    },
    "input:hover ~ &": {
      backgroundColor: "#039be5"
    }
  },
  formWrap: {
    "flex-direction": "row",
    "align-items": "center"
  },
  helpText: {
    margin: "18px 0 0 9px"
  }
};

export interface EditorCheckboxFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
}

const EditorCheckboxField: React.SFC<EditorCheckboxFieldProps> = (
  props: EditorCheckboxFieldProps
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

  const [localValue, setValue] = React.useState(schema.default || value || false);

  const handleChange = React.useCallback(
    event => {
      const newValue = event.target.checked;

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
    <FormControl className={classes.formWrap}>
      <FormControlLabel
        control={(
          <Checkbox
            className={classes.root}
            disableRipple={true}
            color="default"
            disabled={disabled}
            required={required}
            onChange={handleChange}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)}/>
            }
            icon={<span className={classes.icon}/>}
            inputProps={{
              readOnly: readonly,
              "aria-label": schema.description || ""
            }}
            checked={Boolean(localValue)}
          />
        )}
        classes={{
          labelPlacementTop: classes.label
        }}
        label={schema.title || ""}
        labelPlacement={"top"}
      />
      <FormHelperText
        error={errorMessages.length > 0}
        className={classes.helpText}
      >
        {errorMessages.length ? errorMessages[0] : schema.description}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles, { name: "DcEditorCheckboxField" })(
  EditorCheckboxField
);

import React, { PropsWithChildren } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  withStyles,
  WithStyles
} from "@material-ui/core";
import clsx from "clsx";
import { EditorFieldParentType, WithEditorFieldProps } from "../EditorField";
import EditorField from "../EditorField/EditorField";

export const styles = {
};

export interface EditorConstFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorConstField: React.SFC<EditorConstFieldProps> = (
  props: EditorConstFieldProps
) => {
  const {
    schema,
    registry,
    onChange,
    value: valueProp,
    classes,
    parentType,
    errorReport,
    pointer,
    required,
    disabled,
    readonly
  } = props;

  React.useEffect(() => {
    if (onChange) {
      onChange(schema.const);
    }
  }, [schema.const]);

  return <></>;
};

export default withStyles(styles, { name: "DcEditorConstField" })(
  EditorConstField
);

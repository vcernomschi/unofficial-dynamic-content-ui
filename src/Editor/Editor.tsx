import React from "react";

import { ErrorReport, SDK } from "dc-extensions-sdk";
import { EditorFieldParentType } from "../EditorField";
import EditorField from "../EditorField/EditorField";
import { EditorRegistry, getDefaultRegistry } from "../EditorRegistry";
import SdkContext from "../SdkContext";

import { useDebouncedCallback } from "use-debounce";

export interface EditorProps {
  pointer?: string;
  value?: any;
  schema: any;
  registry?: EditorRegistry;
  onChange?: (value: any) => void;
}

const Editor: React.SFC<EditorProps> = (props: EditorProps) => {
  const {
    schema,
    registry = getDefaultRegistry(),
    pointer = "",
    onChange
  } = props;

  const [value, setValue] = React.useState(props.value);
  const [errorReport, setErrorReport] = React.useState<ErrorReport[]>();

  const { sdk } = React.useContext(SdkContext);

  const [validateValue] = useDebouncedCallback(async newValue => {
    if (sdk && sdk.field && sdk.field.validate) {
      const newErrorReport = await sdk.field.validate(newValue);
      setErrorReport(newErrorReport as ErrorReport[]);
    }
  }, 300);

  const handleChange = React.useCallback(
    async (newValue: any) => {
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
      validateValue(newValue);
    },
    [value, setValue, errorReport, setErrorReport, sdk]
  );

  return (
    <EditorField
      pointer={pointer}
      errorReport={errorReport || []}
      parentType={EditorFieldParentType.EDITOR_ROOT}
      value={value}
      schema={schema}
      registry={registry}
      onChange={handleChange}
    />
  );
};

export default Editor;

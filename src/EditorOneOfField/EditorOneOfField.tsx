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

import ajv from "ajv";

export const styles = {
  root: {
    width: "100%"
  },
  properties: {
    "margin-left": "17px",
    "list-style": "none",
    margin: "0px",
    padding: "0px"
  },
  property: {},
  rootProperties: {
    "margin-left": "0px"
  },
  rootProperty: {
    "border-left": "4px solid #e5e5e5",
    "padding-left": "15px",
    "margin-bottom": "17px"
  },
  collapsibleBody: {
    padding: "0px"
  },
  header: {
    display: "inline-flex",
    "vertical-align": "middle"
  },
  selectTitle: {
    display: "block",
    fontSize: "14px",
    textTransform: "uppercase" as "uppercase",
    padding: 16,
    fontWeight: 500
  }
};

export interface EditorOneOfFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

export function isOneOfField(schema: any): boolean {
  const hasOneOfKeyword = schema && schema.oneOf;

  return hasOneOfKeyword;
}

function detectCommonConstant(oneOf: any[]): string | null {
  const constantsPropertiesPerSchema = oneOf.map(schema => {
    if (!schema.properties) {
      return [];
    }
    return Object.keys(schema.properties).filter(
      key => schema.properties[key].const
    );
  });

  const allConstantProperties = constantsPropertiesPerSchema.flatMap(x => x);

  for (const propertyName of allConstantProperties) {
    const isPropertyFoundOnEachSchema =
      constantsPropertiesPerSchema.filter(x => x.indexOf(propertyName) !== -1)
        .length === oneOf.length;
    if (isPropertyFoundOnEachSchema) {
      return propertyName;
    }
  }

  return null;
}

function getSelectedSchema(oneOf: any[], value: any): number {
  /**
   * If each schema has common const to specifically disambiguate it, prefer to use that
   */
  const commonConstant = detectCommonConstant(oneOf);
  if (commonConstant) {
    const constantValue = value[commonConstant];
    for (let i = 0; i < oneOf.length; i++) {
      const schema = oneOf[i];
      if (schema.properties[commonConstant].const === constantValue) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Try to find a schema that matches the data loosely
   */
  for (let i = 0; i < oneOf.length; i++) {
    const schema = {
      ...oneOf[i],
      required: undefined
    };
    if (schema.properties) {
      schema.anyOf = Object.keys(schema.properties).map((key: string) => {
        return {
          required: [key]
        };
      });
    }
    if (ajv().validate(schema, value)) {
      return i;
    }
  }

  return 0;
}

const EditorOneOfField: React.SFC<EditorOneOfFieldProps> = (
  props: EditorOneOfFieldProps
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

  const handleChange = React.useCallback(
    newValue => {
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange, valueProp]
  );

  const value = valueProp || {};
  const schemaOptions = schema.oneOf || [];
  const schemaOptionTitles = React.useMemo(() => {
    return schemaOptions.map((nestedSchema: any, index: number) => {
      return nestedSchema.title || `Option ${index + 1}`;
    });
  }, [schemaOptions]);

  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    return getSelectedSchema(schemaOptions, value);
  });

  const selectedSchema = React.useMemo(() => {
    return schemaOptions[selectedIndex] || {};
  }, [selectedIndex]);

  const handleChangeSelectedIndex = (event: any) => {
    setSelectedIndex(event.target.value);
  };

  const children = (
    <div className={classes.root}>
      <FormControl>
        <InputLabel required={required}>{schema.title || ""}</InputLabel>
        <Select
          autoWidth={true}
          disabled={disabled}
          onChange={handleChangeSelectedIndex}
          inputProps={{
            readOnly: readonly,
            "aria-label": schema.description || ""
          }}
          value={selectedIndex}
        >
          {schemaOptionTitles.map((title: any, index: number) => (
            <MenuItem key={index} value={index}>
              {`${title}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <EditorField
        pointer={`${pointer}`}
        errorReport={errorReport}
        parentType={EditorFieldParentType.ARRAY}
        schema={selectedSchema}
        value={value}
        registry={registry}
        // tslint:disable-next-line
        onChange={handleChange}
      />
    </div>
  );

  return children;
};

export default withStyles(styles, { name: "DcEditorOneOfField" })(
  EditorOneOfField
);

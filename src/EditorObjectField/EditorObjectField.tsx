import React, { PropsWithChildren } from "react";

import { Typography, withStyles, WithStyles } from "@material-ui/core";
import clsx from "clsx";
import CollapsibleSection from "../CollapsibleSection";
import { EditorFieldParentType, WithEditorFieldProps } from "../EditorField";
import EditorField from "../EditorField/EditorField";

import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import CollapsibleSectionHeader from "../CollapsibleSectionHeader";

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
  }
};

export interface EditorObjectFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorObjectField: React.SFC<EditorObjectFieldProps> = (
  props: EditorObjectFieldProps
) => {
  const {
    schema,
    registry,
    onChange,
    value: valueProp,
    classes,
    parentType,
    errorReport,
    pointer
  } = props;

  const handleChange = React.useCallback(
    (propertyName, propertyValue) => {
      const newValue = {
        ...valueProp,
        [propertyName]: propertyValue
      };
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange, valueProp]
  );

  const value = valueProp || {};
  const properties = schema.properties || {};
  const propertyNames = Object.keys(properties);
  const propertySchemas: { [name: string]: any } = {};
  const required = schema.required || [];

  for (const propertyName of propertyNames) {
    let propertySchema = properties[propertyName] || {};
    if (!propertySchema.title) {
      propertySchema = {
        ...propertySchema,
        title: propertyName
      };
    }
    propertySchemas[propertyName] = propertySchema;
  }

  const children = (
    <ul
      className={clsx(classes.properties, {
        [classes.rootProperties]:
          parentType === EditorFieldParentType.EDITOR_ROOT
      })}
    >
      {propertyNames.map(propertyName => (
        <li
          key={propertyName}
          className={clsx(classes.property, {
            [classes.rootProperty]:
              parentType === EditorFieldParentType.EDITOR_ROOT
          })}
        >
          <EditorField
            pointer={`${pointer}/${propertyName}`}
            errorReport={errorReport}
            parentType={EditorFieldParentType.OBJECT}
            schema={propertySchemas[propertyName]}
            value={value[propertyName]}
            registry={registry}
            required={required.indexOf(propertyName) !== -1}
            // tslint:disable-next-line
            onChange={propertyValue =>
              handleChange(propertyName, propertyValue)
            }
          />
        </li>
      ))}
    </ul>
  );

  const canCollapse = parentType !== EditorFieldParentType.EDITOR_ROOT;

  const [isExpanded, setExpandedState] = React.useState(true);

  const handleExpand = (expanded: boolean) => {
    setExpandedState(expanded);
  };

  if (canCollapse) {
    const Icon = isExpanded ? KeyboardArrowDown : KeyboardArrowRight;

    return (
      <CollapsibleSection onChange={handleExpand}>
        <CollapsibleSectionHeader icon={Icon} title={schema.title} />

        <div className={clsx(classes.collapsibleBody)}>{children}</div>
      </CollapsibleSection>
    );
  }

  return children;
};

export default withStyles(styles, { name: "DcEditorObjectField" })(
  EditorObjectField
);

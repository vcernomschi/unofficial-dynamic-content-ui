import React from "react";

import { Button, IconButton, withStyles, WithStyles } from "@material-ui/core";
import { getErrorMessages, getErrorsForPointer } from "../EditorErrorMessages";
import { EditorFieldParentType, WithEditorFieldProps } from "../EditorField";

import {
  DeleteOutlined,
  KeyboardArrowDown,
  KeyboardArrowRight
} from "@material-ui/icons";
import clsx from "clsx";
import CollapsibleSection from "../CollapsibleSection";
import CollapsibleSectionHeader from "../CollapsibleSectionHeader";
import EditorField from "../EditorField/EditorField";

export const styles = {
  root: {
    width: "100%"
  },
  rootProperty: {
    "border-left": "4px solid #e5e5e5",
    padding: "0 16px 0 15px",
    "margin-bottom": "17px",
    "box-shadow":
      "0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%)"
  },
  btn: {
    "max-width": "100%",
    margin: "5px 2px 8px",
    "text-transform": "none",
    "border-radius": "3px",
    "font-size": 13,
    padding: "0 15px",
    height: 24,
    "line-height": 24,
    "background-color": "#e5e5e5",
    "min-height": 24,
    color: "#29333f",
    "font-weight": 500,
    "&:hover": {
      "background-color": "#1ab0f9",
      color: "#fff"
    }
  },
  label: {
    height: "100%",
    "line-height": 0
  },
  list: {
    "list-style": "none",
    "margin-block-start": 0,
    "margin-block-end": 0,
    margin: 0,
    padding: 0,
    "box-sizing": "border-box"
  },
  listItem: {
    "margin-left": "15px",
    display: "flex"
  },
  removeBtn: {
    "background-color": "transparent",
    color: "transparent",
    "&:hover": {
      "background-color": "transparent",
      color: "grey"
    }
  },
  listCards: {
    display: "flex"
  },
  removeBtnHovered: {
    color: "grey"
  }
};

export interface EditorListFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
}

const EditorListField: React.SFC<EditorListFieldProps> = (
  props: EditorListFieldProps
) => {
  const {
    schema,
    value,
    onChange,
    classes,
    pointer,
    errorReport,
    registry
  } = props;

  const minItems = schema.minItems || 0;
  const maxItems = schema.maxItems;
  const [isExpanded, setExpandedState] = React.useState(true);
  const [isHovering, setHovering] = React.useState(-1);
  const [items, setItems] = React.useState<string[]>(
    value || new Array(minItems).fill("")
  );

  const handleChange = React.useCallback(
    (newValue, index) => {
      if (newValue === "") {
        newValue = undefined;
      }

      const newItems = [...items];
      newItems[index] = newValue || "";
      setItems(newItems);

      if (onChange) {
        onChange(newItems);
      }
    },
    [items, onChange]
  );

  const addListItem = React.useCallback(() => {
    setItems([...items, ""]);
  }, [items, setItems]);

  const removeItem = React.useCallback(
    index => {
      const newItems = items.filter((el, ind) => ind !== index);
      setItems(newItems);
      if (onChange) {
        onChange(newItems);
      }
    },
    [items, setItems, onChange]
  );

  const errors = getErrorsForPointer(pointer, errorReport);
  const errorMessages = getErrorMessages(schema, errors, registry);

  const handleExpand = (expanded: boolean) => {
    setExpandedState(expanded);
  };

  const Icon = isExpanded ? KeyboardArrowDown : KeyboardArrowRight;

  return schema.items.type === "string" ? (
    <div className={clsx(classes.rootProperty)}>
      <CollapsibleSection onChange={handleExpand}>
        <CollapsibleSectionHeader icon={Icon} title={schema.title}/>
        <ul
          className={clsx(classes.list, {
            [classes.listCards]: schema.items.type !== "string"
          })}
        >
          {items.map((item, index) => (
            <li
              key={`${schema.title} ${index + 1}`}
              className={clsx(classes.listItem)}
              // tslint:disable-next-line
              onMouseEnter={() => setHovering(index)}
              // tslint:disable-next-line
              onMouseLeave={() => setHovering(-1)}
            >
              <EditorField
                pointer={pointer}
                errorReport={errorReport}
                parentType={EditorFieldParentType.EDITOR_ROOT}
                schema={{
                  title: `${schema.title} ${index + 1}`,
                  description: schema.description,
                  ...schema.items
                }}
                value={item}
                registry={registry}
                required={false}
                // tslint:disable-next-line
                onChange={propertyValue => handleChange(propertyValue, index)}
              />

              <IconButton
                className={clsx(classes.removeBtn, {
                  [classes.removeBtnHovered]: isHovering === index
                })}
                disableRipple={true}
                color="secondary"
                aria-label="remove"
                // tslint:disable-next-line
                onClick={() => removeItem(index)}
              >
                <DeleteOutlined/>
              </IconButton>
            </li>
          ))}
        </ul>

        <Button
          color="secondary"
          variant="contained"
          onClick={addListItem}
          classes={{
            root: classes.btn,
            label: classes.label
          }}
          disabled={maxItems && maxItems === items.length}
        >
          {`Add ${schema.title}`}
        </Button>
      </CollapsibleSection>
    </div>
  ) : null;
};

export default withStyles(styles, { name: "DcEditorListField" })(
  EditorListField
);

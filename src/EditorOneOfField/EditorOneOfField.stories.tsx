import { storiesOf } from "@storybook/react";
import React from "react";
import Form from "../Editor/Editor";
import { withEditor } from "../utils/withEditor";
import Editor from "../Editor/Editor";

const contentLink = {
  type: "object",
  allOf: [
    {
      $ref: "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
    },
    {
      properties: {
        contentType: {
          enum: ["http://test.com"]
        }
      }
    }
  ]
};

const schema = {
  type: "object",
  properties: {
    choice: {
      title: "Template",
      oneOf: [
        {
          type: "object",
          title: "Two Column",
          properties: {
            template: {
              const: "two_column"
            },
            title: { type: 'string' },
            column1: contentLink,
            column2: contentLink
          }
        },
        {
          type: "object",
          title: "Three Column",
          properties: {
            template: {
              const: "three_column"
            },
            column1: contentLink,
            column2: contentLink,
            column3: contentLink
          }
        }
      ]
    }
  }
};

storiesOf("EditorOneOfField", module).add("Editor", () => {
  const [value, setValue] = React.useState({ choice: { template: "two_column" } });

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return <div>
    <Editor schema={schema} value={value} onChange={handleChange} />
    <code>
      {JSON.stringify(value)}
    </code>
  </div>;
});

import { storiesOf } from "@storybook/react";
import React from "react";
import Form from "../Editor/Editor";
import { withEditor } from "../utils/withEditor";

const schema = {
  type: "object",
  properties: {
    "1": {
      type: "string",
      maxLength: 10
    },
    "2": {
      type: "object",
      properties: {
        "2-1": {
          type: "string",
          pattern: "[a-z]+"
        },
        "2-2": {
          type: "string"
        },
        "2-3": {
          type: "object",
          properties: {
            "2-3-1": {
              type: "string"
            }
          }
        }
      },
      required: ["2-1"]
    }
  }
};

storiesOf("EditorObjectField", module).add("Editor", () => withEditor(schema));

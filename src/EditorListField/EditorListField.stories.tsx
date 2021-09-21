import { storiesOf } from "@storybook/react";
import React from "react";
import { withEditor } from "../utils/withEditor";
import EditorListField from "./EditorListField";

const schema = {
  type: "array",
  title: "List",
  items: {
    type: "string"
  }
};

storiesOf("EditorListField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component with description", () =>
    withEditor({ ...schema, description: "some description" })
  )
  .add("Component with minItems", () =>
    withEditor({ ...schema, description: "some description", minItems: 1 })
  )
  .add("Component with maxItems", () =>
    withEditor({ ...schema, description: "some description", maxItems: 3 })
  )
  .add("Component list of dropdowns", () =>
    withEditor({
      ...schema,
      description: "some description",
      items: {
        type: "string",
        enum: ["Option One", "Option Two", "Option Three"]
      }
    })
  )
  .add("Component list with default", () =>
    withEditor({
      ...schema,
      default: ["1", "2"]
    })
  );

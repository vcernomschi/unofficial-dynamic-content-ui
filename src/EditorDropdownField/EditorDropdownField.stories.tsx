import { storiesOf } from "@storybook/react";
import React from "react";
import { withEditor } from "../utils";
import EditorDropdownField from "./EditorDropdownField";

const schema = {
  type: "string",
  enum: ["Option One", "Option Two", "Option Three"],
  title: "title",
  description: "description"
};

storiesOf("EditorDropdownField", module)
  .add("Editor", () =>
    withEditor(schema)
  )
  .add("With Default", () =>
    withEditor({...schema, default: "Option Two"})
  );

import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorTextField from "./EditorDropdownField";

const schema = {
  type: "string",
  enum: ["Option One", "Option Two", "Option Three"],
  title: "title",
  description: "description"
};

storiesOf("EditorDropdownField", module).add("Editor", () =>
  withEditor(schema)
);

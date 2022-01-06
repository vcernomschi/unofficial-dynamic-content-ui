import { storiesOf } from "@storybook/react";
import React from "react";
import Editor from "../Editor";
import { withEditor, withTheme } from "../utils";
import EditorConstField from "./EditorConstField";

const schema = {
  const: "hello world",
  value: "hello world"
};

storiesOf("EditorConstField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component", () =>
    withTheme(<EditorConstField pointer="" value="hello world" schema={{ ...schema, title: "Const" }}/>)
  );

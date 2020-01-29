import { storiesOf } from "@storybook/react";
import React from "react";
import { Editor } from "..";

const stringSchema = {
  type: "string",
  minLength: 10
};

const schema = {
  type: "string"
};

storiesOf("Editor", module).add("Component", () => <Editor schema={schema} />);

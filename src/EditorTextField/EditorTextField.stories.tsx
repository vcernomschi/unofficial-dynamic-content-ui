import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorTextField from "./EditorTextField";

const schema = {
  type: "string"
};

storiesOf("EditorTextField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component", () =>
    withTheme(<EditorTextField pointer="" schema={schema} />)
  )
  .add("Component with title", () =>
    withTheme(
      <EditorTextField pointer="" schema={{ ...schema, title: "title" }} />
    )
  )
  .add("Component with description", () =>
    withTheme(
      <EditorTextField
        pointer=""
        schema={{ ...schema, title: "title", description: "description" }}
      />
    )
  )
  .add("Read Only", () =>
    withTheme(
      <EditorTextField
        pointer=""
        schema={schema}
        value="value"
        readonly={true}
      />
    )
  )
  .add("Disabled", () =>
    withTheme(
      <EditorTextField
        pointer=""
        schema={schema}
        value="value"
        disabled={true}
      />
    )
  )
  .add("Required", () =>
    withTheme(
      <EditorTextField
        pointer=""
        schema={{ ...schema, title: "title" }}
        required={true}
      />
    )
  )
  .add("With Default", () =>
    withTheme(
      <EditorTextField
        pointer=""
        schema={{ ...schema, default: "Default" }}
        required={true}
      />
    )
  );

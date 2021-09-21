import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorColorField from "./EditorColorField";

const schema = {
  type: "string",
  format: "color"
};

storiesOf("EditorColorField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component", () =>
    withTheme(<EditorColorField pointer="" schema={schema}/>)
  )
  .add("Component with title", () =>
    withTheme(
      <EditorColorField pointer="" schema={{ ...schema, title: "title" }}/>
    )
  )
  .add("Component with description", () =>
    withTheme(
      <EditorColorField
        pointer=""
        schema={{ ...schema, title: "title", description: "description" }}
      />
    )
  )
  .add("Read Only", () =>
    withTheme(
      <EditorColorField
        pointer=""
        schema={schema}
        value="value"
        readonly={true}
      />
    )
  )
  .add("Disabled", () =>
    withTheme(
      <EditorColorField
        pointer=""
        schema={schema}
        value="value"
        disabled={true}
      />
    )
  )
  .add("Required", () =>
    withTheme(
      <EditorColorField
        pointer=""
        schema={{ ...schema, title: "title" }}
        required={true}
      />
    )
  )
  .add("With Default", () =>
    withEditor({ ...schema, title: "title", default: "#ffffff" })
  );

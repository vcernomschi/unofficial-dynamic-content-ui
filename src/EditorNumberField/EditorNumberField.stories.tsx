import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorNumberField from "./EditorNumberField";

const schema = {
  type: "number",
  minimum: 3,
  maximum: 10
};

storiesOf("EditorNumberField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component", () =>
    withTheme(<EditorNumberField pointer="" schema={schema} />)
  )
  .add("Component with title", () =>
    withTheme(
      <EditorNumberField pointer="" schema={{ ...schema, title: "title" }} />
    )
  )
  .add("Component with description", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={{ ...schema, title: "title", description: "description" }}
      />
    )
  )
  .add("Read Only", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={schema}
        value="0"
        readonly={true}
      />
    )
  )
  .add("Disabled", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={schema}
        value="0"
        disabled={true}
      />
    )
  )
  .add("Required", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={{ ...schema, title: "title" }}
        required={true}
      />
    )
  )
  .add("Minimum and maximum", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={{ ...schema, minimum: 3, maximum: 10 }}
        required={true}
      />
    )
  )
  .add("With Default", () =>
    withTheme(
      <EditorNumberField
        pointer=""
        schema={{ ...schema, default: 10 }}
        required={true}
      />
    )
  );

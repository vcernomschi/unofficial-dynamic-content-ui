import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorCheckboxField from "./EditorCheckboxField";

const schema = {
  type: "boolean"
};

storiesOf("EditorCheckboxField", module)
  .add("Editor", () => withEditor(schema))
  .add("Component", () =>
    withTheme(<EditorCheckboxField pointer="" schema={schema} />)
  )
  .add("Component with title", () =>
    withTheme(
      <EditorCheckboxField pointer="" schema={{ ...schema, title: "title" }} />
    )
  )
  .add("Component with description", () =>
    withTheme(
      <EditorCheckboxField
        pointer=""
        schema={{ ...schema, title: "title", description: "description" }}
      />
    )
  )
  .add("Read Only", () =>
    withTheme(
      <EditorCheckboxField
        pointer=""
        schema={schema}
        value="value"
        readonly={true}
      />
    )
  )
  .add("Disabled", () =>
    withTheme(
      <EditorCheckboxField
        pointer=""
        schema={schema}
        value="value"
        disabled={true}
      />
    )
  )
  .add("Required", () =>
    withTheme(
      <EditorCheckboxField
        pointer=""
        schema={{ ...schema, title: "title" }}
        required={true}
      />
    )
  );

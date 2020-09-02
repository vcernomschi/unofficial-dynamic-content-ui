import { storiesOf } from "@storybook/react";
import React from "react";
import Editor from '../Editor';
import { withEditor } from "../utils/withEditor";


const schema = {
  type: "object",
  properties: {
    const1: {
      const: "hello world"
    }
  }
};

storiesOf("EditorConstField", module).add("Editor", () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return <div>
    <Editor schema={schema} value={{}} onChange={handleChange} />
    <code>
      {JSON.stringify(value)}
    </code>
  </div>;
});

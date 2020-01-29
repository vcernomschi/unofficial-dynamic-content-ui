// tslint:disable-next-line
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import Editor from "../Editor/Editor";
import { EditorRegistry } from "../EditorRegistry";
import Theme from "../Theme";
import { withTheme } from "./withTheme";

/**
 * Helper function used by stories
 * @param schema
 */
export function withEditor(
  schema: any,
  value?: any,
  registry?: EditorRegistry
): React.ReactElement {
  return withTheme(
    <Editor schema={schema} value={value} registry={registry} />
  );
}

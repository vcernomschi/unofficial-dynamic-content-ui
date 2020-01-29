import { ErrorReport } from "dc-extensions-sdk";
import { EditorRegistry } from "../EditorRegistry";

export enum EditorFieldParentType {
  EDITOR_ROOT,
  OBJECT,
  ARRAY
}

export interface EditorFieldProps {
  schema: any;
  pointer: string;
  value?: any;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  registry?: EditorRegistry;
  errorReport?: ErrorReport[];
  onChange?: (value: any) => void;
  parentType?: EditorFieldParentType;
}

export type WithEditorFieldProps<P = {}> = P & EditorFieldProps;

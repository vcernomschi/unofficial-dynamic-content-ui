import { ComponentType } from "react";
import { EditorFieldProps } from "../EditorField";

import { ErrorReport, SchemaValidationError } from "dc-extensions-sdk";

import EditorContentLinkField from "../EditorContentLinkField";
import EditorContentReferenceField from "../EditorContentReferenceField";
import EditorDropdownField from "../EditorDropdownField";
import EditorMediaLinkField from "../EditorMediaLinkField";
import EditorObjectField from "../EditorObjectField/EditorObjectField";
import EditorOneOfField, {
  isOneOfField
} from "../EditorOneOfField/EditorOneOfField";
import EditorTextField from "../EditorTextField/EditorTextField";
import EditorConstField from "../EditorConstField";

export type EditorFieldProvider = (
  schema: any
) => ComponentType<EditorFieldProps> | undefined;
export type EditorErrorMessageConverter = (
  schema: any,
  error: ErrorReport
) => string;

export interface EditorRegistry {
  fieldProviders: EditorFieldProvider[];
  errorMessages: { [keyword: string]: EditorErrorMessageConverter };
}

export function forType(
  type: string,
  component: ComponentType<EditorFieldProps>
): EditorFieldProvider {
  return (schema: any) => {
    if (schema.type === type) {
      return component;
    }
  };
}

export function forExtensionName(
  name: string,
  component: ComponentType<EditorFieldProps>
): EditorFieldProvider {
  return (schema: any) => {
    if (schema["ui:extension"] && schema["ui:extension"].name === name) {
      return component;
    }
  };
}

export function forBuiltInSchema(
  builtInSchemas: string[],
  component: ComponentType<EditorFieldProps>
): EditorFieldProvider {
  return (schema: any) => {
    if (schema && schema.allOf) {
      const schemas: string[] = schema.allOf.map(
        (subSchema: any) => subSchema.$ref
      );

      for (const builtInSchema of builtInSchemas) {
        if (schemas.indexOf(builtInSchema) !== -1) {
          return component;
        }
      }
    }
  };
}

export function getComponentForSchema(
  schema: any,
  registry: EditorRegistry | undefined
): ComponentType<EditorFieldProps> | undefined {
  if (registry) {
    for (const provider of registry.fieldProviders) {
      const control = provider(schema);
      if (control) {
        return control;
      }
    }
  }
}

export function getDefaultRegistry(): EditorRegistry {
  return {
    fieldProviders: [
      // one of
      (schema: any) => {
        if (isOneOfField(schema)) {
          return EditorOneOfField;
        }
      },

      (schema: any) => {
        if(schema && schema.const) {
          return EditorConstField;
        }
      },

      // dropdown
      (schema: any) => (schema.enum ? EditorDropdownField : undefined),

      // text field
      forType("string", EditorTextField),

      // media link
      forBuiltInSchema(
        [
          "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link",
          "http://bigcontent.io/cms/schema/v1/core#/definitions/video-link"
        ],
        EditorMediaLinkField
      ),

      // content-link
      forBuiltInSchema(
        ["http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"],
        EditorContentLinkField
      ),

      // content-reference
      forBuiltInSchema(
        ["http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference"],
        EditorContentReferenceField
      ),

      // object
      forType("object", EditorObjectField)
    ],
    errorMessages: getDefaultErrorMessages()
  };
}

export function getDefaultErrorMessages(): {
  [keyword: string]: EditorErrorMessageConverter;
} {
  return {
    maxLength: (schema: any, error: ErrorReport) => {
      const errorData = error.data as SchemaValidationError;
      const params = errorData.params as any;
      return `${schema.title} is too long (it should be at most ${params.limit} characters`;
    },
    minLength: (schema: any, error: ErrorReport) => {
      const errorData = error.data as SchemaValidationError;
      const params = errorData.params as any;
      return `${schema.title} is too short (it should be at least ${params.limit} characters`;
    },
    pattern: (schema: any, error: ErrorReport) => {
      const errorData = error.data as SchemaValidationError;
      const params = errorData.params as any;
      return `Must match the format for ${params.pattern}`;
    },
    minimum: (schema: any, error: ErrorReport) => {
      const errorData = error.data as SchemaValidationError;
      const params = errorData.params as any;
      return `${schema.title} should be at least ${params.limit}`;
    },
    maximum: (schema: any, error: ErrorReport) => {
      const errorData = error.data as SchemaValidationError;
      const params = errorData.params as any;
      return `${schema.title} should be at most ${params.limit}`;
    }
  };
}

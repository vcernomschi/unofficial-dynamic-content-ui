import { ErrorReport, SchemaValidationError } from "dc-extensions-sdk";
import { EditorRegistry } from "../EditorRegistry";

export function getErrorsForPointer(
  pointer: string,
  errorReport?: ErrorReport[]
): ErrorReport[] {
  if (!errorReport) {
    return [];
  }
  return errorReport.filter(x => x.pointer && x.pointer === pointer);
}

export function getErrorMessage(
  schema: any,
  error: ErrorReport,
  registry?: EditorRegistry
): string {
  if (registry && error.data) {
    const keyword = (error.data as SchemaValidationError).keyword;
    if (keyword && registry.errorMessages[keyword]) {
      return registry.errorMessages[keyword](schema, error);
    }
  }
  return error.message;
}

export function getErrorMessages(
  schema: any,
  errors: ErrorReport[],
  registry?: EditorRegistry
): string[] {
  return errors.map(x => getErrorMessage(schema, x, registry));
}

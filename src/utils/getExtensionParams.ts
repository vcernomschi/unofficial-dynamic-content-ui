export function getExtensionParams(
  schema: any,
  defaultValue?: any
): any | undefined {
  if (schema && schema["ui:extension"] && schema["ui:extension"].params) {
    return schema["ui:extension"].params;
  }

  return defaultValue;
}

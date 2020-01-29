export function detokenize(
  template: string,
  variables: { [name: string]: string | undefined },
  tokenPrefix: string = "{{",
  tokenSuffix: string = "}}"
): string {
  if (!template) {
    throw new Error("No template to detokenize");
  }

  for (const variableName of Object.keys(variables)) {
    const variableValue = variables[variableName];
    if (!variableValue) {
      continue;
    }

    const replaceRegex = new RegExp(
      `${tokenPrefix}${variableName}${tokenSuffix}`,
      "g"
    );
    template = template.replace(
      replaceRegex,
      encodeURIComponent(variableValue)
    );
  }

  return template;
}

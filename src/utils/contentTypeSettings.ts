export interface ContentTypeSettings {
  cards: {
    [schemaId: string]: string;
  };
  icons: {
    [schemaId: string]: string;
  };
}

export function getContentTypeCard(
  settings: ContentTypeSettings,
  schemaId: string
): string | undefined {
  if (!settings || !settings.cards) {
    return;
  }

  for (const key of Object.keys(settings.cards)) {
    if (key === "*" || key === schemaId) {
      return settings.cards[key];
    }
  }
}

export function getContentTypeIcon(
  settings: ContentTypeSettings,
  schemaId: string
): string | undefined {
  if (!settings || !settings.icons) {
    return;
  }

  for (const key of Object.keys(settings.icons)) {
    if (key === "*" || key === schemaId) {
      return settings.icons[key];
    }
  }
}

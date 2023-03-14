import React from "react";

import { Tooltip, withStyles, WithStyles } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import clsx from "clsx";
import CardContainer from "../Chooser/Chooser";
import CardContainerActions from "../ChooserActions";
import CollapsibleSection from "../CollapsibleSection";
import CollapsibleSectionHeader from "../CollapsibleSectionHeader";
import ContentItemCard from "../ContentItemCard";
import { EditorFieldParentType, WithEditorFieldProps } from "../EditorField";
import { AddIcon, DeleteIcon } from "../Icons";
import SdkContext from "../SdkContext";
import StyledFab from "../StyledFab";
import {
  getContentTypeCard,
  getContentTypeIcon
} from "../utils/contentTypeSettings";
import { getExtensionParams } from "../utils/getExtensionParams";
import Visualization from "../Visualization";

import { ContentClient } from "dc-delivery-sdk-js";

export const styles = {
  root: {
    width: "100%"
  },
  collapsibleBody: {
    padding: "0px"
  },
  header: {
    display: "inline-flex",
    "vertical-align": "middle"
  }
};

export interface EditorContentLinkFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {
  contentReference?: boolean;
}

function getContentTypes(schema: any): string[] {
  if (!schema.allOf) {
    return [];
  }
  const result = [];
  for (const subSchema of schema.allOf) {
    if (
      subSchema &&
      subSchema.properties &&
      subSchema.properties.contentType &&
      subSchema.properties.contentType.enum
    ) {
      const contentTypes: string[] = subSchema.properties.contentType.enum;
      for (const contentType of contentTypes) {
        if (result.indexOf(contentType) === -1) {
          result.push(contentType);
        }
      }
    }
  }
  return result;
}

export const EditorContentLinkField: React.SFC<EditorContentLinkFieldProps> = (
  props: EditorContentLinkFieldProps
) => {
  const { schema, onChange, value, parentType, classes } = props;

  const { sdk } = React.useContext(SdkContext);

  const contentTypes: string[] = getContentTypes(schema);
  const hasValue = (value != null && value._meta && value._meta.schema) || (schema.default && schema.default._meta && schema.default._meta.schema);

  const [localValue, setValue] = React.useState(schema.default || value);

  const handleBrowse = React.useCallback(async () => {
    try {
      if (sdk) {
        const content = props.contentReference
          ? await sdk.contentReference.get(contentTypes)
          : await sdk.contentLink.get(contentTypes);
        if (content && onChange) {
          onChange(content);
        }
      }
      // tslint:disable-next-line
    } catch {}
  }, [onChange, sdk]);

  React.useEffect(
    () => {
      if (value) {
        setValue(value);
      }
    },
    [value]
  );

  const handleDelete = React.useCallback(
    event => {
      if (onChange) {
        setValue(undefined);
        onChange(undefined);
      }
    },
    [onChange]
  );

  const canCollapse = parentType !== EditorFieldParentType.EDITOR_ROOT;
  const [isExpanded, setExpandedState] = React.useState(true);

  const handleExpand = (expanded: boolean) => {
    setExpandedState(expanded);
  };

  const Icon = isExpanded ? KeyboardArrowDown : KeyboardArrowRight;
  let cardContainer;

  const [loadedContentItemId, setLoadedContentItemId] = React.useState<
    string | undefined
  >(undefined);
  const [contentItemJson, setContentItemJson] = React.useState<any | undefined>(
    undefined
  );

  const handleFetchContentJson = React.useCallback(async () => {
    if (localValue && localValue.id && sdk) {
      setLoadedContentItemId(localValue.id);

      try {
        const contentClient = new ContentClient({
          account: "staging",
          stagingEnvironment: sdk.stagingEnvironment
        });
        const content = await contentClient.getContentItem(localValue.id);
        setContentItemJson(content.toJSON());
      } catch (err) {
        setContentItemJson(undefined);
      }
    } else {
      setContentItemJson(undefined);
    }
  }, [localValue, setLoadedContentItemId, setContentItemJson]);

  if (hasValue && localValue.id && localValue.id !== loadedContentItemId) {
    handleFetchContentJson();
  }

  if (hasValue) {
    const contentTypeSettings = getExtensionParams(
      sdk && sdk.field ? sdk.field.schema : {},
      {}
    ).contentTypes;
    const iconUrl = getContentTypeIcon(contentTypeSettings, localValue.contentType);
    const cardTemplateUrl = getContentTypeCard(
      contentTypeSettings,
      localValue.contentType
    );

    cardContainer = (
      <CardContainer variant="populated-slot">
        <ContentItemCard
          label={
            contentItemJson && contentItemJson._meta
              ? contentItemJson._meta.name || ""
              : ""
          }
          icon={iconUrl}
        >
          {cardTemplateUrl && sdk ? (
            <Visualization
              template={cardTemplateUrl}
              params={{
                contentItemId: localValue.id,
                stagingEnvironment: sdk.stagingEnvironment
              }}
            />
          ) : (
            undefined
          )}
        </ContentItemCard>

        <CardContainerActions variant="populated-slot">
          <Tooltip title="Delete">
            <StyledFab variant="dark" onClick={handleDelete}>
              {DeleteIcon}
            </StyledFab>
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    );
  } else {
    cardContainer = (
      <CardContainer variant="empty-slot">
        <CardContainerActions variant="empty-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" onClick={handleBrowse}>
              {AddIcon}
            </StyledFab>
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    );
  }

  if (canCollapse) {
    return (
      <CollapsibleSection onChange={handleExpand}>
        <CollapsibleSectionHeader icon={Icon} title={schema.title} />

        <div className={clsx(classes.collapsibleBody)}>{cardContainer}</div>
      </CollapsibleSection>
    );
  }

  return cardContainer;
};

export default withStyles(styles, { name: "DcEditorContentLinkField" })(
  EditorContentLinkField
);

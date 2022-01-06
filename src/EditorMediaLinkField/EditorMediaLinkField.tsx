import React, { PropsWithChildren } from "react";

import {
  SvgIcon,
  Tooltip,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import clsx from "clsx";
import { SDK } from "dc-extensions-sdk";
import CardContainer from "../Chooser/Chooser";
import CardContainerActions from "../ChooserActions";
import CollapsibleSection from "../CollapsibleSection";
import CollapsibleSectionHeader from "../CollapsibleSectionHeader";
import { EditorFieldParentType, WithEditorFieldProps } from "../EditorField";
import EditorField from "../EditorField/EditorField";
import { AddIcon, DeleteIcon } from "../Icons";
import ImageCard from "../ImageCard/ImageCard";
import SdkContext from "../SdkContext";
import StyledFab from "../StyledFab";

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

export interface EditorMediaLinkFieldProps
  extends WithEditorFieldProps<WithStyles<typeof styles>> {}

const EditorMediaLinkField: React.SFC<EditorMediaLinkFieldProps> = (
  props: EditorMediaLinkFieldProps
) => {
  const { schema, onChange, value, parentType, classes } = props;

  const { sdk } = React.useContext(SdkContext);

  const validTypes: string[] = (schema.allOf || [])
    .filter((x: any) => x.$ref)
    .map((x: any) => x.$ref);

  const allowImages =
    validTypes.indexOf(
      "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
    ) !== -1;
  const allowVideo =
    validTypes.indexOf(
      "http://bigcontent.io/cms/schema/v1/core#/definitions/video-link"
    ) !== -1;

  const hasValue = (value != null && value._meta && value._meta.schema) || (schema.default && schema.default._meta && schema.default._meta.schema);

  const [localValue, setValue] = React.useState(schema.default || value);
  const handleBrowse = React.useCallback(async () => {
    try {
      if (sdk) {
        const mediaLink = await sdk.mediaLink.getImage();
        if (mediaLink && onChange) {
          setValue(mediaLink);
          onChange(mediaLink);
        }
      }
      // tslint:disable-next-line
    } catch (err) {}
  }, [onChange, sdk]);

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

  if (hasValue && localValue) {
    cardContainer = (
      <CardContainer variant="populated-slot">
        <ImageCard
          label={localValue.name || ""}
          src={`//${
            sdk && sdk.stagingEnvironment
              ? sdk.stagingEnvironment
              : localValue.defaultHost
          }/i/${localValue.endpoint}/${localValue.name}?h=195&w=341&sm=MC`}
        />
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

export default withStyles(styles, { name: "DcEditorMediaLinkField" })(
  EditorMediaLinkField
);

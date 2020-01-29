import { Tooltip } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import CardContainerActions from "../ChooserActions";
import StyledFab from "../StyledFab";
import { withTheme } from "../utils";

import CardContainer from "../Chooser/Chooser";
import Visualization from "../Visualization";
import ContentItemCard from "./ContentItemCard";

storiesOf("ContentItemCard", module)
  .add("Default Icon", () =>
    withTheme(
      <CardContainer variant="populated-slot">
        <ContentItemCard label="label" />

        <CardContainerActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    )
  )
  .add("Icon", () =>
    withTheme(
      <CardContainer variant="populated-slot">
        <ContentItemCard
          label="label"
          icon="https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/icons/icon-card.png"
        />

        <CardContainerActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    )
  )
  .add("Visualization", () =>
    withTheme(
      <CardContainer variant="populated-slot">
        <ContentItemCard
          label="label"
          icon="https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/icons/icon-card.png"
        >
          <Visualization
            template="https://d3rcavkmxce5gq.cloudfront.net/preview/card?vse={{vse.domain}}&content={{content.sys.id}}"
            params={{
              contentItemId: "61dff27a-fe11-4055-b4de-b9133fb5a7de",
              stagingEnvironment:
                "8d0nfe8p86q314k885enoody0.staging.bigcontent.io"
            }}
          />
        </ContentItemCard>

        <CardContainerActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    )
  );

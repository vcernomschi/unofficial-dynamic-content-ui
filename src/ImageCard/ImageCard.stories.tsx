import { Tooltip } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import CardContainerActions from "../ChooserActions";
import StyledFab from "../StyledFab";
import { withTheme } from "../utils";

import CardContainer from "../Chooser/Chooser";
import ImageCard from "./ImageCard";

storiesOf("ImageCard", module)
  .add("Wide", () =>
    withTheme(
      <CardContainer variant="populated-slot">
        <ImageCard label="label" src="https://via.placeholder.com/350x150" />
        <CardContainerActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    )
  )
  .add("Tall", () =>
    withTheme(
      <CardContainer variant="populated-slot">
        <ImageCard label="label" src="https://via.placeholder.com/150x350" />
        <CardContainerActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </CardContainerActions>
      </CardContainer>
    )
  );

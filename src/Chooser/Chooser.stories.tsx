import { Tooltip } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import Card from "../Card";
import ChooserActions from "../ChooserActions";
import StyledFab from "../StyledFab";
import { withTheme } from "../utils";
import Chooser from "./Chooser";

storiesOf("Chooser", module)
  .add("Empty", () =>
    withTheme(
      <Chooser variant="empty-slot">
        <ChooserActions variant="empty-slot">
          <Tooltip title="Add">
            <StyledFab variant="light" />
          </Tooltip>
        </ChooserActions>
      </Chooser>
    )
  )
  .add("Populated", () =>
    withTheme(
      <Chooser variant="populated-slot">
        <Card />
        <ChooserActions variant="populated-slot">
          <Tooltip title="Add">
            <StyledFab variant="dark" />
          </Tooltip>
        </ChooserActions>
      </Chooser>
    )
  );

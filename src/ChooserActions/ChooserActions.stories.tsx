import { Fab, Tooltip } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import ChooserActions from "./ChooserActions";

storiesOf("ChooserActions", module)
  .add("Empty", () =>
    withTheme(
      <div style={{ width: 300, height: 300, position: "relative" }}>
        <ChooserActions>
          <Tooltip title="Add">
            <Fab />
          </Tooltip>
        </ChooserActions>
      </div>
    )
  )
  .add("Populated", () =>
    withTheme(
      <div style={{ width: 300, height: 300, position: "relative" }}>
        <ChooserActions variant="populated-slot">
          <Tooltip title="Add">
            <Fab />
          </Tooltip>
        </ChooserActions>
      </div>
    )
  );

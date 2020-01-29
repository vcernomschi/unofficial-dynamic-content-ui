import { Tooltip } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";

import Card from "../Card";
import CardHeader from "./CardHeader";

storiesOf("CardHeader", module)
  .add("Component", () =>
    withTheme(
      <Card style={{ maxWidth: 300, height: 300 }}>
        <CardHeader title="Header Text" />
      </Card>
    )
  )
  .add("Overflowing", () =>
    withTheme(
      <Card style={{ maxWidth: 300, height: 300 }}>
        <CardHeader title="Header text that is too long to fit in the box to test overflow functionality" />
      </Card>
    )
  );

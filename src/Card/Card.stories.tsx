import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";

import Card from "./Card";

storiesOf("Card", module).add("Component", () =>
  withTheme(<Card style={{ maxWidth: 300, height: 300 }} />)
);

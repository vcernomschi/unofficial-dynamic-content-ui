import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import StyledFab from "./StyledFab";

storiesOf("StyledFab", module)
  .add("Light", () => withTheme(<StyledFab variant="light" />))
  .add("Dark", () => withTheme(<StyledFab variant="dark" />));

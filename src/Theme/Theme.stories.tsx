import { TextField } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";

storiesOf("Theme", module).add("Text Field", () =>
  withTheme(<TextField label="label" />)
);

import { storiesOf } from "@storybook/react";
import React from "react";
import { withTheme } from "../utils";
import Visualization from "./Visualization";

storiesOf("Visualization", module).add("Component", () =>
  withTheme(
    <Visualization
      template="https://d3rcavkmxce5gq.cloudfront.net/preview/card?vse={{vse.domain}}&content={{content.sys.id}}"
      params={{
        contentItemId: "61dff27a-fe11-4055-b4de-b9133fb5a7de",
        stagingEnvironment: "8d0nfe8p86q314k885enoody0.staging.bigcontent.io"
      }}
    />
  )
);

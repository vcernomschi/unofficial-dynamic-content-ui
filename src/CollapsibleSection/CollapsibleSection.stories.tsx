import { storiesOf } from "@storybook/react";
import React from "react";
import CollapsibleSection from "./CollapsibleSection";

storiesOf("CollapsibleSection", module).add("Component", () => (
  <CollapsibleSection>
    <span>Header</span>
    <div>Body</div>
  </CollapsibleSection>
));

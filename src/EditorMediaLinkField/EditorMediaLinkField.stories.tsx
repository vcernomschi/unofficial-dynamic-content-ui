import { storiesOf } from "@storybook/react";
import { SDK } from "dc-extensions-sdk";
import React from "react";
import SdkContext from "../SdkContext";
import { withTheme } from "../utils";
import { withEditor } from "../utils/withEditor";
import EditorMediaLinkField from "./EditorMediaLinkField";

const schema = {
  type: "object",
  allOf: [
    { $ref: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link" }
  ]
};

const imageSchema = {
  allOf: [
    { $ref: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link" }
  ]
};

const imageValue = {
  _meta: {
    schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
  },
  id: "c2f2bed1-4ba7-4457-ae4d-85930e333b3a",
  name: "sap_cx_live_munich_home_1920x550_munich",
  endpoint: "willow",
  defaultHost: "i1.adis.ws"
};

const mockSdk = new SDK();
mockSdk.stagingEnvironment = "i1.adis.ws";
mockSdk.mediaLink.getImage = () => {
  return Promise.resolve(imageValue);
};

storiesOf("EditorMediaLinkField", module)
  .add("Editor", () => (
    <SdkContext.Provider value={{ sdk: mockSdk }}>
      {withEditor(schema, imageValue)}
    </SdkContext.Provider>
  ))
  .add("Component with no value", () => (
    <SdkContext.Provider value={{ sdk: mockSdk }}>
      {withTheme(
        <EditorMediaLinkField
          pointer=""
          value={undefined}
          schema={imageSchema}
        />
      )}
    </SdkContext.Provider>
  ))
  .add("Component with value", () => (
    <SdkContext.Provider value={{ sdk: mockSdk }}>
      {withTheme(
        <EditorMediaLinkField
          pointer=""
          value={imageValue}
          schema={imageSchema}
        />
      )}
    </SdkContext.Provider>
  ))
  .add("Component with default", () => (
    <SdkContext.Provider value={{ sdk: mockSdk }}>
      {withTheme(
        <EditorMediaLinkField
          pointer=""
          schema={{
            ...imageSchema,
            default: {
              "_meta":{
                "schema":"http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
              },
              "id":"286e4760-1812-4e3a-81ab-d2e3bf32b9b5",
              "name":"blue-tie",
              "endpoint":"ampproduct",
              "defaultHost":"cdn.media.amplience.net"
            }

          }}
        />
      )}
    </SdkContext.Provider>
  ));

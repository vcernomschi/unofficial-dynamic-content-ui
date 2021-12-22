import { storiesOf } from "@storybook/react";
import { SDK } from "dc-extensions-sdk";
import React from "react";
import SdkContext from "../SdkContext";
import { withEditor } from "../utils/withEditor";
import "./EditorContentReferenceField";

const schema = {
  type: "object",
  allOf: [
    {
      $ref:
        "http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference"
    },
    {
      properties: {
        contentType: {
          enum: ["http://test.com"]
        }
      }
    }
  ],

  "ui:extension": {
    url: "http://test.com/test",
    params: {
      contentTypes: {
        cards: {
          "*":
            "https://d3rcavkmxce5gq.cloudfront.net/preview/card?vse={{vse.domain}}&content={{content.sys.id}}"
        },
        icons: {
          "*":
            "https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/icons/icon-card.png"
        }
      }
    }
  }
};

const contentReference = {
  _meta: {
    schema:
      "http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference"
  },
  contentType:
    "https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/content-types/card.json",
  id: "f00c6599-29d1-4883-9fbc-3d3e9272c187"
};

const mockSdk = new SDK();
mockSdk.field = { schema } as any;
mockSdk.stagingEnvironment = "8d0nfe8p86q314k885enoody0.staging.bigcontent.io";
mockSdk.contentReference.get = () => {
  return Promise.resolve(contentReference);
};

storiesOf("EditorContentReferenceField", module).add("Editor", () => (
  <SdkContext.Provider value={{ sdk: mockSdk }}>
    {withEditor(schema, contentReference)}
  </SdkContext.Provider>
));

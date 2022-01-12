import { storiesOf } from "@storybook/react";
import { SDK } from "dc-extensions-sdk";
import React from "react";
import SdkContext from "../SdkContext";
import { withTheme, withEditor } from "../utils";
import EditorContentLinkField from "./EditorContentLinkField";

const schema = {
  type: "object",
  allOf: [
    {
      $ref: "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
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

const contentLink = {
  _meta: {
    schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
  },
  contentType:
    "https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/content-types/card.json",
  id: "c6f77ffc-9d70-45e9-b322-89d4436b8774"
};

const mockSdk = new SDK();
mockSdk.field = { schema } as any;
mockSdk.stagingEnvironment = "8d0nfe8p86q314k885enoody0.staging.bigcontent.io";
mockSdk.contentLink.get = () => {
  return Promise.resolve(contentLink);
};

storiesOf("EditorContentLinkField", module)
  .add("Editor", () => (
  <SdkContext.Provider value={{ sdk: mockSdk }}>
    {withEditor(schema, contentLink)}
  </SdkContext.Provider>
))
  .add("Component with default", () => (
    <SdkContext.Provider value={{ sdk: mockSdk }}>
      {withTheme(
        <EditorContentLinkField
          pointer=""
          schema={{
            ...schema,
            default: {
              _meta: {
                schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
              },
              contentType:
                "https://raw.githubusercontent.com/neilmistryamplience/dc-example-website/willow/content-types/card.json",
              id: "c6f77ffc-9d70-45e9-b322-89d4436b8774"
            }

          }}
        />
      )}
    </SdkContext.Provider>
  ));

import { storiesOf } from "@storybook/react";
import React from "react";
import { Editor } from "..";
import { Modal, Backdrop, DialogContent } from "@material-ui/core";

const stringSchema = {
  type: "string",
  minLength: 10
};

const schema = {
  title: "title",
  description: "description",
  type: "boolean"
};

const schema2 = {
  type: "object",
  properties: {
    "1": {
      title: "Color level 1",
      type: "string",
      format: "color"
    },
    "2": {
      title: "Level 2",
      type: "object",
      properties: {
        "2-1": {
          title: "Color level 1",
          type: "string",
          format: "color"
        },
        "2-2": {
          title: "Color level 2",
          type: "string",
          format: "color"
        },
        "2-3": {
          title: "Level 3",
          type: "object",
          properties: {
            "2-3-1": {
              title: "Color",
              type: "string",
              format: "color"
            }
          }
        }
      },
      required: ["2-1"]
    }
  }
};

const schema1 = {
  type: "object",
  "ui:extension": {
    url: "https://localhost:3000",
    params: {
      height: 800,
      slots: {
        header: { title: "Header", allow: ["header"] },
        content: {
          title: "E-Mail Body",
          allow: ["imageCopyStackCta", "spacer"]
        },
        footer: { title: "Footer", allow: ["footer"] }
      },
      components: [
        {
          name: "copyStack",
          title: "Container",
          group: "Copy stack",
          icon: "widgets",
          properties: {
            propertyName1: {
              title: "title",
              description: "description",
              type: "boolean"
            },
            background: {
              title: "Background color",
              description: "",
              type: "string"
            },
            backgroundImage: {
              title: "Background image",
              allOf: [
                {
                  $ref:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                }
              ]
            },
            textColor: { title: "Text color", description: "", type: "string" },
            align: {
              title: "Text align",
              type: "string",
              enum: ["Left", "Center", "Right"]
            },
            height: {
              type: "Text container height",
              enum: [
                "350",
                "400",
                "450",
                "500",
                "550",
                "600",
                "650",
                "700",
                "750",
                "800"
              ]
            }
          },
          slots: {
            children: {
              allow: [
                "image",
                "eyeBrow",
                "heading",
                "bodyCopy",
                "supportCopy",
                "cta"
              ]
            }
          }
        },
        {
          name: "image",
          title: "Image",
          group: "Copy stack",
          icon: "image",
          properties: {
            image: {
              title: "Image",
              allOf: [
                {
                  $ref:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                }
              ]
            },
            list: {
              title: "title",
              type: "array",
              minItems: 0,
              maxItems: 10,
              items: {
                allOf: [
                  {
                    $ref:
                      "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                  }
                ]
              }
            }
          },
          slots: {}
        },
        {
          name: "eyeBrow",
          title: "Eyebrow Copy",
          group: "Copy stack",
          icon: "article",
          properties: {
            text: {
              title: "Eyebrow Copy",
              description: "",
              type: "string",
              maxLength: 100
            }
          },
          slots: {}
        },
        {
          name: "heading",
          group: "Copy stack",
          title: "Heading",
          icon: "article",
          properties: {
            text: {
              title: "Heading",
              description: "",
              type: "string",
              maxLength: 100
            }
          },
          slots: {}
        },
        {
          name: "bodyCopy",
          group: "Copy stack",
          title: "Body Copy",
          icon: "article",
          properties: {
            text: {
              title: "Body Copy",
              description: "",
              type: "string",
              maxLength: 100
            }
          },
          slots: {}
        },
        {
          name: "supportCopy",
          group: "Copy stack",
          title: "Support Copy",
          icon: "article",
          properties: {
            text: {
              title: "Support Copy",
              description: "",
              type: "string",
              maxLength: 100
            }
          },
          slots: {}
        },
        {
          name: "cta",
          group: "Copy stack",
          title: "CTA",
          icon: "call_to_action",
          properties: {
            label: {
              title: "Text",
              description: "",
              type: "string",
              maxLength: 100
            },
            url: {
              title: "URL",
              description: "",
              type: "string",
              maxLength: 100
            },
            style: {
              title: "Styles",
              description: "",
              type: "string",
              enum: ["Primary", "Primary banner", "Secondary", "Tertiary"]
            }
          },
          slots: {}
        },
        {
          name: "imageCopyStackCta",
          title: "ImageCopyStackCta Container",
          icon: "widgets",
          properties: {},
          slots: { children: { allow: ["copyStack"] } }
        },
        {
          name: "spacer",
          title: "Spacer",
          icon: "space_bar",
          properties: {
            height: {
              title: "Spacer height",
              description: "in px",
              type: "string"
            },
            background: { title: "Background", description: "", type: "string" }
          },
          slots: {}
        },
        {
          name: "header",
          title: "Header",
          icon: "border_top",
          properties: {
            content: {
              title: "Header",
              allOf: [
                {
                  $ref:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
                },
                {
                  properties: {
                    contentType: {
                      enum: ["https://www.coach.com/content/Header"]
                    }
                  }
                }
              ]
            }
          }
        },
        {
          name: "footer",
          title: "Footer",
          icon: "border_bottom",
          properties: {
            content: {
              title: "Footer",
              allOf: [
                {
                  $ref:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
                },
                {
                  properties: {
                    contentType: {
                      enum: ["https://www.coach.com/content/Footer"]
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    }
  },
  height: 800,
  "ui:widget": "component-tree"
};
const value = {
  header: [
    {
      name: "header",
      properties: {
        content: {
          id: "f36c937c-8fa7-4fb2-9958-b6d3cda0d548",
          contentType: "https://www.coach.com/content/Header",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
          }
        }
      }
    }
  ],
  content: [
    { name: "spacer" },
    {
      name: "imageCopyStackCta",
      slots: {
        children: [
          {
            name: "copyStack",
            properties: {
              type: "Copy Stack 2",
              background: "#cccccc",
              backgroundImage: {
                _meta: {
                  schema:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                },
                id: "457a9e0c-bf61-4f9c-a8e3-aa7b1f05e451",
                name: "man-red-sweater",
                endpoint: "csdemo",
                defaultHost: "cdn.media.amplience.net"
              },
              textColor: "#000000",
              align: "Left",
              height: "800"
            },
            slots: {
              children: [
                {
                  name: "eyeBrow",
                  properties: {
                    eyebrowCopy: "EYEBROW COPY",
                    text: "EYEBROW COPY"
                  }
                },
                {
                  name: "heading",
                  properties: { eyebrowCopy: "Heading", text: "heading" }
                },
                {
                  name: "bodyCopy",
                  properties: {
                    eyebrowCopy:
                      "Body Copy: Suspendisse sit amet arcu lacus. Auctor aliquet justo pellentesque.",
                    text:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis fermentum sapien vitae ultricies."
                  }
                },
                {
                  name: "supportCopy",
                  properties: {
                    eyebrowCopy: "Support Copy: Phasellus iaculis sapien",
                    text:
                      "Support: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis fermentum sapien vitae ultricies."
                  }
                },
                {
                  name: "cta",
                  properties: {
                    label: "primary",
                    url: "https://google.com",
                    style: "Tertiary"
                  }
                },
                {
                  name: "bodyCopy",
                  properties: {
                    eyebrowCopy:
                      "Body Copy: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis fermentum sapien vitae ultricies.",
                    text:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis fermentum sapien vitae ultricies."
                  }
                }
              ]
            }
          }
        ]
      }
    },
    { name: "spacer", properties: { background: "#cccccc", height: "30" } },
    {
      name: "imageCopyStackCta",
      slots: {
        children: [
          {
            name: "copyStack",
            properties: {
              backgroundImage: {
                _meta: {
                  schema:
                    "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                },
                id: "a171b93c-032d-48bf-b822-aebfb4c00b0b",
                name: "banner-icon-emak",
                endpoint: "csdemo",
                defaultHost: "cdn.media.amplience.net"
              }
            },
            slots: {
              children: [
                { name: "eyeBrow", properties: { text: "Eyebrow" } },
                {
                  name: "image",
                  properties: {
                    image: {
                      _meta: {
                        schema:
                          "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                      },
                      id: "f5769aa3-6b49-40e3-9e08-980d59bc66a4",
                      name: "logo-coach-blk",
                      endpoint: "csdemo",
                      defaultHost: "cdn.media.amplience.net"
                    }
                  }
                }
              ]
            }
          },
          {
            name: "copyStack",
            slots: {
              children: [
                { name: "eyeBrow", properties: { text: "Eyebrow 2" } },
                {
                  name: "image",
                  properties: {
                    image: {
                      _meta: {
                        schema:
                          "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                      },
                      id: "f5769aa3-6b49-40e3-9e08-980d59bc66a4",
                      name: "logo-coach-blk",
                      endpoint: "csdemo",
                      defaultHost: "cdn.media.amplience.net"
                    }
                  }
                }
              ]
            }
          },
          {
            name: "copyStack",
            slots: {
              children: [
                { name: "eyeBrow", properties: { text: "Eyebrow 3" } },
                {
                  name: "image",
                  properties: {
                    image: {
                      _meta: {
                        schema:
                          "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                      },
                      id: "f5769aa3-6b49-40e3-9e08-980d59bc66a4",
                      name: "logo-coach-blk",
                      endpoint: "csdemo",
                      defaultHost: "cdn.media.amplience.net"
                    }
                  }
                }
              ]
            }
          },
          {
            name: "copyStack",
            slots: {
              children: [
                { name: "eyeBrow", properties: { text: "Eyebrow 4" } },
                {
                  name: "image",
                  properties: {
                    image: {
                      _meta: {
                        schema:
                          "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
                      },
                      id: "f5769aa3-6b49-40e3-9e08-980d59bc66a4",
                      name: "logo-coach-blk",
                      endpoint: "csdemo",
                      defaultHost: "cdn.media.amplience.net"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  footer: [
    {
      name: "footer",
      properties: {
        content: {
          id: "f145b885-c9f8-40e1-b852-7dc7665e1406",
          contentType: "https://www.coach.com/content/Footer",
          _meta: {
            schema:
              "http://bigcontent.io/cms/schema/v1/core#/definitions/content-link"
          }
        }
      }
    }
  ]
};
const registry = {
  fieldProviders: [null, null, null, null, null, null, null, null, null],
  errorMessages: {}
};

storiesOf("Editor", module)
  .add("Component", () => <Editor schema={schema}/>)
  .add("On Modal", () =>
    <Modal
      closeAfterTransition={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      open={true}
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto"
      }}
    >
      <DialogContent
        style={{
          padding: 10,
          overflow: "auto",
          maxHeight: 300,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Editor schema={schema2}/>
      </DialogContent>
    </Modal>)
  .add("TEST", () => <Editor schema={schema1} value={value}/>);

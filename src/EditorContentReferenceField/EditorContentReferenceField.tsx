import { withStyles } from "@material-ui/core";
import {
  EditorContentLinkField,
  styles
} from "../EditorContentLinkField/EditorContentLinkField";

export default withStyles(styles, {
  name: "DcEditorContentReferenceField",
  contentReference: true
})(EditorContentLinkField);

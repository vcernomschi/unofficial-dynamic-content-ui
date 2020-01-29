import { SDK } from "dc-extensions-sdk";
import React from "react";

export interface SdkContextProps {
  sdk?: SDK;
}

const context = React.createContext<SdkContextProps>({});
export default context;

/*import { AllAgentConfigsType } from "@/app/types";
import frontDeskAuthentication from "./frontDeskAuthentication";
import customerServiceRetail from "./customerServiceRetail";
import simpleExample from "./simpleExample";

export const allAgentSets: AllAgentConfigsType = {
  frontDeskAuthentication,
  customerServiceRetail,
  simpleExample,
};

export const defaultAgentSetKey = "simpleExample";*/

import emotionalAwarenessAgent from "./customerServiceRetail/authentication";

export const allAgentSets = {
  default: [emotionalAwarenessAgent],
};

export const defaultAgentSetKey = "default";

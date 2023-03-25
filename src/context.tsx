import React from "react";
import { INITIAL_CTX } from "./constants";
import { StateCtx } from "./types";

export const MainContext = React.createContext<StateCtx>({
  ctx: INITIAL_CTX,
  setCtx: () => null,
});
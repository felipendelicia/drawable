import React from "react";
import { INITIAL_CTX } from "./constants";
import { Ctx, ICurrentTool, IElement, StateCtx } from "./types";

export const MainContext = React.createContext<StateCtx>({
  ctx: INITIAL_CTX,
  setCtx: () => null,
});

export const setTool = (ctx: Ctx, tool: ICurrentTool) => {
  return { ...ctx, currentTool: tool }
}

export const setElements = (ctx: Ctx, newElement: IElement) => {
  const newCtxElements = [...ctx.elements, newElement];
  return {...ctx, elements: newCtxElements}
}
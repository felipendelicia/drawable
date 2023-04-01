import React from "react";
import { INITIAL_CTX } from "./constants";
import { Ctx, ICurrentTool, StateCtx } from "./types";

export const MainContext = React.createContext<StateCtx>({
  ctx: INITIAL_CTX,
  setCtx: () => null,
});

export const setTool = (ctx: Ctx, tool: ICurrentTool) => {
  return { ...ctx, currentTool: tool };
};

export const setElements = (ctx: Ctx, newElement: any) => {
  const newCtxElements = [...ctx.elements, newElement];
  return { ...ctx, elements: newCtxElements };
};

export const popElement = (ctx: Ctx) => {
  const elementsCopy = ctx.elements;
  elementsCopy.pop();
  return { ...ctx, elements: elementsCopy };
};

export const cleanSelectedElements = (ctx: Ctx) => {
  return {
    selectedElements: [],
    currentTool: ctx.currentTool,
    elements: ctx.elements,
  };
};

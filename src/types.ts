import { Dispatch, ReactElement, SetStateAction } from "react";

export interface ICurrentTool {
    name: string,
    icon: ReactElement,
    func: { mainFunc: any, mouseDown: any, mouseMove: any, mouseUp: any },
}


export interface StateCtx {
    ctx: Ctx;
    setCtx: Dispatch<SetStateAction<Ctx>>
}

export interface Ctx {
    elements: any[],
    currentTool: ICurrentTool
}
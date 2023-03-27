import { Dispatch, ReactElement, SetStateAction } from "react";

export interface ICurrentTool {
    name: string,
    icon: ReactElement,
    func: any,
}


export interface StateCtx {
    ctx: Ctx;
    setCtx: Dispatch<SetStateAction<Ctx>>
}

export interface Ctx {
    elements: any[],
    currentTool: ICurrentTool
}
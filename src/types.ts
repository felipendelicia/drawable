import { Dispatch, ReactElement, SetStateAction } from "react";

export interface ICurrentTool {
    name: string,
    icon: ReactElement,
    class: any,
}


export interface StateCtx {
    ctx: Ctx;
    setCtx: Dispatch<SetStateAction<Ctx>>
}

export interface Ctx {
    elements: any[],
    currentTool: ICurrentTool
}

export interface ICoord {
    x: number,
    y: number
}
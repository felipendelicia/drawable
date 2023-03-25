import { Dispatch, ReactElement, SetStateAction } from "react";
import { Drawable } from "roughjs/bin/core";

export interface IElement {
    roughElement: Drawable;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface ICurrentTool {
    name: string,
    icon: ReactElement,
    func: (x1:number, y1:number, x2:number, y2:number) => IElement,
}


export interface StateCtx {
    ctx: Ctx;
    setCtx: Dispatch<SetStateAction<Ctx>>
}

export interface Ctx {
    elements: { roughElement: Drawable, x1: number, y1: number, x2: number, y2: number }[],
    currentTool: ICurrentTool
}
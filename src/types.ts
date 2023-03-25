import { Dispatch, SetStateAction } from "react";

export interface StateCtx {
    ctx: Ctx;
    setCtx: Dispatch<SetStateAction<Ctx>>
}

export interface Ctx {
    elements: never[],
}
import { Dispatch, SetStateAction } from "react";
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { setElements } from "../context";
import { Ctx } from "../types";

export interface IHandDrawElement {
    roughElement: Drawable;
    path: [[number]]
}

function createHandDraw( path:[[number, number]]) {
    const generator = new RoughGenerator()
    const roughElement = generator.linearPath(path)
    return { roughElement, path}

}

function MouseDown(x1: number, y1: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const element:IHandDrawElement = ctx.currentTool.func.mainFunc([[x1, y1]])
    setCtx(setElements(ctx, element))
}

function MouseMove(x2: number, y2: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const index = ctx.elements.length - 1
    const { path } = ctx.elements[index]
    const updatedElement = ctx.currentTool.func.mainFunc([...path, [x2, y2]])
    const elementsCopy = [...ctx.elements]
    elementsCopy[index] = updatedElement
    setCtx({ currentTool: ctx.currentTool, elements: elementsCopy })
}

function MouseUp() {

}

const handDraw = {
    mainFunc: createHandDraw,
    mouseDown: MouseDown,
    mouseMove: MouseMove,
    mouseUp: MouseUp
}

export default handDraw
import { RoughGenerator } from "roughjs/bin/generator"
import { setElements } from "../context"
import { Dispatch, SetStateAction } from "react"
import { Ctx } from "../types"
import { Drawable } from "roughjs/bin/core";

export interface IRectangleElement {
    roughElement: Drawable;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function createRectangle(x1: number, y1: number, x2: number, y2: number) {
    const generator = new RoughGenerator()
    const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1)
    return { x1, y1, x2, y2, roughElement }
}

function MouseDown(x1: number, y1: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const element: IRectangleElement = ctx.currentTool.func.mainFunc(x1, y1, x1, y1)
    setCtx(setElements(ctx, element))
}

function MouseMove(x2: number, y2: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const index = ctx.elements.length - 1
    const { x1, y1 } = ctx.elements[index]
    const updatedElement = ctx.currentTool.func.mainFunc(x1, y1, x2, y2)
    const elementsCopy = [...ctx.elements]
    elementsCopy[index] = updatedElement
    setCtx({ currentTool: ctx.currentTool, elements: elementsCopy })
}

function MouseUp() {

}

const rectangle = {
    mainFunc: createRectangle,
    mouseDown: MouseDown,
    mouseMove: MouseMove,
    mouseUp: MouseUp
}

export default rectangle
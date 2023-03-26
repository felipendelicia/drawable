import { Dispatch, SetStateAction } from "react"
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator"
import { setElements } from "../context"
import { Ctx } from "../types"

interface ILineElement {
    roughElement: Drawable;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function createLine(x1: number, y1: number, x2: number, y2: number) {
    const generator = new RoughGenerator()
    const roughElement = generator.line(x1, y1, x2, y2)
    return { x1, y1, x2, y2, roughElement }
}

function MouseDown(x1: number, y1: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const element: ILineElement = ctx.currentTool.func.mainFunc(x1, y1, x1, y1)
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

const line = {
    mainFunc: createLine,
    mouseDown: MouseDown,
    mouseMove: MouseMove,
    mouseUp: MouseUp
}

export default line
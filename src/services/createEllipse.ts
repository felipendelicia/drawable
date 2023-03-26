import { Dispatch, SetStateAction } from "react";
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { setElements } from "../context";
import { Ctx } from "../types";

export interface IEllipseElement {
    roughElement: Drawable;
    initialX: number;
    initialY: number;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
}

function createEllipse(centerX: number, centerY: number, width: number, height: number, initialX: number, initialY: number) {
    const generator = new RoughGenerator()
    const roughElement = generator.ellipse(centerX, centerY, width, height)
    return { initialX, initialY, centerX, centerY, width, height, roughElement }
}

function MouseDown(x1: number, y1: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const element: IEllipseElement = ctx.currentTool.func.mainFunc(x1, y1, 0, 0, x1, y1)
    setCtx(setElements(ctx, element))
}

function MouseMove(x2: number, y2: number, ctx: Ctx, setCtx: Dispatch<SetStateAction<Ctx>>) {
    const index = ctx.elements.length - 1
    const { initialX, initialY } = ctx.elements[index]
    const ellipse = {
        centerX: initialX + ((x2 - initialX) / 2),
        centerY: initialY + ((y2 - initialY) / 2),
        width: Math.abs(x2 - initialX),
        height: Math.abs(y2 - initialY)
    }
    const updatedElement = ctx.currentTool.func.mainFunc(ellipse.centerX, ellipse.centerY, ellipse.width, ellipse.height, initialX, initialY)
    const elementsCopy = [...ctx.elements]
    elementsCopy[index] = updatedElement
    setCtx({ currentTool: ctx.currentTool, elements: elementsCopy })
}

function MouseUp() {

}

const ellipse = {
    mainFunc: createEllipse,
    mouseDown: MouseDown,
    mouseMove: MouseMove,
    mouseUp: MouseUp
}

export default ellipse
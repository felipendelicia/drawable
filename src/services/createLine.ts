import { RoughGenerator } from "roughjs/bin/generator"

export function createLine(x1: number, y1: number, x2: number, y2: number) {
    const generator = new RoughGenerator()
    const roughElement = generator.line(x1, y1, x2, y2)
    return {x1, y1, x2, y2, roughElement}
}
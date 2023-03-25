import { RoughGenerator } from "roughjs/bin/generator"

export function createRectangle(x1: number, y1: number, x2: number, y2: number) {
    const generator = new RoughGenerator()
    const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1)
    return {x1, y1, x2, y2, roughElement}
}
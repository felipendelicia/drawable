import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ICoord } from "../types";
import DrawElement from "./Element";

class HandDraw extends DrawElement {
    path: [number, number][];
    element: { id: number, path: [number, number][], roughElement: Drawable }

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.path = [[this.initCoord.x, this.initCoord.y]];
        this.element = this.create(this.id, this.path)
    }

    create(id: number, path: [number, number][]) {
        const generator = new RoughGenerator()
        const roughElement = generator.linearPath(path)
        return { id, path, roughElement }
    }

    update(newCoord2: ICoord) {
        this.path = [...this.path, [newCoord2.x, newCoord2.y]]
        this.element = this.create(this.id, this.path)
    }
}

export default HandDraw
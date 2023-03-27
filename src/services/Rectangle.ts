import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ICoord } from "../types";
import DrawElement from "./Element";

class Rectangle extends DrawElement {
    coord2: ICoord;
    width: number;
    height: number;
    element: { id: number, initCoord: ICoord, width: number, height: number, roughElement: Drawable }

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.coord2 = initCoord;
        this.width = this.coord2.x - this.initCoord.x;
        this.height = this.coord2.y - this.initCoord.y;
        this.element = this.create(this.id, this.initCoord, this.width, this.height)
    }

    create(id: number, initCoord: ICoord, width: number, height: number) {
        const generator = new RoughGenerator()
        const roughElement = generator.rectangle(initCoord.x, initCoord.y, width, height)
        return { id, initCoord, width, height, roughElement }
    }

    update(newCoord2: ICoord) {
        this.coord2 = newCoord2
        this.width = this.coord2.x - this.initCoord.x;
        this.height = this.coord2.y - this.initCoord.y;
        this.element = this.create(this.id, this.initCoord, this.width, this.height)
    }
}

export default Rectangle
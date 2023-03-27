import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ICoord } from "../types";
import DrawElement from "./Element";

class Line extends DrawElement {
    coord2: ICoord;
    element: { id: number, initCoord: ICoord, coord2: ICoord, roughElement: Drawable }

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.coord2 = initCoord;
        this.element = this.create(this.id, this.initCoord, this.coord2)
    }

    create(id: number, initCoord:ICoord, coord2:ICoord) {
        const generator = new RoughGenerator()
        const roughElement = generator.line(initCoord.x, initCoord.y, coord2.x, coord2.y)
        return { id, initCoord, coord2, roughElement }
    }

    update(newCoord2: ICoord) {
        this.coord2 = newCoord2
        this.element = this.create(this.id, this.initCoord, this.coord2)
    }

}

export default Line
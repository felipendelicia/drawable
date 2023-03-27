import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ICoord } from "../types";
import DrawElement from "./Element";
import { distance } from "./getElementAtPosition";

class Line extends DrawElement {
    coord2: ICoord;
    element: { id: number, initCoord: ICoord, coord2: ICoord, roughElement: Drawable }

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.coord2 = initCoord;
        this.element = this.create(this.id, this.initCoord, this.coord2)
    }

    create(id: number, initCoord: ICoord, coord2: ICoord) {
        const generator = new RoughGenerator()
        const roughElement = generator.line(initCoord.x, initCoord.y, coord2.x, coord2.y)
        return { id, initCoord, coord2, roughElement }
    }

    update(newCoord2: ICoord) {
        this.coord2 = newCoord2
        this.element = this.create(this.id, this.initCoord, this.coord2)
    }

    isWithinElement(clickedCoord: ICoord) {
        const offset = distance(this.initCoord, this.coord2) - (distance(this.initCoord, clickedCoord) + distance(this.coord2, clickedCoord))
        return Math.abs(offset) < 1
    }

    move(moveCoord: ICoord) {
        const dx = moveCoord.x - this.initCoord.x;
        const dy = moveCoord.y - this.initCoord.y;
        this.coord2.x += dx;
        this.coord2.y += dy;
        this.initCoord.x += dx;
        this.initCoord.y += dy;
        this.element = this.create(this.id, this.initCoord, this.coord2);

    }
}

export default Line
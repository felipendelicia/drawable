import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ADMITED_OFFSET } from "../constants";
import { ICoord } from "../types";
import DrawElement from "./Element";

class Ellipse extends DrawElement {
    center: ICoord;
    width: number;
    height: number;
    element: { id: number, initCoord: ICoord, center: ICoord, width: number, height: number, roughElement: Drawable }

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.initCoord = initCoord;
        this.center = initCoord;
        this.width = 0;
        this.height = 0;
        this.element = this.create(this.id, this.center, this.width, this.height, this.initCoord)
    }

    create(id: number, center: ICoord, width: number, height: number, initCoord: ICoord) {
        const generator = new RoughGenerator()
        const roughElement = generator.ellipse(center.x, center.y, width, height)
        return { id, initCoord, center, width, height, roughElement }
    }

    update(newCoord2: ICoord) {
        const newCenter = {
            x: this.initCoord.x + ((newCoord2.x - this.initCoord.x) / 2),
            y: this.initCoord.y + ((newCoord2.y - this.initCoord.y) / 2)
        }
        this.width = Math.abs(newCoord2.x - this.initCoord.x);
        this.height = Math.abs(newCoord2.y - this.initCoord.y);
        this.center = newCenter
        this.element = this.create(this.id, newCenter, this.width, this.height, this.initCoord);
    }

    isWithinElement(clickedCoord: ICoord) {
        const offset = Math.pow(clickedCoord.x - this.center.x, 2) / Math.pow(this.width / 2, 2) + Math.pow(clickedCoord.y - this.center.y, 2) / Math.pow(this.height / 2, 2)
        return offset <= ADMITED_OFFSET
    }

    move(moveCoord: ICoord) {
        this.element = this.create(this.id, this.center, this.width, this.height, this.initCoord )
    }

}


export default Ellipse
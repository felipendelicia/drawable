import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { IBbox, ICoord } from "../types";
import DrawElement from "./Element";
import { distance } from "./getElementAtPosition";

class Line extends DrawElement {
    coord2: ICoord;
    element: { id: number, initCoord: ICoord, coord2: ICoord, roughElement: Drawable }
    bBox: IBbox

    constructor(id: number, initCoord: ICoord) {
        super(id, initCoord);
        this.coord2 = initCoord;
        this.element = this.create(this.id, this.initCoord, this.coord2)
        this.bBox = this.getBbox()
    }

    create(id: number, initCoord: ICoord, coord2: ICoord) {
        const generator = new RoughGenerator()
        const roughElement = generator.line(initCoord.x, initCoord.y, coord2.x, coord2.y)
        return { id, initCoord, coord2, roughElement }
    }

    update(newCoord2: ICoord) {
        this.coord2 = newCoord2
        this.element = this.create(this.id, this.initCoord, this.coord2)
        this.bBox = this.getBbox()
        return this.element
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
        this.bBox = this.getBbox()

    }

    getBbox() {
      let x1 = this.initCoord.x;
      let y1 = this.initCoord.y;
      let x2 = this.coord2.x;
      let y2 = this.coord2.y;
  
      if (x2 < x1) {
        const temp = x1;
        x1 = x2;
        x2 = temp;
      }
  
      if (y2 < y1) {
        const temp = y1;
        y1 = y2;
        y2 = temp;
      }
  
      const corners = [
        { x: x1, y: y1 }, // esquina superior izquierda
        { x: x2, y: y1 }, // esquina superior derecha
        { x: x2, y: y2 }, // esquina inferior derecha
        { x: x1, y: y2 }, // esquina inferior izquierda
      ];
      return { corners };
    }
}

export default Line
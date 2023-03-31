import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { ICoord } from "../types";
import DrawElement from "./Element";
import { distance } from "./getElementAtPosition";

class HandDraw extends DrawElement {
  path: [number, number][];
  element: { id: number; path: [number, number][]; roughElement: Drawable };

  constructor(id: number, initCoord: ICoord) {
    super(id, initCoord);
    this.path = [[this.initCoord.x, this.initCoord.y]];
    this.element = this.create(this.id, this.path);
  }

  create(id: number, path: [number, number][]) {
    const generator = new RoughGenerator();
    const roughElement = generator.linearPath(path);
    return { id, path, roughElement };
  }

  update(newCoord2: ICoord) {
    this.path = [...this.path, [newCoord2.x, newCoord2.y]];
    this.element = this.create(this.id, this.path);
  }

  isWithinElement(clickedCoord: ICoord) {
    for (let i = 0; i < this.path.length - 1; i++) {
      let x1 = this.path[i][0];
      let y1 = this.path[i][1];
      let x2 = this.path[i + 1][0];
      let y2 = this.path[i + 1][1];

      // let distancia = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

      let distancia =
        distance({ x: x1, y: y1 }, { x: x2, y: y2 }) -
        (distance({ x: x1, y: y1 }, clickedCoord) +
          distance({ x: x2, y: y2 }, clickedCoord));

      if (Math.abs(distancia) <= 2) return true;
    }
    return false;
  }

  move(moveCoord: ICoord) {
    const dx = moveCoord.x - this.initCoord.x;
    const dy = moveCoord.y - this.initCoord.y;

    this.path = this.path.map(([x, y]) => [x + dx, y + dy]);
    this.initCoord.x += dx;
    this.initCoord.y += dy;
    this.element = this.create(this.id, this.path);
  }
}

export default HandDraw;

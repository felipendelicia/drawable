import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { IBbox, ICoord } from "../types";
import DrawElement from "./Element";
import { distance } from "./getElementAtPosition";

class HandDraw extends DrawElement {
  path: [number, number][];
  element: { id: number; path: [number, number][]; roughElement: Drawable };
  bBox: IBbox;

  constructor(id: number, initCoord: ICoord) {
    super(id, initCoord);
    this.path = [[this.initCoord.x, this.initCoord.y]];
    this.element = this.create(this.id, this.path);
    this.bBox = this.getBbox();
  }

  create(id: number, path: [number, number][]) {
    const generator = new RoughGenerator();
    const roughElement = generator.linearPath(path);
    return { id, path, roughElement };
  }

  update(newCoord2: ICoord) {
    this.path = [...this.path, [newCoord2.x, newCoord2.y]];
    this.element = this.create(this.id, this.path);
    this.bBox = this.getBbox();
    return this.element
  }

  isWithinElement(clickedCoord: ICoord) {
    for (let i = 0; i < this.path.length - 1; i++) {
      let x1 = this.path[i][0];
      let y1 = this.path[i][1];
      let x2 = this.path[i + 1][0];
      let y2 = this.path[i + 1][1];

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
    this.bBox = this.getBbox();
  }

  getBbox() {
    let minusX = this.path[0][0];
    let maxX = this.path[0][0];
    let minusY = this.path[0][1];
    let maxY = this.path[0][1];

    for (let i = 0; i < this.path.length; i++) {
      const actualX = this.path[i][0]
      const actualY = this.path[i][1]

      if (actualX < minusX) minusX = actualX
      else if (actualX > maxX) maxX = actualX

      if (actualY < minusY) minusY = actualY
      else if (actualY > maxY) maxY = actualY
    }

    return {
      corners: [
        { x: minusX, y: minusY },
        { x: minusX, y: maxY },
        { x: maxX, y: minusY },
        { x: maxX, y: maxY },
      ],
    };
  }
}

export default HandDraw;

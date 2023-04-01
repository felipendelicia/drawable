import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { IBbox, ICoord } from "../types";
import DrawElement from "./Element";

class Rectangle extends DrawElement {
  coord2: ICoord;
  width: number;
  height: number;
  element: {
    id: number;
    initCoord: ICoord;
    width: number;
    height: number;
    roughElement: Drawable;
  };
  bBox: IBbox;

  constructor(id: number, initCoord: ICoord) {
    super(id, initCoord);
    this.coord2 = initCoord;
    this.width = this.coord2.x - this.initCoord.x;
    this.height = this.coord2.y - this.initCoord.y;
    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height
    );
    this.bBox = this.getBbox();
  }

  create(id: number, initCoord: ICoord, width: number, height: number) {
    const generator = new RoughGenerator();
    const roughElement = generator.rectangle(
      initCoord.x,
      initCoord.y,
      width,
      height
    );
    return { id, initCoord, width, height, roughElement };
  }

  update(newCoord2: ICoord) {
    this.coord2 = newCoord2;
    this.width = this.coord2.x - this.initCoord.x;
    this.height = this.coord2.y - this.initCoord.y;
    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height
    );
    this.bBox = this.getBbox();
    return this.element;
  }

  isWithinElement(clickedCoord: ICoord) {
    const minX = Math.min(this.initCoord.x, this.coord2.x);
    const maxX = Math.max(this.initCoord.x, this.coord2.x);
    const minY = Math.min(this.initCoord.y, this.coord2.y);
    const maxY = Math.max(this.initCoord.y, this.coord2.y);
    return (
      clickedCoord.x >= minX &&
      clickedCoord.x <= maxX &&
      clickedCoord.y >= minY &&
      clickedCoord.y <= maxY
    );
  }

  move(moveCoord: ICoord) {
    this.initCoord = moveCoord;
    const newCoord2 = {
      x: this.width + moveCoord.x,
      y: this.height + moveCoord.y,
    };
    this.coord2 = newCoord2;
    this.width = this.coord2.x - this.initCoord.x;
    this.height = this.coord2.y - this.initCoord.y;
    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height
    );
    this.bBox = this.getBbox();
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

  getElement() {
    return {
      id: this.id,
      initCoord: this.initCoord,
      coord2: this.coord2,
      width: this.width,
      height: this.height,
      element: this.element,
      bBox: this.bBox,
    };
  }
}

export default Rectangle;

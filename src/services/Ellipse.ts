import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { IBbox, ICoord } from "../types";
import DrawElement from "./Element";

class Ellipse extends DrawElement {
  cornerCoord: ICoord;
  width: number;
  height: number;
  element: {
    id: number;
    cornerCoord: ICoord;
    initCoord: ICoord;
    width: number;
    height: number;
    roughElement: Drawable;
  };
  bBox: IBbox

  constructor(id: number, initCoord: ICoord) {
    super(id, initCoord);
    this.cornerCoord = initCoord;
    this.initCoord = initCoord;
    this.width = 0;
    this.height = 0;
    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height,
      this.cornerCoord
    );
    this.bBox = this.getBbox()
  }

  create(
    id: number,
    initCoord: ICoord,
    width: number,
    height: number,
    cornerCoord: ICoord
  ) {
    const generator = new RoughGenerator();
    const roughElement = generator.ellipse(
      initCoord.x,
      initCoord.y,
      width,
      height
    );
    return { id, cornerCoord, initCoord, width, height, roughElement };
  }

  update(newCoord2: ICoord) {
    const newCenter = {
      x: this.cornerCoord.x + (newCoord2.x - this.initCoord.x) / 2,
      y: this.cornerCoord.y + (newCoord2.y - this.initCoord.y) / 2,
    };
    this.width = Math.abs(newCoord2.x - this.cornerCoord.x);
    this.height = Math.abs(newCoord2.y - this.cornerCoord.y);
    this.initCoord = newCenter;
    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height,
      this.cornerCoord
    );
    this.bBox = this.getBbox()
    return this.element
  }

  isWithinElement(clickedCoord: ICoord) {
    const offset =
      Math.pow(clickedCoord.x - this.initCoord.x, 2) /
        Math.pow(this.width / 2, 2) +
      Math.pow(clickedCoord.y - this.initCoord.y, 2) /
        Math.pow(this.height / 2, 2);
    return offset <= 1;
  }

  move(moveCoord: ICoord) {
    this.cornerCoord = moveCoord;
    const newCenter = {
      x: moveCoord.x,
      y: moveCoord.y,
    };
    this.initCoord = newCenter;

    this.element = this.create(
      this.id,
      this.initCoord,
      this.width,
      this.height,
      this.cornerCoord
    );
    this.bBox = this.getBbox()
  }

  getBbox() {
    const radioW = this.width / 2;
    const radioH = this.height / 2;
    const corners = []
    corners.push({x: this.initCoord.x + radioW, y: this.initCoord.y + radioH})
    corners.push({x: this.initCoord.x + radioW, y: this.initCoord.y - radioH})
    corners.push({x: this.initCoord.x - radioW, y: this.initCoord.y + radioH})
    corners.push({x: this.initCoord.x - radioW, y: this.initCoord.y - radioH})
    return {corners}
  }
}

export default Ellipse;

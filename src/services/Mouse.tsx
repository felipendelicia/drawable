import { Dispatch, SetStateAction } from "react";
import { Ctx } from "../types";

class CanvasMouseController {
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  ctx: Ctx;
  setCtx: Dispatch<SetStateAction<Ctx>>;

  constructor(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    ctx: Ctx,
    setCtx: Dispatch<SetStateAction<Ctx>>
  ) {
    this.event = event;
    this.ctx = ctx;
    this.setCtx = setCtx;
  }

  down() {}
  move(action: string) {
    if (action === "drawing") {
    } else if (action === "selecting") {
    }
  }
  up() {}
}

export default CanvasMouseController;

import { useContext, useEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { MainContext, setElements } from "../../context";
import { IElement } from "../../types";
import { CanvasRoot } from "./components";

export default function Canvas() {
  const { ctx, setCtx } = useContext(MainContext)
  const canvas = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (canvas.current) {
      const canvasCtx = canvas.current.getContext("2d");
      canvasCtx?.clearRect(0, 0, canvas.current.width, canvas.current.height)

      const roughCanvas = new RoughCanvas(canvas.current)

      ctx.elements.forEach(({roughElement}) => {
        roughCanvas.draw(roughElement)
      })
    }
  }, [ctx]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);
    const { clientX, clientY } = event

    const element: IElement = ctx.currentTool.func(clientX, clientY, clientX, clientY);
    setCtx(setElements(ctx, element))
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;
    const { clientX, clientY } = event
    const index = ctx.elements.length - 1
    const { x1, y1 } = ctx.elements[index]
    const updatedElement = ctx.currentTool.func(x1, y1, clientX, clientY)
    const elementsCopy = [...ctx.elements]
    elementsCopy[index] = updatedElement
    setCtx({currentTool:ctx.currentTool, elements:elementsCopy})
  };

  const handleMouseUp = () => {
    setIsDrawing(false)
  };

  return (
    <CanvasRoot
      id="canvas"
      ref={canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      Canvas
    </CanvasRoot>
  );
}

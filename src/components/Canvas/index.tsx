import { useContext, useEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { MainContext } from "../../context";
import { getElementAtPosition } from "../../services/getElementAtPosition";
import { CanvasRoot } from "./components";
import { IAction } from "./types";

export default function Canvas() {
  const { ctx, setCtx } = useContext(MainContext)
  const canvas = useRef<HTMLCanvasElement>(null);
  const [action, setAction] = useState<IAction>('none');

  useEffect(() => {
    if (canvas.current) {
      const canvasCtx = canvas.current.getContext("2d");
      canvasCtx?.clearRect(0, 0, canvas.current.width, canvas.current.height)

      const roughCanvas = new RoughCanvas(canvas.current)

      ctx.elements.forEach(({ roughElement }) => {
        roughCanvas.draw(roughElement)
      })
    }
  }, [ctx]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event
    if (ctx.currentTool.name === 'selection') {
      // if we are selecting => setAction('selection')
      const element = getElementAtPosition(clientX, clientY, ctx.elements)
      if (element) setAction('selection')
    } else {
      ctx.currentTool.func.mouseDown(clientX, clientY, ctx, setCtx)
      setAction('drawing');
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (action !== 'drawing') return;
    const { clientX, clientY } = event
    ctx.currentTool.func.mouseMove(clientX, clientY, ctx, setCtx)
  };

  const handleMouseUp = () => {
    setAction('none')
  };

  return (
    <CanvasRoot
      id="canvas"
      ref={canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={window.innerWidth}
      height={window.innerHeight - 20}
    >
      Canvas
    </CanvasRoot>
  );
}

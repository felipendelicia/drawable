import { useContext, useEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { MainContext, setElements } from "../../context";
import { getElementAtPosition } from "../../services/getElementAtPosition";
import { CanvasRoot } from "./components";
import { IAction } from "./types";

export default function Canvas() {
  const { ctx, setCtx } = useContext(MainContext)

  const canvas = useRef<HTMLCanvasElement>(null);

  const [action, setAction] = useState<IAction>('none');
  const [selectedElements, setSelectedElements] = useState<any>(null);

  useEffect(() => {
    if (canvas.current) {
      const canvasCtx = canvas.current.getContext("2d");
      canvasCtx?.clearRect(0, 0, canvas.current.width, canvas.current.height)

      const roughCanvas = new RoughCanvas(canvas.current)

      ctx.elements.forEach(({ element }) => {
        roughCanvas.draw(element.roughElement)
      })
    }
  }, [ctx]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event
    if (ctx.currentTool.name === 'selection') {

      const element = getElementAtPosition({ x: clientX, y: clientY }, ctx.elements)

      if (element) {

        const offset = {
          x: clientX - element.initCoord.x,
          y: clientY - element.initCoord.y,
        } 

        setSelectedElements({ element, offset })
        setAction('moving')

      } else {
        setAction('selecting')

      }

    } else {
      const id = ctx.elements.length
      const element = new ctx.currentTool.class(id, { x: clientX, y: clientY })
      setCtx(setElements(ctx, element))
      setAction('drawing');

    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event
    if (action === 'drawing') {

      const index = ctx.elements.length - 1
      const element = ctx.elements[index]
      element.update({ x: clientX, y: clientY })
      const elementsCopy = [...ctx.elements]
      elementsCopy[index] = element
      setCtx({ currentTool: ctx.currentTool, elements: elementsCopy })

    } else if (action === 'moving') {

      const index = selectedElements.length - 1

      const correctedOffset = {
        x: clientX - selectedElements.offset.x,
        y: clientY - selectedElements.offset.y,
      }

      selectedElements.element.move(correctedOffset)

      const elementsCopy = [...ctx.elements]
      elementsCopy[index] = selectedElements
      setCtx({ currentTool: ctx.currentTool, elements: elementsCopy })

    } else if (action === 'selecting') {


    }
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
      height={window.innerHeight - 10}
    >
      Canvas
    </CanvasRoot>
  );
}

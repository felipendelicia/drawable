import { useContext, useEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { cleanSelectedElements, MainContext, setElements } from "../../context";
import { getElementAtPosition } from "../../services/getElementAtPosition";
import { isPointInsideRectangle } from "../../services/isPointInsideRectangle";
import Rectangle from "../../services/Rectangle";
import { CanvasRoot } from "./components";
import { IAction } from "./types";

export default function Canvas() {
  const { ctx, setCtx } = useContext(MainContext);

  const canvas = useRef<HTMLCanvasElement>(null);

  const [action, setAction] = useState<IAction>("none");
  const [selectingRectangle, setSelectingRectangle] = useState<any>(null);
  const [movingMouse, setMovingMouse] = useState(false);
  const [offset, setOffset] = useState<any>();

  useEffect(() => {
    if (canvas.current) {
      const canvasCtx = canvas.current.getContext("2d");
      canvasCtx?.clearRect(0, 0, canvas.current.width, canvas.current.height);

      const roughCanvas = new RoughCanvas(canvas.current);

      ctx.elements.forEach(({ element }) => {
        roughCanvas.draw(element.roughElement);
      });

      if (selectingRectangle) {
        roughCanvas.draw(selectingRectangle.element.roughElement);
      }
    }
  }, [ctx, selectingRectangle]);

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    if (ctx.currentTool.name === "selection" && !movingMouse) {
      const element = getElementAtPosition(
        { x: clientX, y: clientY },
        ctx.elements
      );
      if (element) {
        setCtx({ ...ctx, selectedElements: [element] });
        setAction("selected");
      } else {
        setCtx(cleanSelectedElements(ctx));
        setAction("none");
      }
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    if (ctx.currentTool.name === "selection") {
      const element = getElementAtPosition(
        { x: clientX, y: clientY },
        ctx.elements
      );

      if (element) {
        const off = {
          x: clientX - element.initCoord.x,
          y: clientY - element.initCoord.y,
        };
        setOffset(off);
        setAction("moving");
      } else {
        const rectangle = new Rectangle(0, { x: clientX, y: clientY });
        setSelectingRectangle(rectangle);
        setAction("selecting");
      }
    } else {
      const id = ctx.elements.length;
      const initCoords = {
        x: clientX,
        y: clientY,
      };
      const element = new ctx.currentTool.class(id, initCoords);
      setCtx(setElements(ctx, element));
      setAction("drawing");
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    if (action === "drawing") {
      const index = ctx.elements.length - 1;
      const element = ctx.elements[index];
      element.update({ x: clientX, y: clientY });
      const elementsCopy = [...ctx.elements];
      elementsCopy[index] = element;
      setCtx({
        selectedElements: ctx.selectedElements,
        currentTool: ctx.currentTool,
        elements: elementsCopy,
      });
    } else if (action === "moving") {

      for(let i =0; i < ctx.selectedElements.length; i++){
        const selectedElement = ctx.selectedElements[i]
        console.log(selectedElement)
        const correctedOffset = {
          x: clientX - offset.x,
          y: clientY - offset.y,
        };

        selectedElement.element.move(correctedOffset);
      }
    } else if (action === "selecting") {
      setMovingMouse(true);
      const newRectangle = new Rectangle(0, selectingRectangle.initCoord);
      newRectangle.update({ x: clientX, y: clientY });
      setSelectingRectangle(newRectangle);
    }
  };

  const handleMouseUp = () => {
    if (action === "selecting") {
      let selected = [];
      const rectanglebBox = selectingRectangle.bBox;

      for (let element = 0; element < ctx.elements.length; element++) {
        const currentElement = ctx.elements[element];
        let isIn = true;

        for (let point = 0; point < 4; point++) {
          let isInPoint = isPointInsideRectangle(
            currentElement.bBox.corners[point],
            rectanglebBox
          );
          if (!isInPoint) {
            isIn = false;
            break;
          }
        }

        if (isIn) {
          selected.push(currentElement);
        }
      }

      setCtx({
        currentTool: ctx.currentTool,
        elements: ctx.elements,
        selectedElements: selected,
      });

      if (selected.length > 0) setAction("selected");
      else setAction("none");

      setSelectingRectangle(null);
      setTimeout(() => setMovingMouse(false), 100);
    } else {
      setAction("none");
    }
  };

  return (
    <CanvasRoot
      id="canvas"
      ref={canvas}
      onClick={handleClick}
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

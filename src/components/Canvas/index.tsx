import { useEffect, useRef, useState } from "react";
import { CanvasRoot } from "./components";

export default function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
    }
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);
  };
  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;
    const {clientX, clientY} = event
    console.log(clientX, clientY)
  };
  const handleMouseUp = () => {
    setIsDrawing(false)
  };

  return (
    <CanvasRoot
      id="canvas"
      ref={canvas}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Canvas
    </CanvasRoot>
  );
}

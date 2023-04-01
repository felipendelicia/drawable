import { IBbox, ICoord } from "../types";

export function isPointInsideRectangle(point: ICoord, rectangleBBox: IBbox) {
  // Extraer coordenadas x e y del punto
  const { x: pointX, y: pointY } = point;

  // Extraer las cuatro esquinas del rectángulo
  const [corner1, corner2, corner3, corner4] = rectangleBBox.corners;

  // Verificar si el punto se encuentra dentro del rectángulo
  const isInside =
    isPointInsideTriangle(
      pointX,
      pointY,
      corner1.x,
      corner1.y,
      corner2.x,
      corner2.y,
      corner3.x,
      corner3.y
    ) ||
    isPointInsideTriangle(
      pointX,
      pointY,
      corner1.x,
      corner1.y,
      corner4.x,
      corner4.y,
      corner3.x,
      corner3.y
    );

  return isInside;
}

function isPointInsideTriangle(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  // Calcular áreas de tres sub-triángulos formados por el punto y los tres vértices del triángulo principal
  const area1 = getTriangleArea(px, py, x1, y1, x2, y2);
  const area2 = getTriangleArea(px, py, x2, y2, x3, y3);
  const area3 = getTriangleArea(px, py, x1, y1, x3, y3);

  // Calcular el área total del triángulo
  const totalArea = getTriangleArea(x1, y1, x2, y2, x3, y3);

  // Verificar si el punto se encuentra dentro del triángulo
  return Math.abs(totalArea - (area1 + area2 + area3)) < 0.0001;
}

function getTriangleArea(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  // Calcular el área de un triángulo usando la fórmula de Herón
  const a = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const b = Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2);
  const c = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2);
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return area;
}

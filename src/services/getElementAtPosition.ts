import { ADMITED_OFFSET } from "../constants";

const distance = (a: { x: number, y: number }, b: { x: number, y: number }) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

export function isWithinElement(x: number, y: number, element: any) {
    const { shape } = element.roughElement;
    console.log(shape)
    if (shape === 'rectangle') {
        const { x1, x2, y1, y2 } = element
        const minX = Math.min(x1, x2)
        const maxX = Math.max(x1, x2)
        const minY = Math.min(y1, y2)
        const maxY = Math.max(y1, y2)
        return x >= minX && x <= maxX && y >= minY && y <= maxY
    } else if (shape === 'line') {
        const { x1, x2, y1, y2 } = element
        const a = { x: x1, y: y1 }
        const b = { x: x2, y: y2 }
        const c = { x, y }
        const offset = distance(a, b) - (distance(a, c) + distance(b, c))
        return Math.abs(offset) < 1
    } else if (shape === 'ellipse') {
        const { centerX, centerY, width, height } = element
        const offset = Math.pow(x - centerX, 2) / Math.pow(width / 2, 2) + Math.pow(y - centerY, 2) / Math.pow(height / 2, 2)
        return offset <= ADMITED_OFFSET
    } else if (shape === 'linearPath') {
        const { path } = element
        for (let i = 0; i < path.length - 1; i++) {
            let x1 = path[i][0];
            let y1 = path[i][1];
            let x2 = path[i + 1][0];
            let y2 = path[i + 1][1];

            // let distancia = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

            let distancia = distance({ x: x1, y: y1 }, { x: x2, y: y2 }) - (distance({ x: x1, y: y1 }, { x, y }) + distance({ x: x2, y: y2 }, { x, y }))

            if (Math.abs(distancia) <= ADMITED_OFFSET) return true

        }
        return false
    }
}

export function getElementAtPosition(x: number, y: number, elements: any[]) {
    return elements.find(element => isWithinElement(x, y, element))
}
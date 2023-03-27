import { ICoord } from "../types"

export const distance = (a: { x: number, y: number }, b: { x: number, y: number }) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

export function isWithinElement(clickedCoord: ICoord, element: any) {
    return element.isWithinElement(clickedCoord)
}

export function getElementAtPosition(clickedCoord: ICoord, elements: any[]) {
    return elements.find(element => isWithinElement(clickedCoord, element))
}
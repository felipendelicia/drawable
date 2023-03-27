import { ICoord } from "../types";

class DrawElement {
    id: number;
    initCoord: ICoord;

    constructor(id: number, initCoord: ICoord) {
        this.id = id;
        this.initCoord = initCoord;
    }
}

export default DrawElement
import { faLinesLeaning, faPencil, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import handDraw from "../services/createHandDraw"
import line from "../services/createLine"
import rectangle from "../services/createRectangle"

const tools = [
    {
        name: 'handdraw',
        icon: <FontAwesomeIcon icon={faPencil}/>,
        func: handDraw
    },
    {
        name: 'line',
        icon: <FontAwesomeIcon icon={faLinesLeaning}/>,
        func: line
    },
    {
        name: 'rectangle',
        icon: <FontAwesomeIcon icon={faSquare}/>,
        func: rectangle
    },
    
]

export default tools
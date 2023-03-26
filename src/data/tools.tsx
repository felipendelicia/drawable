import { faCircle, faLinesLeaning, faPencil, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ellipse from "../services/createEllipse"
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
    {
        name: 'ellipse',
        icon: <FontAwesomeIcon icon={faCircle}/>,
        func: ellipse
    }
    
]

export default tools
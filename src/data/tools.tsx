import { faCircle, faLinesLeaning, faMousePointer, faPencil, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Ellipse from "../services/Ellipse"
import HandDraw from "../services/HandDraw"
import Line from "../services/Line"
import Rectangle from "../services/Rectangle"

const tools = [
    {
        name: 'selection',
        icon: <FontAwesomeIcon icon={faMousePointer}/>,
        class: null
    },
    {
        name: 'handdraw',
        icon: <FontAwesomeIcon icon={faPencil}/>,
        class: HandDraw
    },
    {
        name: 'line',
        icon: <FontAwesomeIcon icon={faLinesLeaning}/>,
        class: Line
    },
    {
        name: 'rectangle',
        icon: <FontAwesomeIcon icon={faSquare}/>,
        class: Rectangle
    },
    {
        name: 'ellipse',
        icon: <FontAwesomeIcon icon={faCircle}/>,
        class: Ellipse
    }
    
]

export default tools
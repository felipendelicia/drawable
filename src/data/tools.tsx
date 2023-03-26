import { faLinesLeaning, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createLine } from "../services/createLine"
import { createRectangle } from "../services/createRectangle"

const tools = [
    {
        name: 'line',
        icon: <FontAwesomeIcon icon={faLinesLeaning}/>,
        func: createLine
    },
    {
        name: 'rectangle',
        icon: <FontAwesomeIcon icon={faSquare}/>,
        func: createRectangle
    }
]

export default tools
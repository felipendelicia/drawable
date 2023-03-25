import { faLinesLeaning, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const tools = [
    {
        name: 'line',
        icon: <FontAwesomeIcon icon={faLinesLeaning}/>
    },
    {
        name: 'rectangle',
        icon: <FontAwesomeIcon icon={faSquare}/>
    }
]

export default tools
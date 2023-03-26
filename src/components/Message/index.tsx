import styled from "styled-components";

interface IMessage {
    message: string,
}

const Message = styled.p<IMessage>`
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 1em;
    z-index: 1000;
    color: #5f5f5f;
    font-family: sans-serif;

    &::before{
        content: "${props => props.message ? props.message : ''}"
    }
`

export default Message
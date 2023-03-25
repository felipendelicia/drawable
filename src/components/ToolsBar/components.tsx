import styled from "styled-components";
import theme from "../../data/theme";
import { ITool } from "./types";

export const Container = styled.div`
    position: fixed;
    bottom: 1em;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Root = styled.div`
    padding: 10px 20px;
    border-radius: ${theme.borderRadius};
    background-color: #8b8b8b;
    display: flex;
    justify-content: center;
    gap: 1em;
`

export const Tool = styled.p<ITool>`
    padding: 5px 40px;
    border-radius: ${theme.borderRadius};
    font-size: 1.5em;
    background-color: ${props => props.active ? '#c2c2c2' : null};
`
import styled from "styled-components";
import theme from "../../data/theme";
import { ITool } from "./types";

export const Container = styled.div`
  background-color: #000000;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

export const Tool = styled.p<ITool>`
  color: #fff;
  padding: 5px 30px;
  border-radius: ${theme.borderRadius};
  font-size: 1.5em;
  border: ${(props) => (props.active ? "1px solid #c2c2c2" : null)};
`;

import { useContext } from "react";
import { setTool, MainContext } from "../../context";
import tools from "../../data/tools";
import { ICurrentTool } from "../../types";
import { Container, Root, Tool } from "./components";

export default function ToolBar() {

  const { ctx, setCtx } = useContext(MainContext)

  const handleClick = (tool: ICurrentTool) => {
    setCtx(setTool(ctx, tool))
  }

  return (
    <Container>
      <Root>
        {
          tools.map((tool, i) => {
            return (
              <Tool key={i} active={tool.name === ctx.currentTool.name} onClick={() => handleClick(tool)}>{tool.icon}</Tool>
            )
          })
        }
      </Root>
    </Container>
  )
}

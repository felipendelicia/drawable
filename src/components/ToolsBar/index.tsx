import tools from "../../data/tools";
import { Container, Root, Tool } from "./components";

export default function ToolBar() {
  return (
    <Container>
      <Root>
        {
          tools.map((tool, i) => {
            return (
              <Tool key={i} id={tool.name}>{tool.icon}</Tool>
            )
          })
        }
      </Root>
    </Container>
  )
}

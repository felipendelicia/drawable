import { useState } from "react";
import Canvas from "./components/Canvas";
import ToolBar from "./components/ToolsBar";
import { INITIAL_CTX } from "./constants";
import { MainContext } from "./context";
import { Ctx } from "./types";

function App() {
  const [ctx, setCtx] = useState<Ctx>(INITIAL_CTX)
  return (
    <MainContext.Provider value={{ ctx, setCtx }}>
      <div className="App">
        <Canvas />
        <ToolBar />
      </div>
    </MainContext.Provider>
  );
}

export default App;

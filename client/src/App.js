import "./App.css";
import CodeEditorPage from "./pages/CodeEditorPage";
import EditorPage from "./pages/EditorPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/editorPage" element={<EditorPage />} />
          <Route path="/codeEditorPage" element={<CodeEditorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

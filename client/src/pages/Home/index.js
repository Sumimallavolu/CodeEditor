import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/editorPage")}>Editor Page</button>
      <button onClick={() => navigate("/codeEditorPage")}>
        {" "}
        Code Editor Page
      </button>
    </div>
  );
}

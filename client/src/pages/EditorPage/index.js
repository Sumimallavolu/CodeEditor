import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./styles.css";
import DownloadImage from "../../assets/icons/download.svg";

const files = {
  js: {
    name: "script.js",
    language: "javascript",
  },
  css: {
    name: "style.css",
    language: "css",
  },
  html: {
    name: "index.html",
    language: "html",
  },
};
const EditorPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState();
  const [fileName, setFileName] = useState("js");
  const [isDisabled, setisDisabled] = useState(false);
  const file = files[fileName];

  const handleCodeChange = (value) => {
    setValues(value);
    setisDisabled(false);
  };
  const handleSaveClick = () => {
    try {
      localStorage.setItem(`${file.name}`, values);
      window.alert(`code saved in  ${file.name}`);
      setisDisabled(true);
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };
  const handleResetClick = () => {
    try {
      localStorage.removeItem(`${file.name}`);
      setValues("");
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };

  const handledownloadFile = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${file.name}`;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const items = localStorage.getItem(`${file.name}`);
    setValues(items);
  }, [file.name]);

  return (
    <div>
      <div className="header-container">
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          GoBack
        </button>
        <div className="header"> TEXT EDITOR PAGE</div>
      </div>
      <div className="editor-main">
        <div>
          <Editor
            height="92vh"
            width="1400px"
            className=""
            theme="vs-dark"
            value={values}
            path={file.name}
            defaultLanguage={file.language}
            defaultValue="// Hello Dev!  Happy Hacking"
            onChange={handleCodeChange}
          />
        </div>
        <div className="buttons-container">
          <div onClick={()=>{handledownloadFile(values)}}>
            <img src={DownloadImage} className="image" alt="Download" />
          </div>
          <div>
            <button
              disabled={fileName === "js"}
              onClick={() => setFileName("js")}
              className="buttons"
            >
              javascript
            </button>
          </div>
          <div>
            <button
              className="buttons"
              disabled={fileName === "css"}
              onClick={() => setFileName("css")}
            >
              CSS
            </button>
          </div>
          <div>
            <button
              className="buttons"
              disabled={fileName === "html"}
              onClick={() => setFileName("html")}
            >
              HTML
            </button>
          </div>
          <div>
            <button className="buttons" onClick={handleResetClick}>
              Reset
            </button>
          </div>
          <div>
            <button
              disabled={
                values === localStorage.getItem(`${file.name}`) || isDisabled
              }
              className="buttons"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditorPage;

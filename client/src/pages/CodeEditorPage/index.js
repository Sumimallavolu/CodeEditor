import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "./styles.css";
import DownloadImage from "../../assets/icons/download.svg";
import axios from "axios";
import { saveAs } from "file-saver";

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
const CodeEditorPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState();
  const [isDisabled, setisDisabled] = useState(false);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  function compile() {
    setLoading(true);
    if (values === ``) {
      return;
    }
    axios
      .post(`http://localhost:8000/compile`, {
        code: values,
        language: "JavaScript",
      })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  const handleCodeChange = (value) => {
    setValues(value);
    setisDisabled(false);
  };

  function clearOutput() {
    setUserOutput("");
  }
  const options = {
    fontSize: fontSize,
  };

  useEffect(() => {
    console.log("userOutput", userOutput);
  }, [userOutput]);

  const handleSaveClick = () => {
    try {
      localStorage.setItem("index.js", values);
      window.alert("code saved in index.js");
      setisDisabled(true);
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };

  const handleResetClick = () => {
    try {
      localStorage.removeItem("index.js");
      setValues("");
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };

  const handledownloadFile = (text) => {
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "myFile.js");
  };
  useEffect(() => {
    const items = localStorage.getItem("index.js");
    setValues(items);
  }, []);

  return (
    <div>
      <div className="editor-main-page">
        <div className="header-container-page">
          <div>
            <button
              className="buttons"
              onClick={() => {
                navigate("/home");
              }}
            >
              GoBack
            </button>
          </div>
          <div>
            <div>
              <div className="header"> CODE EDITOR PAGE</div>
            </div>
          </div>
          <div className="buttons-container-page">
            <div>
              <label>Font Size</label>
              <input
                type="range"
                min="18"
                max="30"
                value={fontSize}
                step="2"
                onChange={(e) => {
                  setFontSize(e.target.value);
                }}
              />
            </div>
            <div
              onClick={() => {
                handledownloadFile(values);
              }}
            >
              <img src={DownloadImage} className="image" alt="Download" />
            </div>

            <div>
              <button className="buttons" onClick={handleResetClick}>
                Reset
              </button>
            </div>
            <div>
              <button
                disabled={
                  values === localStorage.getItem("index.js") || isDisabled
                }
                className="buttons"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
            <div>
              <button className="buttons" onClick={() => compile()}>
                Run
              </button>
            </div>
          </div>
        </div>
        <div className="editors">
          <div className="input-container">
            <Editor
              options={options}
              height="92vh"
              width="100%"
              className=""
              theme="vs-dark"
              value={values}
              language="javaScript"
              path="index.js"
              defaultValue="// Hello Dev!  Happy Hacking"
              onChange={handleCodeChange}
            />
          </div>
          <div className="output-box">
            <div>
              <h3>Output:</h3>

              {loading ? (
                <div className="spinner-box">
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      clearOutput();
                    }}
                    className="clear-btn"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div>
              <p>{userOutput}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodeEditorPage;

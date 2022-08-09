import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";
import { myContext } from "../../Context";

const Create = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("private");
  const [editor, setEditor] = useState();
  const navigate = useNavigate();

  const userObject = useContext(myContext);
  const googleId = userObject.googleId;

  const username = userObject.username;

  useEffect(() => {
    setEditor(
      new EditorJS({
        tools: EDITOR_JS_TOOLS,
        holder: "editorjs",
        logLevel: "ERROR",
        // data: DEFAULT_INITIAL_DATA,
        autofocus: false,
        // onReady: () => {
        //   console.log("Editor.js is ready to work!");
        // },
      })
    );
    return;
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    editor.save().then(async (content) => {
      await fetch("https://sanskrit-literature-cms.herokuapp.com/text/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleId, username, title, status, content }),
      });
    });
    navigate("/dashboard");
  }

  return (
    <Container>
      <h3 className="mt-5">Create</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mt-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Type your content here</label>
          </div>
          <div className="col align">
            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
          </div>
        </div>
        <div className="bg-light mt-3" id="editorjs">
          {" "}
        </div>
      </form>
    </Container>
  );
};

export default Create;

import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";
import { myContext } from "../../Context";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [editor, setEditor] = useState();
  const userObject = useContext(myContext);
  const googleId = userObject.googleId;

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://sanskrit-literature-cms.herokuapp.com/text/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const resText = await response.json();
      if (!resText) {
        window.alert(`Text with id ${id} not found`);
        navigate("/dashboard");
        return;
      }
      setTitle(resText.title);
      setStatus(resText.status);

      setEditor(
        new EditorJS({
          tools: EDITOR_JS_TOOLS,
          holder: "editorjs",
          logLevel: "ERROR",
          data: resText.content,
          autofocus: false,
          // onReady: () => {
          //   console.log("Editor.js is ready to work!");
          // },
        })
      );
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  async function saveDataHandler(e) {
    e.preventDefault();
    editor
      .save()
      .then(async (content) => {
        await fetch(
          `https://sanskrit-literature-cms.herokuapp.com/update/${params.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ googleId, title, status, content }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
    navigate("/dashboard");
  }

  return (
    <Container>
      <h3 className="mt-5">Edit</h3>
      <form onSubmit={saveDataHandler}>
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
            <label className="form-label">Your content</label>
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

export default Edit;

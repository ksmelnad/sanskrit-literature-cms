import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";

const Text = () => {
  const [text, setText] = useState({});

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

      const text = await response.json();

      if (!text) {
        window.alert(`Text with id ${id} not found`);
        navigate("/dashboard");
        return;
      }
      setText(text);
      const editor = new EditorJS({
        tools: EDITOR_JS_TOOLS,
        holder: "editorjs",
        logLevel: "ERROR",
        data: text.content,
        readOnly: true,
        // onReady: () => {
        //   console.log("Editor.js is ready to work!");
        // },
        autofocus: false,
      });
    }

    fetchData();

    return;
  }, [params.id]);

  const ShowJSON = () => {
    return <div>Json format of the content</div>;
  };

  return (
    <Container>
      <div className="mt-5">
        <h3>Title: {text.title}</h3>
        <h5 className="mt-3">Status: {text.status}</h5>
        <div className="bg-light mt-3" id="editorjs">
          {" "}
        </div>
      </div>
    </Container>
  );
};

export default Text;

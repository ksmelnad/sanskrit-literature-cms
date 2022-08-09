import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Text = (props) => {
  let db_date = props.text.date;
  const newDate = db_date.split(" ").slice(0, 6).join(" ");
  return (
    <tr>
      <td>
        <Link to={`/text/${props.text._id}`}> {props.text.title}</Link>{" "}
      </td>

      <td>{props.text.username}</td>
      <td>{newDate}</td>
    </tr>
  );
};

function PublicTextsList() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    async function getTexts() {
      const response = await fetch(
        `https://sanskrit-literature-cms.herokuapp.com/public`
      );

      if (!response.ok) {
        const message = "Error occurred";
        window.alert(message);
        return;
      }

      const texts = await response.json();
      setTexts(texts);
    }

    getTexts();

    return;
  }, [texts.length]);

  function publicTextList() {
    return texts.map((text) => {
      return <Text text={text} key={text._id} />;
    });
  }
  return (
    <div className="mt-4">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Create by</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>{publicTextList()}</tbody>
      </table>
    </div>
  );
}

export default PublicTextsList;

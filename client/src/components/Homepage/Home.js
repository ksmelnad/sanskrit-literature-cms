import React from "react";

function Home() {
  return (
    <div className="container mt-5">
      <h3>Welcome to Sanskrit Literature Content Management System!</h3>
      <div className="mt-5">
        <p>
          This is a place dedicated to creating Sanskrit Literature content and
          sharing it among users.{" "}
        </p>
        <p>
          A beautiful block-styled editor is provided for creating and editing
          the content. As an added benefit, we can download or export the
          content as a JSON object which will later help in preparing a suitable
          database object (in our case MongoDB). So, as of now a free version of
          the MongoDB cloud database is used to store the data.{" "}
        </p>
        <p>
          {" "}
          While creating the content, you can make it either public or private
          based on its status. While other users can access your public content,
          only you are allowed to access your private content which might be in
          the editing stage. Once the editing is finished, you may mark it as
          public making it accessible to others.
        </p>
        <p>
          Please login and start using this service. Your feedback is very much
          appreciated. Thanks and regards from the Developer.{" "}
        </p>
      </div>
    </div>
  );
}

export default Home;

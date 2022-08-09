import React, { useContext } from "react";
import TextList from "../CRUD/textlist";
import { Container } from "react-bootstrap";
import { myContext } from "../../Context";

function Dashboard() {
  const userObject = useContext(myContext);
  return (
    <Container className="mt-5">
      <h3>Welcome {userObject.username}</h3>
      <h5 className="mt-3">Your Content</h5>

      <TextList />
    </Container>
  );
}

export default Dashboard;

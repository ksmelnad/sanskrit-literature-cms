import React from "react";
import { Container } from "react-bootstrap";
import PublicTextsList from "../CRUD/publictextslist";

function PublicTexts() {
  return (
    <Container className="mt-5">
      <h3>Public Content</h3>
      <PublicTextsList />
    </Container>
  );
}

export default PublicTexts;

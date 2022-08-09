import React, { useContext } from "react";
import { myContext } from "../Context";

function NoPage() {
  const context = useContext(myContext);
  return (
    <div className="container d-flex justify-content-center">
      <h3 className="mt-5">No page found at this URL!</h3>
    </div>
  );
}

export default NoPage;

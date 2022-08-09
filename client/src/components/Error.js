import React, { useContext } from "react";
import { myContext } from "../Context";
import Login from "./Loginpage/Login";

function Error() {
  const context = useContext(myContext);
  return (
    <div className="container d-flex justify-content-center">
      {context ? (
        <h5 className="mt-5">You are already logged in!</h5>
      ) : (
        <div>
          <h5 className="mt-5">You are not logged in. Please login first!</h5>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Error;

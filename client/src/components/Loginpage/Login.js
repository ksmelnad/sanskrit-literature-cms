import React from "react";
import Container from "react-bootstrap/esm/Container";

function Login() {
  const googleLogin = () => {
    window.location.href =
      "https://sanskrit-literature-cms.herokuapp.com/auth/google";
  };
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt=""
        />
        <button className="btn btn-link " onClick={googleLogin}>
          Login with Google
        </button>
      </div>
    </Container>
  );
}

export default Login;

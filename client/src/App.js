import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Login from "./components/Loginpage/Login";
import Create from "./components/CRUD/create";
import Navbarcomp from "./components/Navbar/Navbarcomp";
import "bootstrap/dist/css/bootstrap.min.css";
import { myContext } from "./Context";
import Dashboard from "./components/Dashboard/Dashboard";
import PublicTexts from "./components/PublicTexts/PublicTexts";
import Error from "./components/Error";
import Text from "./components/CRUD/text";
import Edit from "./components/CRUD/edit";
import NoPage from "./components/Nopage";

function App() {
  const context = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbarcomp />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
        {context ? (
          <>
            <Route path="/create" element={<Create />} />
            <Route path="/text/:id" element={<Text />} />
            <Route path="/edit/:id" element={<Edit />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/public" element={<PublicTexts />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <Route path="*" element={<NoPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

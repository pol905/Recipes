import React from "react";
import axios from "axios";
const Logout = () => {
  const handleLogout = async () => {
    await axios.post("/v1/logout");
    window.location.href = "/";
  };
  return (
    <>
      <li className="nav__item" onClick={handleLogout}>
        <a className="nav__link">Logout</a>
      </li>
    </>
  );
};

export default Logout;

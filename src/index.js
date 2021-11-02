import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav";
import IpGet from "./components/Ipget";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <IpGet />
  </React.StrictMode>,
  document.getElementById("root")
);

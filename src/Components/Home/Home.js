import React from "react";
import GoogleSheetTable from "../GoogleSheetTable/GoogleSheetTable";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <h1 className="nav-heading">Sheet to Table</h1>
      </nav>
      <GoogleSheetTable />
    </div>
  );
};

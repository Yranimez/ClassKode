import React from "react";
import { Link } from "react-router-dom";

export class Error404 extends React.Component {
  render() {
    return (
      <main
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <main>
          <h1>Error 404</h1>
          <p>The page you are trying to access does not existing.</p>
          <Link to={-1} className="btn btn-primary">
            Back
          </Link>
        </main>
      </main>
    );
  }
}

import React from "react";
import { Link } from "react-router-dom";

export class TestPage extends React.Component {
  render() {
    return (
      <div className="test-page">
        Test Page{" "}
        <Link to="/">
          <button>To Home Page</button>
        </Link>
      </div>
    );
  }
}

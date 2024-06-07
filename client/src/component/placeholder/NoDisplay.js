import React from "react";

export class NoDisplay extends React.Component {
  render() {
    return (
      <main className="h-100 w-100 d-flex align-items-center justify-content-center border rounded">
        <div className="text-center p-3">
          <h5 className="text-light">There is no content here-</h5>
          <p className="text-light p-0 m-0">
            Please contact x if there's a problem.
          </p>
        </div>
      </main>
    );
  }
}

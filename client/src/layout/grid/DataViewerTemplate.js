import React from "react";
import { NoDisplay } from "../../component/placeholder/NoDisplay";

export class DataViewerTemplate extends React.Component {
  render() {
    return (
      <main className="row h-100 m-0">
        <section className="col-lg-3 h-100 p-2">
          <main className="h-100 bg-white rounded shadow-sm p-2">
            {this.props.extradata}
          </main>
        </section>
        <section className="col-lg-9 p-2 h-100">
          <main className="h-100 position-relative overflow-y-auto">
            <main className="h-100 p-2">
              <header>
                <h3 className="m-0 p-0">{this.props.title}</h3>
                <p className="m-0 p-0 text-secondary">
                  {this.props.description}
                </p>
                <hr className="p-0 mx-0 my-2" />
              </header>
              <main className="">
                <div className="d-flex gap-2 my-2">{this.props.control}</div>
                <section className="">
                  <main className="row m-0">
                    <section className="col-8 p-0">
                      <header className="mt-3">
                        <h5 className="fw-bold">Entry Details</h5>
                      </header>
                      <main>{this.props.content}</main>
                    </section>

                    <section className="col-4 p-0">
                      <main className="">{this.props.additional}</main>
                    </section>
                  </main>
                </section>
              </main>
            </main>
          </main>
        </section>
      </main>
    );
  }
}

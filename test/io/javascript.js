import React, { Fragment } from "react";
import AsyncComponent from "AsyncComponent";

let resolve = () => import("MyComponent");

const Markdown = () => (
  <Fragment>
    <AsyncComponent resolve={resolve} />
  </Fragment>
);
export default Markdown;

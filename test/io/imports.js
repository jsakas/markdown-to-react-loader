import React, { Fragment } from "react";
import { SomeComponent } from "./SomeComponent";

const Markdown = () => (
  <Fragment>
    <h1 id="hello-world">Hello, World</h1>
    <p>Heres a component rendered inline:</p>
    <SomeComponent />
  </Fragment>
);
export default Markdown;

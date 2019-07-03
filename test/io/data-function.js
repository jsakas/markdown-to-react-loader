import React, { Fragment } from "react";

const module = () => import('my-module');
export { module };

const Markdown = () => (
  <Fragment>
    <p>Something async</p>
  </Fragment>
);
export default Markdown;

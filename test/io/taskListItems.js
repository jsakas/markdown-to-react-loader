import React, { Fragment } from "react";

const Markdown = () => (
  <Fragment>
    <ul>
      <li>
        <input disabled type="checkbox" /> unchecked
      </li>
      <li>
        <input checked disabled type="checkbox" /> checked
      </li>
    </ul>
  </Fragment>
);
export default Markdown;

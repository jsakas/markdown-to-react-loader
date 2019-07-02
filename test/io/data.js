import React, { Fragment } from "react";

const title = "Hello World";
export { title };

const slug = "/post/1";
export { slug };

const object = [{ foo: "bar" }, { baz: "biz" }];
export { object };

const array = ["foo", "bar"];
export { array };

const Markdown = () => (
  <Fragment>
    <p>This component comes with data</p>
  </Fragment>
);
export default Markdown;

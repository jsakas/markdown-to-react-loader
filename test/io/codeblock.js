import React, { Fragment } from "react";

const Markdown = () => (
  <Fragment>
    <h1 id="code-sample">Code Sample</h1>

    <pre className="language-javascript">
      <code className="language-javascript">
        console<span className="token punctuation">.</span>
        <span className="token function">log</span>
        <span className="token punctuation">&#40;</span>
        <span className="token string">
          'This will be marked for highlighting'
        </span>
        <span className="token punctuation">&#41;</span>
        <span className="token punctuation">;</span>
      </code>
    </pre>
  </Fragment>
);
export default Markdown;

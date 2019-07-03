import React, { Fragment } from "react";

const Markdown = () => (
  <Fragment>
    <table>
      <thead>
        <tr>
          <th>column a</th>
          <th>column b</th>
          <th>column c</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <em>1</em>
          </td>
          <td>
            <a href="foo">2</a>
          </td>
          <td>
            <strong>3</strong>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>
            <code>code</code>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
      </tbody>
    </table>
  </Fragment>
);
export default Markdown;

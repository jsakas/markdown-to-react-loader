# markdown-to-react-loader


### [![NpmVersion](https://img.shields.io/npm/v/markdown-to-react-loader.svg)](https://www.npmjs.com/package/markdown-to-react-loader) [![NpmDownloads](https://img.shields.io/npm/dt/markdown-to-react-loader.svg)](https://www.npmjs.com/package/markdown-to-react-loader) [![Build Status](https://travis-ci.org/jsakas/markdown-to-react-loader.svg?branch=master)](https://travis-ci.org/jsakas/markdown-to-react-loader)


A Webpack loader for converting Markdown files to React components (JSX).

Currently supports imports, syntax highlighting, and extra data.

This loader was built for the purpose of documenting React Components, but can be used for other static documents you want to convert to HTML. 

#### It turns this:

```markdown
# Hello, World

Its great to be here!
```

#### Into this:

```javascript
import React, { Fragment } from 'react';
const Markdown = () => (
  <Fragment>
    <h1>Hello, World</h1>
    <p>Its great to be here!</p>
  </Fragment>
);
export default Markdown;
```

Note: Requires React 16.2+

# Installation

```
yarn add --dev markdown-to-react-loader
```
```
npm install --save-dev markdown-to-react-loader
```

# Usage

Because it outputs ES6 and JSX its recommended to use in conjunction with the babel-loader to compile for your targetted environment.

```
yarn add --dev babel-loader @babel/preset-env @babel/preset-react
```
```
npm install --save-dev babel-loader @babel/preset-env @babel/preset-react
```

Update your Webpack config:

```javascript
{
  test: /\.md$/,
  exclude: /node_modules/,
  use: [
    {
    	loader: 'babel-loader',
      options: {
          presets: ['@babel/env', '@babel/react']
      }
    },
    'markdown-to-react-loader',
  ],
},
```

Then you can use the loader like:

#### HelloWorld.md

```markdown
# Hello, World

Its great to be here!
```

#### App.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld.md';

ReactDOM.Render(<HelloWorld />, document.getElementById('app'));
```

## Imports

You can write ES6 imports inline using front matter.

#### HelloWorldWithImport.md

```markdown
---
imports: |
  import { SomeComponent } from './SomeComponent';
---

# Hello, World

Heres a component rendered inline:

<SomeComponent />

```

## Controlling JavaScript

You can pass simple props to components. However, if you need to write more advanced JavaScript, its recommended to declare it in the imports section.

```markdown
---
imports: |
  import { SomeComponent } from './SomeComponent';

  const dynamic = () => import('./SomeComponent');

  console.log('You can put anything here!');
---

<SomeComponent simple="string" />
<SomeComponent advanced={dynamic} />

```

Anything added to the `imports` front matter is added between the React import and component declaration in the outputted module.

## Syntax Highlighting

Syntax highlighting is done using PrismJS and is picked up automatically by tagging code blocks:

#### CodeSample.md

    # Code Sample

    ```javascript
    console.log('This will be marked for highlighting');
    ```

## Extra Data

Any front matter that is not under the `imports` key is considered extra data. It is parsed and exported as named exports from the module.

```markdown
---
title: Hello World
slug: /post/1
object:
    - foo: bar
    - baz: biz
array:
    - foo
    - bar
---
```

The above front matter is transformed to:

```javascript
const title = "Hello World";
export { title };

const slug = "/post/1";
export { slug };

const object = [{ foo: "bar" }, { baz: "biz" }];
export { object };

const array = ["foo", "bar"];
export { array };
```

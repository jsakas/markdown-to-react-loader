# markdown-to-react-loader


### [![NpmVersion](https://img.shields.io/npm/v/markdown-to-react-loader.svg)](https://www.npmjs.com/package/markdown-to-react-loader) [![NpmDownloads](https://img.shields.io/npm/dt/markdown-to-react-loader.svg)](https://www.npmjs.com/package/markdown-to-react-loader)


A Webpack loader for converting Markdown files to React components (JSX).

Currently supports ES6 imports and syntax highlighting.

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
yarn add markdown-to-react-loader
```

# Usage

Update your Webpack config. Because this loader outputs JSX its recommended to use the babel-loader after to compile the ES6 how you want.

```javascript
{
  test: /\.md$/,
  use: [
    'babel-loader',
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

# Imports

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

# Syntax Highlighting

Syntax highlighting is done using PrismJS and is picked up automatically by tagging code blocks:

#### CodeSample.md

	# Code Sample

	```javascript
	console.log('This will be marked for highlighting');
	```

# markdown-to-react-loader

A Webpack loader for converting Markdown files to React components (JSX).

Currently supports ES6 imports and syntax highlighting.

This loader was built for the purpose of documenting React Components, but can be used for other static documents you want to convert to HTML. 

Note: Requires React 16.2+

# Installation

```
yarn add markdown-to-react-loader
```

# Usage

First, update your Webpack config.

```
{
  test: /\.md$/,
  use: [
    'babel-loader',
    'markdown-to-react-loader',
  ],
},
```

Then, you can use the loader like:

#### HelloWorld.md

```
# Hello, World

Its great to be here!
```

#### App.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld.md';

ReactDOM.Render(<HelloWorld />, document.getElementById('app'));
```

# Imports

You can write ES6 imports inline using front matter.

#### HelloWorldWithImport.md

```
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
	console.log('This will be marked for highlighting
	```

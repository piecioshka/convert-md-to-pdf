# convert-markdown-to-pdf

[![node version](https://img.shields.io/node/v/convert-markdown-to-pdf.svg)](https://www.npmjs.com/package/convert-markdown-to-pdf)
[![npm version](https://badge.fury.io/js/convert-markdown-to-pdf.svg)](https://badge.fury.io/js/convert-markdown-to-pdf)
[![downloads count](https://img.shields.io/npm/dt/convert-markdown-to-pdf.svg)](https://www.npmjs.com/package/convert-markdown-to-pdf)
[![travis-ci](https://api.travis-ci.com/piecioshka/convert-markdown-to-pdf.svg?branch=master)](https://app.travis-ci.com/github/piecioshka/convert-markdown-to-pdf)
[![coveralls](https://coveralls.io/repos/github/piecioshka/convert-markdown-to-pdf/badge.svg?branch=master)](https://coveralls.io/github/piecioshka/convert-markdown-to-pdf?branch=master)
[![snyk](https://snyk.io/test/github/piecioshka/convert-markdown-to-pdf/badge.svg?targetFile=package.json)](https://snyk.io/test/github/piecioshka/convert-markdown-to-pdf?targetFile=package.json)

:hammer: Convert Markdown file to PDF.

## Features

* :white_check_mark: Build PDF file form Markdown file
* :white_check_mark: In default generate PDF file in the same directory as Markdown file
* :white_check_mark: You can set custom name of target PDF file

## Install

```bash
npm install -g convert-markdown-to-pdf
```

## Usage

```javascript
const { buildPDF } = require('convert-markdown-to-pdf');
buildPDF({
    source: '/tmp/source.md',
    target: '/tmp/document.pdf'
});
```

## CLI

### :arrow_right: Use case: Normal

```bash
convert-markdown-to-pdf /tmp/source.md
```

### :arrow_right: Use case: Change theme

```bash
convert-markdown-to-pdf /tmp/source.md -t ~/projects/convert-markdown-to-pdf-themes/dark.css
convert-markdown-to-pdf /tmp/source.md --theme ~/projects/convert-markdown-to-pdf-themes/orange.css
```

### :arrow_right: Use case: Custom theme

```bash
TODO
```

## Unit tests

```bash
npm test
```

## Code coverage

```bash
npm run coverage
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check [issues page](/issues/).

## Show your support

Give a ⭐️ if this project helped you!

## Related

* [xxx](https://github.com/piecioshka/xxx) - yyy

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018

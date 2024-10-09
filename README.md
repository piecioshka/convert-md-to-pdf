# convert-md-to-pdf

[![node version](https://img.shields.io/node/v/convert-md-to-pdf.svg)](https://www.npmjs.com/package/convert-md-to-pdf)
[![npm version](https://badge.fury.io/js/convert-md-to-pdf.svg)](https://badge.fury.io/js/convert-md-to-pdf)
[![downloads count](https://img.shields.io/npm/dt/convert-md-to-pdf.svg)](https://www.npmjs.com/package/convert-md-to-pdf)
[![license](https://img.shields.io/npm/l/convert-md-to-pdf.svg)](https://www.npmjs.com/package/convert-md-to-pdf)

🔨 Convert Markdown file to PDF file

> Give a ⭐️ if this project helped you!

## Features

* ✅ Build PDF file form Markdown file
* ✅ Generate a PDF file in the same directory as the Markdown file
* ✅ Use one of the built-in themes
* ✅ Support custom path to a theme file
* ✅ Support set output directory and output file name

## Usage

```js
const { buildPDF } = require('convert-md-to-pdf');
buildPDF({
  source: '/tmp/source.md',
  target: '/tmp/document.pdf'
});
```

## Installation

```bash
npm install -g convert-md-to-pdf
```

## CLI

### ➡️ Use case: Regular usage

```bash
convert-md-to-pdf /tmp/source.md
```

### ➡️ Use case: Display list of built-in themes

```bash
convert-md-to-pdf -l
```

### ➡️ Use case: Change theme (built-in)

```bash
convert-md-to-pdf /tmp/source.md -t clean
convert-md-to-pdf /tmp/source.md -t dark
convert-md-to-pdf /tmp/source.md -t default
convert-md-to-pdf /tmp/source.md -t nord
convert-md-to-pdf /tmp/source.md -t orange
```

### ➡️ Use case: Custom theme

```bash
convert-md-to-pdf /tmp/source.md -p ~/custom-theme.css
convert-md-to-pdf /tmp/source.md --theme-path ~/custom-theme.css
```

### ➡️ Use case: Set directory for output file

```bash
convert-md-to-pdf /tmp/source.md -d my-files/
convert-md-to-pdf /tmp/source.md --directory my-files/
```

### ➡️ Use case: Set name of output file

```bash
convert-md-to-pdf /tmp/source.md -o agreement.pdf
convert-md-to-pdf /tmp/source.md --output agreement.pdf
```

### ➡️ Use case: Display the date of generation in the output file

During the conversion, the following phrase will be replaced with date & time.
For example:

```md
Generated on: $$SIGNATURE$$
```

It will be replaced with:

```md
Generated on: 2023-09-08 23:16:35
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check [issues page](/issues/).

## Related

- [convert-md-to-html](https://github.com/piecioshka/convert-md-to-html) - 🔨 Convert Markdown file to HTML file

## Credits

Thanks to the authors of [markdown-pdf](https://github.com/alanshaw/markdown-pdf)

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018-2024

# textcite
A tool that helps emulate \textcite without BibLaTeX.

## Installation

Just do `npm install` followed by `ncc build src/index.js`.

## Usage

This script reads a BibTeX file and outputs a plain TeX file that you can input in your preamble to emulate `\textcite` and `\Textcite` commands.

Here is a basic example of usage:

```bash
node index.js refs.bib >textcite.tex
```

And then in your main document have

```tex
\documentclass{article}
\input{textcite.tex}
\begin{document}
  \Textcite{SMTH} proved that \textcite{OTHERS} were wrong.
  \bibliography{refs.bib}
\end{document}
```

## License

The MIT license.

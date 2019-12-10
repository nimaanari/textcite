import fs from 'fs';
import parse from 'bibtex-parse-js';

const contents = fs.readFileSync(process.argv[2], 'utf8');
const parsed = parse.toJSON(contents);

const lastname = (name) => {
    if (name.split(',').length>1)
        return name.split(',')[0];
    return name.split(' ').slice(-1)[0];
};
const line = (authors) => {
    if (authors.length>2)
        return `${authors[0]} et al.`;
    if (authors.length==2)
        return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]}`;
}

console.log(`\\usepackage{pgfkeys}`);
console.log(`\\newcommand*{\\textcite}[1]{\\pgfkeys{/textcite/#1}~\\cite{#1}}`);
console.log(`\\newcommand*{\\Textcite}{\\textcite}`);

for (const entry of parsed){
    const key = entry.citationKey;
    const authors = entry.entryTags.author.split(' and ').map(lastname);
    const texline = `\\pgfkeys{textcite/${key}/.code={${line(authors)}}}`;
    console.log(texline);
}

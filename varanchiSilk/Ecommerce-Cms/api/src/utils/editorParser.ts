import editorjsHTML from "editorjs-html";

const parser = editorjsHTML({
  image: (block: any) => {
    return `<img src="${block.data.file.url}" alt="" loading="lazy" />`;
  },

  table: (block: any) => {
    const rows = block.data.content
      .map(
        (row: string[]) =>
          `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`,
      )
      .join("");

    return `<table>${rows}</table>`;
  },

  code: (block: any) => {
    return `<pre><code>${block.data.code}</code></pre>`;
  },
});

export function editorJsonToHtml(json: any) {
  return parser.parse(json);
}

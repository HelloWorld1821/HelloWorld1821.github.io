const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const config = fs.readFileSync(path.join(root, '_config.yml'), 'utf8');
const linearAlgebraHtml = fs.readFileSync(
  path.join(root, 'public/2025/01/20/线性代数/index.html'),
  'utf8'
);
const reinforcementHtml = fs.readFileSync(
  path.join(root, 'public/2026/02/08/强化学习/index.html'),
  'utf8'
);
const mathPages = [linearAlgebraHtml, reinforcementHtml];

assert(
  /name:\s*['"]?@iktakahiro\/markdown-it-katex['"]?/.test(config) &&
    config.includes('enable: false'),
  'markdown-it-plus KaTeX plugin must be disabled so NexT MathJax handles formulas'
);

for (const html of mathPages) {
  assert(
    html.includes('tex-mml-chtml.js'),
    'MathJax script must be loaded on math pages'
  );
  assert(
    !html.includes('katex-error') && !html.includes('<span class="katex"'),
    'math pages must not be pre-rendered by KaTeX during Hexo generation'
  );
}

assert(
  linearAlgebraHtml.includes('<script type="math/tex">\\ R^3\\ </script>') &&
    linearAlgebraHtml.includes('<script type="math/tex">\\ \\vec{x},\\vec{y},\\vec{z}\\ </script>'),
  'inline TeX must be protected from Markdown escaping before MathJax renders it'
);

assert(
  linearAlgebraHtml.includes('<script type="math/tex; mode=display">') &&
    linearAlgebraHtml.includes('\\left\\{') &&
    linearAlgebraHtml.includes('\\\\') &&
    !linearAlgebraHtml.includes('\\left{'),
  'display TeX must preserve LaTeX backslashes for MathJax'
);

console.log('Math rendering checks passed.');

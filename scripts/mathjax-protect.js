'use strict';

function escapeScriptClose(value) {
  return value.replace(/<\/script/gi, '<\\/script');
}

function isEscaped(text, index) {
  let slashCount = 0;
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i--) {
    slashCount++;
  }
  return slashCount % 2 === 1;
}

function takeInlineMath(text, start) {
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === '\n' || text[i] === '\r') return null;
    if (text[i] === '$' && text[i + 1] !== '$' && !isEscaped(text, i)) {
      return {
        end: i + 1,
        value: text.slice(start + 1, i)
      };
    }
  }
  return null;
}

function protectDisplayMath(content) {
  return content.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    return '\n<script type="math/tex; mode=display">' +
      escapeScriptClose(math.trim()) +
      '</script>\n';
  });
}

function protectInlineMath(content) {
  let result = '';
  let cursor = 0;

  while (cursor < content.length) {
    const dollar = content.indexOf('$', cursor);
    if (dollar === -1) {
      result += content.slice(cursor);
      break;
    }

    if (content[dollar + 1] === '$' || isEscaped(content, dollar)) {
      result += content.slice(cursor, dollar + 1);
      cursor = dollar + 1;
      continue;
    }

    const math = takeInlineMath(content, dollar);
    if (!math) {
      result += content.slice(cursor, dollar + 1);
      cursor = dollar + 1;
      continue;
    }

    result += content.slice(cursor, dollar);
    result += '<script type="math/tex">' + escapeScriptClose(math.value) + '</script>';
    cursor = math.end;
  }

  return result;
}

function protectMath(content) {
  return protectInlineMath(protectDisplayMath(content));
}

hexo.extend.filter.register('before_post_render', data => {
  if (data.mathjax && data.content) {
    data.content = protectMath(data.content);
  }
  return data;
});

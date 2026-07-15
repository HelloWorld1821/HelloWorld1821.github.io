const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const sidebar = fs.readFileSync(
  path.join(root, 'themes/next/layout/_macro/sidebar.swig'),
  'utf8'
);
const styles = fs.readFileSync(
  path.join(root, 'source/_data/styles.styl'),
  'utf8'
);
const themeConfig = fs.readFileSync(
  path.join(root, 'themes/next/_config.yml'),
  'utf8'
);

assert(
  !sidebar.includes('/js/tagcloud.js') && !sidebar.includes('/js/tagcanvas.js'),
  'sidebar tag cloud must not reference missing canvas scripts'
);
assert(
  sidebar.includes('sidebar-tag-cloud'),
  'sidebar must render a sidebar-tag-cloud wrapper'
);
assert(
  !sidebar.includes('tagcloud({') &&
    sidebar.includes('sidebar_tagcloud_words') &&
    sidebar.includes('[1, 2, 3]') &&
    !sidebar.includes('10, 11') &&
    sidebar.includes('sidebar-tag-cloud-word') &&
    sidebar.includes('sidebar-tag-cloud-word-major') &&
    sidebar.includes('sidebar-tag-cloud-word-fill') &&
    sidebar.includes('aria-hidden="true"'),
  'sidebar must render a decorative non-clickable poster-style tag cloud'
);
assert(
  styles.includes('.sidebar-tag-cloud') &&
    styles.includes('.sidebar-tag-cloud-tags') &&
    styles.includes('aspect-ratio: 1.45') &&
    styles.includes('position: absolute') &&
    styles.includes('font-size: 12px') &&
    styles.includes('font-size: 28px') &&
    styles.includes('font-size: 18px') &&
    styles.includes('font-family: "Microsoft YaHei"') &&
    styles.includes('pointer-events: none') &&
    styles.includes('.sidebar-tag-cloud-word-major') &&
    styles.includes('.sidebar-tag-cloud-word-fill') &&
    styles.includes('sidebar-tag-cloud-link-10') &&
    styles.includes('.sidebar-tag-cloud-tags .sidebar-tag-cloud-link-10') &&
    styles.includes('.sidebar-tag-cloud-word:nth-child(20n + 20)') &&
    styles.includes('@media (prefers-color-scheme: dark)') &&
    styles.includes('--tag-color') &&
    styles.includes('var(--text-color)'),
  'tag cloud styles must provide dense poster layout, Microsoft YaHei, colors, and dark mode colors'
);
assert(
  /(?:^|\n)darkmode:\s*true(?:\r?\n|$)/.test(themeConfig),
  'NexT darkmode must be enabled so dark color variables are generated'
);

console.log('Tag cloud checks passed.');

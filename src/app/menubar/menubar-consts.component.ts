function sort(a: string, b: string) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export const smallList: string[] = [
  'markdown',
  'plaintext',
  'javascript',
  'python',
  'c++'
].sort(sort)

export const list: string[] = [
  ...smallList,
  'typescript',
  'css',
  'less',
  'scss',
  'json',
  'html',
  'xml',
  'php',
  'c#',
  'razor',
  'diff',
  'java',
  'vb',
  'coffeescript',
  'handlebars',
  'pug',
  'f#',
  'lua',
  'powershell',
  'ruby',
  'sass',
  'r'
].sort(sort)

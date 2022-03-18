const os = require('os');
const {child_process: cp, fs, path} = require('extra-build');
const {git, github, package}        = require('extra-build');
const {javascript, jsdoc}           = require('extra-build');


const owner  = 'nodef';
const srcts  = 'index.ts';
const outjs  = 'index.js';
const outmjs = 'index.mjs';
const outdts = 'index.d.ts';


// Is given file a submodule?
function isSubmodule(pth) {
  if (/^_|index.ts$/.test(pth)) return false;
  if (!/\.ts$/.test(pth)) return false;
  return true;
}


// Get additional keywords for main/sub package.
function additionalKeywords(fil) {
  if (fil !== srcts) return [path.keywordname(fil)];
  return fs.readdirSync('src').filter(isSubmodule).map(path.keywordname);
}


// Get keywords for main/sub package.
function keywords(fil) {
  var m = package.read('.');
  var s = new Set([...m.keywords, ...additionalKeywords(fil)]);
  return Array.from(s);
}


// Update GitHub details.
function updateGithub() {
  var m = package.read('.');
  var {name, description} = m;
  var homepage  = `https://www.npmjs.com/package/${name}`;
  var topics    = keywords(srcts);
  topics.length = Math.min(topics.length, 20);
  github.updateDetails(owner, name, {description, homepage, topics});
}


// Generate and publish docs.
function publishDocs(fil) {
  var url = git.remoteUrl();
  var cwd = fs.mkdtempSync(path.join(os.tmpdir(), '.docs'));
  cp.execLogSync(`git clone ${url} "${cwd}"`);
  try { cp.execLogSync(`git checkout gh-pages`, {cwd}); }
  catch(e) { git.setupBranch('gh-pages', {cwd}); }
  cp.execLogSync(`typedoc "src/${fil}" --out ".docs"`);
  cp.execLogSync(`rm -rf "${cwd}"/*`);
  cp.execLogSync(`mv ".docs"/* "${cwd}"/`);
  git.commitPush('', {cwd});
  cp.execLogSync(`rm -rf ${cwd}`);
}


// Webify output files.
function webifyMain(sym) {
  cp.execLogSync(`browserify "${outjs}" -o "${outjs}.1" -s ${sym}`);
  cp.execLogSync(`cp "${outmjs}" "${outmjs}.1"`);
  cp.execLogSync(`terser "${outjs}.1" -o "${outjs}"  -c -m`);
  cp.execLogSync(`terser "${outmjs}.1" -o "${outmjs}" -c -m`);
  cp.execLogSync(`rm -f "${outjs}.1"`);
  cp.execLogSync(`rm -f "${outmjs}.1"`);
}


// Generate main output files.
function generateMain(fil, sym) {
  var bld = fil.replace(/\.ts/, '.js');
  var env = sym? ` --environment TYPE:web` : '';
  cp.execLogSync(`rollup -c rollup.config.js -i .build/${bld}` + env);
  if (sym) webifyMain(sym);
}


// Publish root package to NPM, GitHub.
function publishRoot(sym, ver=null) {
  fs.restoreFileSync('package.json', () => {
    var m = package.read();
    m.version  = ver;
    m.keywords = keywords(srcts);
    if (sym) { m.name += '.web'; }
    package.write('.', m);
    package.publish('.');
    package.publishGithub('.', owner);
  });
}


// Deploy root package to NPM, GitHub.
function deployRoot() {
  var m   = package.read();
  var sym = path.symbolname(m.name);
  var ver = package.nextUnpublishedVersion(m.name, m.version);
  cp.execLogSync(`tsc`);
  updateGithub();
  publishDocs(srcts);
  generateMain(srcts, '');
  publishRoot('', ver);
  generateMain(srcts, sym);
  publishRoot(sym, ver);
}


function jsdocSymbolMarkdown(sym, pre, repo) {
  var x   = jsdoc.parse(sym.jsdoc);
  var nam = pre? `${pre}.${sym.name}`   : sym.name;
  var pkg = pre? `@${repo}/${sym.name}` : repo;
  var sig = `${nam}(${x.params.map(p => p.name).join(', ')})`;
  var len = Math.max(...x.params.map(p => p.name.length)) + 2;
  var par = x.params.map(p => `// ${(p.name+':').padEnd(len, ' ')}${p.description}`).join('\n');
  return `${x.description}<br>\n` +
    `📦 [NPM](https://www.npmjs.com/package/${pkg}),\n` +
    `🌐 [Web](https://www.npmjs.com/package/${pkg}.web),\n` +
    `📜 [Files](https://unpkg.com/${pkg}/),\n` +
    `📰 [Docs](https://nodef.github.io/${repo}/).\n\n` +
    `> Similar: [${nam}].\n\n` +
    `<br>\n\n` +
    '```javascript\n' +
    `${sig};\n` +
    `${par}\n` +
    '```\n\n' +
    '```javascript\n' +
    `const ${nam} = require("${repo}");\n\n` +
    `${nam}(...);\n` +
    `// → OUTPUT\n` +
    '```\n\n' +
    '<br>\n' +
    '<br>\n\n\n' +
    `## References\n\n` +
    `- [Example](https://www.example.com/)\n\n` +
    `[${nam}]: https://github.com/${owner}/${repo}/wiki/${nam}\n`
}


function generateWiki() {
  var m = package.read('.');
  for (var f of fs.readdirSync('src')) {
    if (f.startsWith('_')) continue;
    var nam = f.replace(/\..*/, '');
    var pre = f === 'index.ts'? '' : nam;
    var txt = fs.readFileTextSync(`src/${f}`);
    var esyms = javascript.exportSymbols(txt);
    var jsyms = javascript.jsdocSymbols(txt);
    var jmap  = new Map(jsyms.map(x => [x.name, x]));
    for (var e of esyms) {
      var out = `wiki/${pre}${e.name}.md`;
      if (fs.existsSync(out) && fs.readFileTextSync(out).length > 0) continue;
      if (!jmap.has(e.name)) { fs.writeFileTextSync(out, ''); continue; }
      fs.writeFileTextSync(out, jsdocSymbolMarkdown(jmap.get(e.name), pre, m.name));
    }
  }
}


function main(a) {
  if (a[2] === 'deploy') deployRoot();
  if (a[2] === 'wiki') generateWiki();
  else generateMain(srcts, '');
}
main(process.argv);

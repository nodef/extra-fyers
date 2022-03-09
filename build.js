const os = require('os');
const {child_process: cp, fs, path, git, github, javascript, package} = require('extra-build');


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
  topics.length = Math.max(topics.length, 20);
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


// Generate declarations.
function generateDts(fil) {
  cp.execLogSync(`dts-bundle-generator "src/${fil}" -o "${outdts}" --no-banner`);
  var txt = fs.readFileTextSync(outdts), m = package.read();
  fs.writeFileTextSync(outdts, javascript.correctDeclarations(txt, m.name));
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
function publishRoot(sym) {
  fs.restoreFileSync('package.json', () => {
    var m = package.read();
    if (sym) { m.name += '.web'; }
    m.keywords = keywords(srcts);
    package.write('.', m);
    package.publish('.');
    package.publishGithub('.', owner);
  });
}


// Deploy root package to NPM, GitHub.
function deployRoot() {
  var m   = package.read();
  var sym = path.symbolname(m.name);
  cp.execLogSync(`tsc`);
  updateGithub();
  publishDocs(srcts);
  generateDts(srcts);
  generateMain(srcts, '');
  publishRoot('');
  generateMain(srcts, sym);
  publishRoot(sym);
}


function main(a) {
  if (a[2] === 'deploy') deployRoot();
  else { generateDts(srcts); generateMain(srcts, ''); }
}
main(process.argv);

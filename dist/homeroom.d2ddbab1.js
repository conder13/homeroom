// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"doc2t":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "fb14df83d2ddbab1";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"feIgE":[function(require,module,exports,__globalThis) {
var _spanishVerbs = require("spanish-verbs");
const verbText = document.getElementById("verb");
const conjugationForm = document.getElementById("answer");
const userGuess = document.getElementById("conjugation");
const feedback = document.getElementById("feedback");
const correctText = document.getElementById("correct");
const tenses = [
    "INDICATIVE_PRESENT",
    "INDICATIVE_PRETERITE"
];
const verbs = [
    "hablar",
    "comer",
    "vivir",
    "ser",
    "estar",
    "tener",
    "hacer",
    "ir",
    "decir",
    "poder",
    "ver",
    "dar",
    "saber",
    "querer",
    "llegar",
    "pasar",
    "deber",
    "poner",
    "parecer",
    "quedar",
    "creer",
    "llevar",
    "dejar",
    "seguir",
    "encontrar",
    "llamar",
    "pensar",
    "salir",
    "volver",
    "tomar"
];
var verb = "Verb";
var tense = "Tense";
var total = 0;
var correct = 0;
function newVerb() {
    verb = verbs[Math.floor(Math.random() * verbs.length)];
    tense = tenses[Math.floor(Math.random() * tenses.length)];
    verbText.textContent = verb + " - " + tense.toLocaleLowerCase();
}
function checkAnswer(answer) {
    total++;
    console.log(answer);
    var correctAnswer = (0, _spanishVerbs.getConjugation)(verb, tense, 2);
    if (answer == correctAnswer) {
        correct++;
        feedback.textContent = "Correct!";
    } else feedback.textContent = "Wrong! " + correctAnswer;
    correctText.textContent = correct + "/" + total;
}
newVerb();
conjugationForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkAnswer(userGuess.value);
    userGuess.value = "";
    newVerb();
});

},{"spanish-verbs":"2JrIx"}],"2JrIx":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConjugation = exports.validTenses = void 0;
const inflect_1 = require("45a57a9ad1879fd1");
exports.validTenses = [
    'INDICATIVE_PRESENT',
    'INDICATIVE_IMPERFECT',
    'INDICATIVE_PRETERITE',
    'INDICATIVE_FUTURE',
    'INDICATIVE_PERFECT',
    'INDICATIVE_PLUPERFECT',
    'INDICATIVE_FUTURE_PERFECT',
    'INDICATIVE_PRETERITE_PERFECT',
    'SUBJUNCTIVE_PRESENT',
    'SUBJUNCTIVE_IMPERFECT_RA',
    'SUBJUNCTIVE_IMPERFECT_SE',
    'SUBJUNCTIVE_FUTURE',
    'SUBJUNCTIVE_PERFECT',
    'SUBJUNCTIVE_PLUPERFECT',
    'SUBJUNCTIVE_FUTURE_PERFECT',
    'CONDITIONAL_PRESENT',
    'CONDITIONAL_PERFECT'
];
function getConjugation(verb, tense, person) {
    if (!verb) {
        const err = new Error();
        err.name = 'TypeError';
        err.message = 'verb must not be null';
        throw err;
    }
    if (person != 0 && person != 1 && person != 2 && person != 3 && person != 4 && person != 5) {
        const err = new Error();
        err.name = 'TypeError';
        err.message = 'person must be 0 1 2 3 4 or 5';
        throw err;
    }
    if (!tense || exports.validTenses.indexOf(tense) === -1) {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `tense must be ${exports.validTenses.join()}`;
        throw err;
    }
    const person1to5toOptions = {
        0: [
            'first',
            'singular'
        ],
        1: [
            'second',
            'singular'
        ],
        2: [
            'third',
            'singular'
        ],
        3: [
            'first',
            'plural'
        ],
        4: [
            'second',
            'plural'
        ],
        5: [
            'third',
            'plural'
        ]
    };
    const tenseToMoodTense = {
        INDICATIVE_PRESENT: [
            'indicative',
            'present'
        ],
        INDICATIVE_IMPERFECT: [
            'indicative',
            'imperfect'
        ],
        INDICATIVE_PRETERITE: [
            'indicative',
            'preterite'
        ],
        INDICATIVE_FUTURE: [
            'indicative',
            'future'
        ],
        INDICATIVE_PERFECT: [
            'indicative',
            'perfect'
        ],
        INDICATIVE_PLUPERFECT: [
            'indicative',
            'pluperfect'
        ],
        INDICATIVE_FUTURE_PERFECT: [
            'indicative',
            'future perfect'
        ],
        INDICATIVE_PRETERITE_PERFECT: [
            'indicative',
            'preterite perfect'
        ],
        SUBJUNCTIVE_PRESENT: [
            'subjunctive',
            'present'
        ],
        SUBJUNCTIVE_IMPERFECT_RA: [
            'subjunctive',
            'imperfect -ra'
        ],
        SUBJUNCTIVE_IMPERFECT_SE: [
            'subjunctive',
            'imperfect -se'
        ],
        SUBJUNCTIVE_FUTURE: [
            'subjunctive',
            'future'
        ],
        SUBJUNCTIVE_PERFECT: [
            'subjunctive',
            'perfect'
        ],
        SUBJUNCTIVE_PLUPERFECT: [
            'subjunctive',
            'pluperfect'
        ],
        SUBJUNCTIVE_FUTURE_PERFECT: [
            'subjunctive',
            'future perfect'
        ],
        CONDITIONAL_PRESENT: [
            'conditional',
            'present'
        ],
        CONDITIONAL_PERFECT: [
            'conditional',
            'perfect'
        ]
    };
    const options = {
        person: person1to5toOptions[person][0],
        number: person1to5toOptions[person][1],
        mood: tenseToMoodTense[tense][0],
        tense: tenseToMoodTense[tense][1],
        positivity: null,
        formality: null,
        style: 'castillano'
    };
    return (0, inflect_1.inflect)(verb, options);
}
exports.getConjugation = getConjugation;

},{"45a57a9ad1879fd1":"9TGL2"}],"9TGL2":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inflect = void 0;
const stylesFile = __importStar(require("d30e5cb2859d9d37"));
const verbsOUEFile = __importStar(require("ec2c8a26647c4145"));
const exceptionsFile = __importStar(require("5e3ab62584da07e0"));
const endings_1 = require("c5bb7961983151f0");
const styles = stylesFile.styles;
const verbsOUE = verbsOUEFile.verbsOUE;
const exceptions = exceptionsFile.exceptions;
function fixStem(stem, ending, suffixAllLetters, options) {
    const suffix = suffixAllLetters[0];
    const whole = stem + ending;
    const lastLetter1Stem = stem.substring(stem.length - 1);
    const lastLetter2Stem = stem.substring(stem.length - 2);
    if ((options.mood === 'imperative' || options.tense === 'present') && verbsOUE.indexOf(whole) > -1 && (options.person === 'third' || options.number === 'singular')) stem = stem.replace('o', 'ue');
    switch(ending){
        case 'ar':
            if (lastLetter1Stem === 'c' && (suffix === 'e' || suffix === "\xe9")) stem = stem.substring(0, stem.length - 1) + 'qu';
            else if (lastLetter1Stem === 'g' && (suffix === 'e' || suffix === "\xe9")) stem = stem.substring(0, stem.length - 1) + 'gu';
            else if (lastLetter1Stem === 'z' && (suffix === 'e' || suffix === "\xe9")) stem = stem.substring(0, stem.length - 1) + 'c';
            break;
        case 'er':
            if ((lastLetter2Stem === 'oc' || lastLetter2Stem === 'ec') && (suffix === 'a' || suffix === "\xe1" || suffix === 'o')) stem = stem.substring(0, stem.length - 1) + 'zc';
            break;
        case 'ir':
            if (lastLetter2Stem === 'uc' && (suffix === 'a' || suffix === "\xe1" || suffix === 'o')) stem = stem.substring(0, stem.length - 1) + 'zc';
            break;
    }
    return stem;
}
const validTenses = [
    'present',
    'imperfect',
    'preterite',
    'future',
    'perfect',
    'pluperfect',
    'future perfect',
    'preterite perfect',
    'imperfect -ra',
    'imperfect -se'
];
/**
 * Inflect the given verb according to the given parameters.
 * The parameters are given as an object that contains
 * any of the following properties:
 *
 * <ul>
 * <li>person
 * <li>number
 * <li>mood
 * <li>tense
 * <li>gender
 * <li>positivity
 * <li>formality
 * <li>style
 * <li>reflection
 * </ul>
 * <p>
 * The person is given as one of the following strings:
 *
 * <ul>
 * <li>first - "I" and "we"
 * <li>second - "you" (singular) and "you" (plural)
 * <li>third - "he/she/it" and "they" (plural)
 * </ul>
 *
 * Default: first
 * <p>
 *
 * The number is given as any one of the following strings:
 *
 * <ul>
 * <li>singular - one person
 * <li>plural - multiple people
 * </ul>
 *
 * Default: singular
 * <p>
 *
 * The mood is given as any one of the following strings:
 *
 * <ul>
 * <li>indicative
 * <li>subjunctive
 * <li>conditional
 * <li>imperative
 * </ul>
 *
 * Default: indicative
 * <p>
 *
 * The tense is given as any one of the following strings depending
 * on the mood:
 *
 * <ul>
 * <li>indicative
 *   <ul>
 *   <li>present
 *   <li>imperfect
 *   <li>preterite
 *   <li>future
 *   <li>perfect
 *   <li>pluperfect
 *   <li>future perfect
 *   <li>preterite perfect
 *   </ul>
 * <li>subjunctive
 *   <ul>
 *   <li>present
 *   <li>imperfect -ra
 *   <li>imperfect -se
 *   <li>future
 *   <li>perfect
 *   <li>pluperfect
 *   <li>future perfect
 *   </ul>
 * <li>conditional
 *   <ul>
 *   <li>present
 *   <li>perfect
 *   </ul>
 * </ul>
 *
 * Default: present
 * <p>
 *
 * The gender is only necessary when the mood is "perfect" or "perfect subjunctive"
 * and indicates the gender of the person being spoken of:
 *
 * <ul>
 * <li>masculine
 * <li>feminine
 * </ul>
 *
 * Default: masculine
 * <p>
 *
 * The positivity is only necessary when the mood is imperative and is specified
 * with one of the following strings:
 *
 * <ul>
 * <li>affirmative - a command to do something
 * <li>negative - a command not to do something
 * </ul>
 *
 * Default: affirmative
 * <p>
 * The style parameter specifies which style of Spanish to use. This controls how
 * a verb is conjugated, especially for the second person forms. Valid values are:
 *
 * <ul>
 * <li>castillano - Spanish as spoken in Spain
 * <li>rioplatense - Spanish as spoken around the Rio de la Plata in South America. This
 * includes Argentina, Uruguay, Eastern Bolivia, and Paraguay
 * <li>chileano - Spanish as spoken in Chile
 * <li>centroamericano - Spanish as spoken in Central America
 * <li>mexicano - Spanish as spoken in Mexico
 * <li>caribeno - Spanish as spoken in Caribbean nations such as Cuba and Puerto Rico
 * <li>andino - Spanish as spoken in various Pacific Andean nations such as Peru and Ecuador
 * </ul>
 *
 * Default: castillano
 *
 * @param {String} verb the infinitive form of the verb to inflect
 * @param {Object} options optional parameters as per above
 * @returns {String} the inflected verb
 */ function inflect(verb, options) {
    if (!verb || verb.length < 2) {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `invalid verb`;
        throw err;
    }
    let ret = null;
    const ending = verb.substring(verb.length - 2);
    if (!(ending in endings_1.endingsSuffix)) // not a verb -- can't inflect it!
    return verb;
    let stem = verb.substring(0, verb.length - 2);
    let person = options.person;
    if (person != 'first' && person != 'second' && person != 'third') {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `person must be first second or third`;
        throw err;
    }
    const number = options.number;
    if (number != 'singular' && number != 'plural') {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `number must be singular or plural`;
        throw err;
    }
    const mood = options.mood;
    if (mood != 'indicative' && mood != 'subjunctive' && mood != 'conditional' && mood != 'imperative') {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `invalid mood`;
        throw err;
    }
    const tense = options.tense;
    if (mood != 'imperative' && validTenses.indexOf(tense) == -1) {
        const err = new Error();
        err.name = 'TypeError';
        err.message = `invalid tense`;
        throw err;
    }
    const positivity = options && options.positivity || 'affirmative';
    const styling = options && options.style && styles[options.style] || styles['castillano'];
    const formality = options.formality || 'informal';
    // ignore for castillano
    // istanbul ignore next
    styling.tuteo && person === 'second' && number === 'singular' && formality;
    // ignore for castillano
    // istanbul ignore next
    if (styling.ustedes && person === 'second' && number === 'plural') // in ustedes regions, the plural of tu is not vosotros, but ustedes instead,
    // which is the same as the third person plural
    // for castillano we don't care
    // istanbul ignore next
    person = 'third';
    if (tense === 'perfect' || tense === 'pluperfect' || tense === 'future perfect' || tense === 'preterite perfect') {
        const personObj = endings_1.endingsAux[person];
        const pluralityObj = personObj[number];
        const moodObj = pluralityObj[mood];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const aux = moodObj[tense];
        const suffix = endings_1.endingsSuffix[ending]['past participle'].singular.masculine;
        const pastParticiple = exceptions[verb] && exceptions[verb]['past participle'] || stem + suffix;
        ret = aux + ' ' + pastParticiple;
    } else {
        if (exceptions[verb]) // see if the requested options cause an exceptional inflection, else generate the regular inflection below
        {
            if (exceptions[verb] && exceptions[verb][mood]) {
                const moodObj = exceptions[verb][mood];
                const property = mood === 'imperative' ? positivity : tense;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const tenseObj = moodObj[property];
                if (tenseObj && tenseObj[number] && tenseObj[number][person]) {
                    const exc = tenseObj[number][person];
                    // istanbul ignore next
                    if (typeof exc === 'string') ret = exc;
                    else // no such thing in exceptions - it is not used
                    // istanbul ignore next
                    ret = exc[styling.voseo ? 'vos' : 'tu'];
                }
            }
        }
        if (!ret) {
            const personObj = endings_1.endingsSuffix[ending][person];
            const pluralityObj = personObj[number];
            const moodObj = pluralityObj[mood];
            if (typeof moodObj === 'string') {
                stem = fixStem(stem, ending, moodObj, options);
                ret = stem + moodObj;
            } else {
                const property = mood === 'imperative' ? positivity : tense;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const tenseObj = moodObj[property];
                // istanbul ignore else
                if (tenseObj) {
                    if (typeof tenseObj === 'string') {
                        stem = fixStem(stem, ending, tenseObj, options);
                        ret = stem + tenseObj;
                    } else {
                        // only castillano at the moment
                        // istanbul ignore next
                        const tuVoKey = styling.voseo ? 'vos' : 'tu';
                        const suffix = tenseObj[tuVoKey];
                        stem = fixStem(stem, ending, suffix, options);
                        ret = stem + suffix;
                    }
                } else {
                    const err = new Error();
                    err.name = 'DictError';
                    err.message = `no ${property} property for ${JSON.stringify(moodObj)}`;
                    throw err;
                }
            }
            // fixes
            // eyeron-eieron-morph construction https://www.fcg-net.org/demos/morphology/inflectional-patterns/
            if (ret && ret.endsWith('eieron')) ret = ret.replace(/eieron$/, 'eyeron');
        }
    }
    return ret;
}
exports.inflect = inflect;

},{"d30e5cb2859d9d37":"aBNSG","ec2c8a26647c4145":"9JMXF","5e3ab62584da07e0":"hOm8n","c5bb7961983151f0":"5LJsJ"}],"aBNSG":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.styles = void 0;
exports.styles = {
    castillano: {
        voseo: false,
        tuteo: false,
        ustedes: false
    },
    rioplatense: {
        voseo: true,
        tuteo: false,
        ustedes: true
    },
    chileano: {
        voseo: false,
        tuteo: false,
        ustedes: true
    },
    centroamericano: {
        voseo: true,
        tuteo: false,
        ustedes: true
    },
    mexicano: {
        voseo: false,
        tuteo: false,
        ustedes: true
    },
    caribeno: {
        voseo: false,
        tuteo: true,
        ustedes: true
    },
    andino: {
        voseo: false,
        tuteo: false,
        ustedes: true
    }
};

},{}],"9JMXF":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verbsOUE = void 0;
exports.verbsOUE = [
    'absolver',
    'acordar',
    'acostar',
    'almorzar',
    'alongar',
    'amoblar',
    'apostar',
    'aprobar',
    'asolar',
    'avergonzarse',
    'cocer',
    'colar',
    'colgar',
    'concordar',
    'conmover',
    'consolar',
    'contar',
    'costar',
    'degollar',
    'demoler',
    'demostrar',
    'desaprobar',
    'descolgar',
    'descontar',
    'desosar',
    'destorcer',
    'devolver',
    'disolver',
    'doler',
    'dormir',
    'encontrar',
    'engrosar',
    'envolver',
    'forzar',
    'holgar',
    'hollar',
    'llover',
    'moler',
    'morder',
    'morir',
    'mostrar',
    'mover',
    'oler	o-hue		huel-			to smell',
    'poblar',
    'probar',
    'promover',
    'recordar',
    'reforzar',
    'remorder',
    'remover',
    'renovar',
    'repoblar',
    'resolver',
    'resollar',
    'resonar',
    'retorcer',
    'revolcar',
    'revolver',
    'rodar',
    'rogar',
    'solar',
    'soldar',
    'soler',
    'soltar',
    'sonar',
    "so\xf1ar",
    'torcer',
    'tostar',
    'tronar',
    'volar',
    'volcar',
    'volver'
];

},{}],"hOm8n":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exceptions = void 0;
exports.exceptions = {
    estar: {
        indicative: {
            present: {
                singular: {
                    first: 'estoy',
                    second: "est\xe1s",
                    third: "est\xe1"
                },
                plural: {
                    third: "est\xe1n"
                }
            },
            preterite: {
                singular: {
                    first: 'estuve',
                    second: 'estuviste',
                    third: 'estuvo'
                },
                plural: {
                    first: 'estuvimos',
                    second: 'estuvisteis',
                    third: 'estuvieron'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: "est\xe9",
                    second: "est\xe9s",
                    third: "est\xe9"
                },
                plural: {
                    third: "est\xe9n"
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'estuviera',
                    second: 'estuvieras',
                    third: 'estuviera'
                },
                plural: {
                    first: "estuvi\xe9ramos",
                    second: 'estuvierais',
                    third: 'estuvieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'estuviese',
                    second: 'estuvieses',
                    third: 'estuviese'
                },
                plural: {
                    first: "estuvi\xe9semos",
                    second: 'estuvieseis',
                    third: 'estuviesen'
                }
            },
            future: {
                singular: {
                    first: 'estuviere',
                    second: 'estuvieres',
                    third: 'estuviere'
                },
                plural: {
                    first: "estuvi\xe9remos",
                    second: 'estuviereis',
                    third: 'estuvieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: "est\xe1",
                    third: "est\xe9"
                },
                plural: {
                    third: "est\xe9n"
                }
            },
            negative: {
                singular: {
                    second: "est\xe9s",
                    third: "est\xe9"
                },
                plural: {
                    third: "est\xe9n"
                }
            }
        }
    },
    ser: {
        indicative: {
            present: {
                singular: {
                    first: 'soy',
                    second: 'eres',
                    third: 'es'
                },
                plural: {
                    first: 'somos',
                    second: 'sois',
                    third: 'son'
                }
            },
            preterite: {
                singular: {
                    first: 'fui',
                    second: 'fuiste',
                    third: 'fue'
                },
                plural: {
                    first: 'fuimos',
                    second: 'fuisteis',
                    third: 'fueron'
                }
            },
            imperfect: {
                singular: {
                    first: 'era',
                    second: 'eras',
                    third: 'era'
                },
                plural: {
                    first: "\xe9ramos",
                    second: 'erais',
                    third: 'eran'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'sea',
                    second: 'seas',
                    third: 'sea'
                },
                plural: {
                    first: 'seamos',
                    second: "se\xe1is",
                    third: 'sean'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'fuera',
                    second: 'fueras',
                    third: 'fuera'
                },
                plural: {
                    first: "fu\xe9ramos",
                    second: "fu\xe9ramos",
                    third: 'fueran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'fuese',
                    second: 'fueses',
                    third: 'fuese'
                },
                plural: {
                    first: "fu\xe9semos",
                    second: 'fueseis',
                    third: 'fuesen'
                }
            },
            future: {
                singular: {
                    first: 'fuere',
                    second: 'fueres',
                    third: 'fuere'
                },
                plural: {
                    first: "fu\xe9remos",
                    second: 'fuereis',
                    third: 'fueren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: "s\xe9",
                    third: 'sea'
                },
                plural: {
                    first: 'seamos',
                    second: 'sed',
                    third: 'sean'
                }
            },
            negative: {
                singular: {
                    second: 'seas',
                    third: 'sea'
                },
                plural: {
                    first: 'seamos',
                    second: "se\xe1is",
                    third: 'sean'
                }
            }
        }
    },
    haber: {
        indicative: {
            present: {
                singular: {
                    first: 'he',
                    second: 'has',
                    third: 'hay'
                },
                plural: {
                    first: 'hemos',
                    third: 'han'
                }
            },
            preterite: {
                singular: {
                    first: 'hube',
                    second: 'hubiste',
                    third: 'hubo'
                },
                plural: {
                    first: 'hubimos',
                    second: 'hubisteis',
                    third: 'hubieron'
                }
            },
            future: {
                singular: {
                    first: "habr\xe9",
                    second: "habr\xe1s",
                    third: "habr\xe1"
                },
                plural: {
                    first: 'habremos',
                    second: "habr\xe9is",
                    third: "habr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'haya',
                    second: 'hayas',
                    third: 'haya'
                },
                plural: {
                    first: 'hayamos',
                    second: "hay\xe1is",
                    third: 'hayan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'hubiera',
                    second: 'hubieras',
                    third: 'hubiera'
                },
                plural: {
                    first: "hubi\xe9ramos",
                    second: 'hubierais',
                    third: 'hubieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'hubiese',
                    second: 'hubieses',
                    third: 'hubiese'
                },
                plural: {
                    first: "hubi\xe9semos",
                    second: 'hubieseis',
                    third: 'hubiesen'
                }
            },
            future: {
                singular: {
                    first: 'hubiere',
                    second: 'hubieres',
                    third: 'hubiere'
                },
                plural: {
                    first: "hubi\xe9remos",
                    second: 'hubiereis',
                    third: 'hubieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'he',
                    third: 'haya'
                },
                plural: {
                    first: 'hayamos',
                    second: 'habed',
                    third: 'hayan'
                }
            },
            negative: {
                singular: {
                    second: 'hayes',
                    third: 'haya'
                },
                plural: {
                    first: 'hayamos',
                    second: "hay\xe1is",
                    third: 'hayan'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "habr\xeda",
                    second: "habr\xedas",
                    third: "habr\xeda"
                },
                plural: {
                    first: "habr\xedamos",
                    second: "habr\xedais",
                    third: "habr\xedan"
                }
            },
            future: {
                singular: {
                    first: "habr\xe9",
                    second: "habr\xe1s",
                    third: "habr\xe1"
                },
                plural: {
                    first: 'habremos',
                    second: "habr\xe9is",
                    third: "habr\xe1n"
                }
            }
        }
    },
    tener: {
        indicative: {
            present: {
                singular: {
                    first: 'tengo',
                    second: 'tienes',
                    third: 'tiene'
                },
                plural: {
                    third: 'tienen'
                }
            },
            preterite: {
                singular: {
                    first: 'tuve',
                    second: 'tuviste',
                    third: 'tuvo'
                },
                plural: {
                    first: 'tuvimos',
                    second: 'tuvisteis',
                    third: 'tuvieron'
                }
            },
            future: {
                singular: {
                    first: "tendr\xe9",
                    second: "tendr\xe1s",
                    third: "tendr\xe1"
                },
                plural: {
                    first: 'tendremos',
                    second: "tendr\xe9is",
                    third: "tendr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'tenga',
                    second: 'tengas',
                    third: 'tenga'
                },
                plural: {
                    first: 'tengamos',
                    second: "teng\xe1is",
                    third: 'tengan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'tuviera',
                    second: 'tuvieras',
                    third: 'tuviera'
                },
                plural: {
                    first: "tuvi\xe9ramos",
                    second: 'tuvierais',
                    third: 'tuvieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'tuviese',
                    second: 'tuvieses',
                    third: 'tuviese'
                },
                plural: {
                    first: "tuvi\xe9semos",
                    second: 'tuvieseis',
                    third: 'tuviesen'
                }
            },
            future: {
                singular: {
                    first: 'tuviere',
                    second: 'tuvieres',
                    third: 'tuviere'
                },
                plural: {
                    first: "tuvi\xe9remos",
                    second: 'tuviereis',
                    third: 'tuvieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "tendr\xeda",
                    second: "tendr\xedas",
                    third: "tendr\xeda"
                },
                plural: {
                    first: "tendr\xedamos",
                    second: "tendr\xedais",
                    third: "tendr\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'ten',
                    third: 'tenga'
                },
                plural: {
                    first: 'tengamos',
                    third: 'tengan'
                }
            },
            negative: {
                singular: {
                    second: 'tengas',
                    third: 'tenga'
                },
                plural: {
                    first: 'tengamos',
                    second: "teng\xe1is",
                    third: 'tengan'
                }
            }
        }
    },
    poder: {
        indicative: {
            present: {
                singular: {
                    first: 'puedo',
                    second: 'puedes',
                    third: 'puede'
                },
                plural: {
                    third: 'pueden'
                }
            },
            preterite: {
                singular: {
                    first: 'pude',
                    second: 'pudiste',
                    third: 'pudo'
                },
                plural: {
                    first: 'pudimos',
                    second: 'pudisteis',
                    third: 'pudieron'
                }
            },
            future: {
                singular: {
                    first: "podr\xe9",
                    second: "podr\xe1s",
                    third: "podr\xe1"
                },
                plural: {
                    first: 'podremos',
                    second: "podr\xe9is",
                    third: "podr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'pueda',
                    second: 'puedas',
                    third: 'pueda'
                },
                plural: {
                    third: 'puedan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'pudiera',
                    second: 'pudieras',
                    third: 'pudiera'
                },
                plural: {
                    first: "pudi\xe9ramos",
                    second: 'pudierais',
                    third: 'pudieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'pudiese',
                    second: 'pudieses',
                    third: 'pudiese'
                },
                plural: {
                    first: "pudi\xe9semos",
                    second: 'pudieseis',
                    third: 'pudiesen'
                }
            },
            future: {
                singular: {
                    first: 'pudiere',
                    second: 'pudieres',
                    third: 'pudiere'
                },
                plural: {
                    first: "pudi\xe9remos",
                    second: 'pudiereis',
                    third: 'pudieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "podr\xeda",
                    second: "podr\xedas",
                    third: "podr\xeda"
                },
                plural: {
                    first: "podr\xedamos",
                    second: "podr\xedais",
                    third: "podr\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'puede',
                    third: 'pueda'
                },
                plural: {
                    third: 'puedan'
                }
            },
            negative: {
                singular: {
                    second: 'puedas',
                    third: 'pueda'
                },
                plural: {
                    third: 'puedan'
                }
            }
        }
    },
    ir: {
        gerund: 'yendo',
        indicative: {
            present: {
                singular: {
                    first: 'voy',
                    second: 'vas',
                    third: 'va'
                },
                plural: {
                    first: 'vamos',
                    second: 'vais',
                    third: 'van'
                }
            },
            preterite: {
                singular: {
                    first: 'fui',
                    second: 'fuiste',
                    third: 'fue'
                },
                plural: {
                    first: 'fuimos',
                    second: 'fuisteis',
                    third: 'fueron'
                }
            },
            imperfect: {
                singular: {
                    first: 'iba',
                    second: 'ibas',
                    third: 'iba'
                },
                plural: {
                    first: "\xedbamos",
                    second: 'ibais',
                    third: 'iban'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'vaya',
                    second: 'vayas',
                    third: 'vaya'
                },
                plural: {
                    first: 'vayamos',
                    second: "vay\xe1is",
                    third: 'vayan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'fuera',
                    second: 'fueras',
                    third: 'fuera'
                },
                plural: {
                    first: "fu\xe9ramos",
                    second: 'fuerais',
                    third: 'fueran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'fuese',
                    second: 'fueses',
                    third: 'fuese'
                },
                plural: {
                    first: "fu\xe9semos",
                    second: 'fueseis',
                    third: 'fuesen'
                }
            },
            future: {
                singular: {
                    first: 'fuere',
                    second: 'fueres',
                    third: 'fuere'
                },
                plural: {
                    first: "fu\xe9remos",
                    second: 'fuereis',
                    third: 'fueren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 've',
                    third: 'vaya'
                },
                plural: {
                    first: 'vayamos',
                    third: 'vayan'
                }
            },
            negative: {
                singular: {
                    second: 'vayas',
                    third: 'vaya'
                },
                plural: {
                    first: 'vayamos',
                    second: "vay\xe1is",
                    third: 'vayan'
                }
            }
        }
    },
    dar: {
        indicative: {
            present: {
                singular: {
                    first: 'doy'
                },
                plural: {
                    second: 'dais'
                }
            },
            preterite: {
                singular: {
                    first: 'di',
                    second: 'diste',
                    third: 'dio'
                },
                plural: {
                    first: 'dimos',
                    second: 'disteis',
                    third: 'dieron'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: "d\xe9",
                    third: "d\xe9"
                },
                plural: {
                    second: 'deis'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'diera',
                    second: 'dieras',
                    third: 'diera'
                },
                plural: {
                    first: "di\xe9ramos",
                    second: 'dierais',
                    third: 'dieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'diese',
                    second: 'dieses',
                    third: 'diese'
                },
                plural: {
                    first: "di\xe9semos",
                    second: 'dieseis',
                    third: 'diesen'
                }
            },
            future: {
                singular: {
                    first: 'diere',
                    second: 'dieres',
                    third: 'diere'
                },
                plural: {
                    first: "di\xe9remos",
                    second: 'diereis',
                    third: 'dieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    third: "d\xe9"
                }
            },
            negative: {
                singular: {
                    third: "d\xe9"
                },
                plural: {
                    second: 'deis'
                }
            }
        }
    },
    saber: {
        indicative: {
            present: {
                singular: {
                    first: "s\xe9"
                }
            },
            preterite: {
                singular: {
                    first: 'supe',
                    second: 'supiste',
                    third: 'supo'
                },
                plural: {
                    first: 'supimos',
                    second: 'supisteis',
                    third: 'supieron'
                }
            },
            future: {
                singular: {
                    first: "sabr\xe9",
                    second: "sabr\xe1s",
                    third: "sabr\xe1"
                },
                plural: {
                    first: 'sabremos',
                    second: "sabr\xe9is",
                    third: "sabr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'sepa',
                    second: 'sepas',
                    third: 'sepa'
                },
                plural: {
                    first: 'sepamos',
                    second: "sep\xe1is",
                    third: 'sepan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'supiera',
                    second: 'supieras',
                    third: 'supiera'
                },
                plural: {
                    first: "supi\xe9ramos",
                    second: 'supierais',
                    third: 'supieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'supiese',
                    second: 'supieses',
                    third: 'supiese'
                },
                plural: {
                    first: "supi\xe9semos",
                    second: 'supieseis',
                    third: 'supiesen'
                }
            },
            future: {
                singular: {
                    first: 'supiere',
                    second: 'supieres',
                    third: 'supiere'
                },
                plural: {
                    first: "supi\xe9remos",
                    second: 'supiereis',
                    third: 'supieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "sabr\xeda",
                    second: "sabr\xedas",
                    third: "sabr\xeda"
                },
                plural: {
                    first: "sabr\xedamos",
                    second: "sabr\xedais",
                    third: "sabr\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    third: 'sepa'
                },
                plural: {
                    first: 'sepamos',
                    third: 'sepan'
                }
            },
            negative: {
                singular: {
                    second: 'sepas',
                    third: 'sepa'
                },
                plural: {
                    first: 'sepamos',
                    second: "sep\xe1is",
                    third: 'sepan'
                }
            }
        }
    },
    querer: {
        indicative: {
            present: {
                singular: {
                    first: 'quiero',
                    second: 'quieres',
                    third: 'quiere'
                },
                plural: {
                    third: 'quieren'
                }
            },
            preterite: {
                singular: {
                    first: 'quise',
                    second: 'quisiste',
                    third: 'quiso'
                },
                plural: {
                    first: 'quisimos',
                    second: 'quisisteis',
                    third: 'quisieron'
                }
            },
            future: {
                singular: {
                    first: "querr\xe9",
                    second: "querr\xe1s",
                    third: "querr\xe1"
                },
                plural: {
                    first: 'querremos',
                    second: "querr\xe9is",
                    third: "querr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'quiera',
                    second: 'quieras',
                    third: 'quiera'
                },
                plural: {
                    third: 'quieran'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'quisiera',
                    second: 'quisieras',
                    third: 'quisiera'
                },
                plural: {
                    first: "quisi\xe9ramos",
                    second: 'quisierais',
                    third: 'quisieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'quisiese',
                    second: 'quisieses',
                    third: 'quisiese'
                },
                plural: {
                    first: "quisi\xe9semos",
                    second: 'quisieseis',
                    third: 'quisiesen'
                }
            },
            future: {
                singular: {
                    first: 'quisiere',
                    second: 'quisieres',
                    third: 'quisiere'
                },
                plural: {
                    first: "quisi\xe9remos",
                    second: 'quisiereis',
                    third: 'quisieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "querr\xeda",
                    second: "querr\xedas",
                    third: "querr\xeda"
                },
                plural: {
                    first: "querr\xedamos",
                    second: "querr\xedais",
                    third: "querr\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'quiere',
                    third: 'quiera'
                },
                plural: {
                    third: 'quieran'
                }
            },
            negative: {
                singular: {
                    second: 'quieras',
                    third: 'quiera'
                },
                plural: {
                    third: 'quieran'
                }
            }
        }
    },
    creer: {
        'past participle': 'creido',
        gerund: 'creyendo',
        indicative: {
            preterite: {
                singular: {
                    third: "crey\xf3"
                },
                plural: {
                    third: 'creyeron'
                }
            }
        },
        subjunctive: {
            'imperfect -ra': {
                singular: {
                    first: 'creyera',
                    second: 'creyeras',
                    third: 'creyera'
                },
                plural: {
                    first: "crey\xe9ramos",
                    second: 'creyerais',
                    third: 'creyeran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'creyese',
                    second: 'creyeses',
                    third: 'creyese'
                },
                plural: {
                    first: "crey\xe9semos",
                    second: 'creyeseis',
                    third: 'creyesen'
                }
            },
            future: {
                singular: {
                    first: 'creyere',
                    second: 'creyeres',
                    third: 'creyere'
                },
                plural: {
                    first: "crey\xe9remos",
                    second: 'creyereis',
                    third: 'creyeren'
                }
            }
        }
    },
    seguir: {
        indicative: {
            present: {
                singular: {
                    first: 'sigo',
                    second: 'sigues',
                    third: 'sigue'
                },
                plural: {
                    third: 'siguen'
                }
            },
            preterite: {
                singular: {
                    third: "sigui\xf3"
                },
                plural: {
                    third: 'siguieron'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'siga',
                    second: 'sigas',
                    third: 'siga'
                },
                plural: {
                    third: 'sigan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'siguiera',
                    second: 'siguieras',
                    third: 'siguiera'
                },
                plural: {
                    first: "sigui\xe9ramos",
                    second: 'siguierais',
                    third: 'siguieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'siguiese',
                    second: 'siguieses',
                    third: 'siguiese'
                },
                plural: {
                    first: "sigui\xe9semos",
                    second: 'siguieseis',
                    third: 'siguiesen'
                }
            },
            future: {
                singular: {
                    first: 'siguiere',
                    second: 'siguieres',
                    third: 'siguiere'
                },
                plural: {
                    first: "sigui\xe9remos",
                    second: 'siguiereis',
                    third: 'siguieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'sigue',
                    third: 'siga'
                },
                plural: {
                    first: 'sigamos',
                    third: 'sigan'
                }
            },
            negative: {
                singular: {
                    second: 'sigas',
                    third: 'siga'
                },
                plural: {
                    first: 'sigamos',
                    second: "sig\xe1is",
                    third: 'sigan'
                }
            }
        }
    },
    conseguir: {
        indicative: {
            present: {
                singular: {
                    first: 'consigo',
                    second: 'consigues',
                    third: 'consigue'
                },
                plural: {
                    third: 'consiguen'
                }
            },
            preterite: {
                singular: {
                    third: "consigui\xf3"
                },
                plural: {
                    third: 'consiguieron'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'consiga',
                    second: 'consigas',
                    third: 'consiga'
                },
                plural: {
                    third: 'consigan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'consiguiera',
                    second: 'consiguieras',
                    third: 'consiguiera'
                },
                plural: {
                    first: "consigui\xe9ramos",
                    second: 'consiguierais',
                    third: 'consiguieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'consiguiese',
                    second: 'consiguieses',
                    third: 'consiguiese'
                },
                plural: {
                    first: "consigui\xe9semos",
                    second: 'consiguieseis',
                    third: 'consiguiesen'
                }
            },
            future: {
                singular: {
                    first: 'consiguiere',
                    second: 'consiguieres',
                    third: 'consiguiere'
                },
                plural: {
                    first: "consigui\xe9remos",
                    second: 'consiguiereis',
                    third: 'consiguieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'consigue',
                    third: 'consiga'
                },
                plural: {
                    first: 'consigamos',
                    third: 'consigan'
                }
            },
            negative: {
                singular: {
                    second: 'consigas',
                    third: 'consiga'
                },
                plural: {
                    first: 'consigamos',
                    second: "consig\xe1is",
                    third: 'consigan'
                }
            }
        }
    },
    abrir: {
        'past participle': 'abierto'
    },
    cubrir: {
        'past participle': 'cubierto'
    },
    decir: {
        'past participle': 'dicho',
        gerund: 'diciendo',
        indicative: {
            present: {
                singular: {
                    first: 'digo',
                    second: 'dices',
                    third: 'dice'
                },
                plural: {
                    third: 'dicen'
                }
            },
            preterite: {
                singular: {
                    first: 'dije',
                    second: 'dijiste',
                    third: 'dijo'
                },
                plural: {
                    first: 'dijimos',
                    second: 'dijisteis',
                    third: 'dijeron'
                }
            },
            future: {
                singular: {
                    first: "dir\xe9",
                    second: "dir\xe1s",
                    third: "dir\xe1"
                },
                plural: {
                    first: 'diremos',
                    second: "dir\xe9is",
                    third: "dir\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'diga',
                    second: 'digas',
                    third: 'diga'
                },
                plural: {
                    first: 'digamos',
                    second: "dig\xe1is",
                    third: 'digan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'dijera',
                    second: 'dijeras',
                    third: 'dijera'
                },
                plural: {
                    first: "dij\xe9ramos",
                    second: 'dijerais',
                    third: 'dijeran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'dijese',
                    second: 'dijeses',
                    third: 'dijese'
                },
                plural: {
                    first: "dij\xe9semos",
                    second: 'dijeseis',
                    third: 'dijesen'
                }
            },
            future: {
                singular: {
                    first: 'dijere',
                    second: 'dijeres',
                    third: 'dijere'
                },
                plural: {
                    first: "dij\xe9remos",
                    second: 'dijereis',
                    third: 'dijeren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "dir\xeda",
                    second: "dir\xedas",
                    third: "dir\xeda"
                },
                plural: {
                    first: "dir\xedamos",
                    second: "dir\xedais",
                    third: "dir\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'di',
                    third: 'diga'
                },
                plural: {
                    first: 'digamos',
                    third: 'digan'
                }
            },
            negative: {
                singular: {
                    second: 'digas',
                    third: 'diga'
                },
                plural: {
                    first: 'digamos',
                    second: "dig\xe1is",
                    third: 'digan'
                }
            }
        }
    },
    escribir: {
        'past participle': 'escrito'
    },
    hacer: {
        'past participle': 'hecho',
        indicative: {
            present: {
                singular: {
                    first: 'hago'
                }
            },
            preterite: {
                singular: {
                    first: 'hice',
                    second: 'hiciste',
                    third: 'hizo'
                },
                plural: {
                    first: 'hicimos',
                    second: 'hicisteis',
                    third: 'hicieron'
                }
            },
            future: {
                singular: {
                    first: "har\xe9",
                    second: "har\xe1s",
                    third: "har\xe1"
                },
                plural: {
                    first: 'haremos',
                    second: "har\xe9is",
                    third: "har\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'haga',
                    second: 'hagas',
                    third: 'haga'
                },
                plural: {
                    first: 'tengamos',
                    second: "teng\xe1is",
                    third: 'tengan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'hiciera',
                    second: 'hicieras',
                    third: 'hiciera'
                },
                plural: {
                    first: "hici\xe9ramos",
                    second: 'hicierais',
                    third: 'hicieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'hiciese',
                    second: 'hicieses',
                    third: 'hiciese'
                },
                plural: {
                    first: "hici\xe9semos",
                    second: 'hicieseis',
                    third: 'hiciesen'
                }
            },
            future: {
                singular: {
                    first: 'hiciere',
                    second: 'hicieres',
                    third: 'hiciere'
                },
                plural: {
                    first: "hici\xe9remos",
                    second: 'hiciereis',
                    third: 'hicieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "har\xeda",
                    second: "har\xedas",
                    third: "har\xeda"
                },
                plural: {
                    first: "har\xedamos",
                    second: "har\xedais",
                    third: "har\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'haz',
                    third: 'haga'
                },
                plural: {
                    first: 'hagamos',
                    third: 'hagan'
                }
            },
            negative: {
                singular: {
                    second: 'hagas',
                    third: 'haga'
                },
                plural: {
                    first: 'hagamos',
                    second: "hag\xe1is",
                    third: 'hagan'
                }
            }
        }
    },
    morir: {
        'past participle': 'muerto'
    },
    poner: {
        'past participle': 'puesto',
        indicative: {
            present: {
                singular: {
                    first: 'pongo'
                }
            },
            preterite: {
                singular: {
                    first: 'puse',
                    second: 'pusiste',
                    third: 'puso'
                },
                plural: {
                    first: 'pusimos',
                    second: 'pusisteis',
                    third: 'pusieron'
                }
            },
            future: {
                singular: {
                    first: "pondr\xe9",
                    second: "pondr\xe1s",
                    third: "pondr\xe1"
                },
                plural: {
                    first: 'pondremos',
                    second: "pondr\xe9is",
                    third: "pondr\xe1n"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'ponga',
                    second: 'pongas',
                    third: 'ponga'
                },
                plural: {
                    first: 'pongamos',
                    second: "pong\xe1is",
                    third: 'pongan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'pusiera',
                    second: 'pusieras',
                    third: 'pusiera'
                },
                plural: {
                    first: "pusi\xe9ramos",
                    second: 'pusierais',
                    third: 'pusieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'pusiese',
                    second: 'pusieses',
                    third: 'pusiese'
                },
                plural: {
                    first: "pusi\xe9semos",
                    second: 'pusieseis',
                    third: 'pusiesen'
                }
            },
            future: {
                singular: {
                    first: 'pusiere',
                    second: 'pusieres',
                    third: 'pusiere'
                },
                plural: {
                    first: "pusi\xe9remos",
                    second: 'pusiereis',
                    third: 'pusieren'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "pondr\xeda",
                    second: "pondr\xedas",
                    third: "pondr\xeda"
                },
                plural: {
                    first: "pondr\xedamos",
                    second: "pondr\xedais",
                    third: "pondr\xedan"
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'pon',
                    third: 'ponga'
                },
                plural: {
                    first: 'pongamos',
                    third: 'pongan'
                }
            },
            negative: {
                singular: {
                    second: 'pongas',
                    third: 'ponga'
                },
                plural: {
                    first: 'pongamos',
                    second: "pong\xe1is",
                    third: 'pongan'
                }
            }
        }
    },
    romper: {
        'past participle': 'roto'
    },
    ver: {
        'past participle': 'visto',
        indicative: {
            present: {
                singular: {
                    first: 'veo'
                },
                plural: {
                    second: 'veis'
                }
            },
            preterite: {
                singular: {
                    first: 'vi',
                    third: 'vio'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'vea',
                    second: 'veas',
                    third: 'vea'
                },
                plural: {
                    first: 'veamos',
                    second: "ve\xe1is",
                    third: 'vean'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    third: 'vea'
                },
                plural: {
                    first: 'veamos'
                }
            },
            negative: {
                singular: {
                    second: 'veas',
                    third: 'vea'
                },
                plural: {
                    first: 'veamos',
                    second: "ve\xe1is",
                    third: 'vean'
                }
            }
        }
    },
    pudrir: {
        'past participle': 'podrido'
    },
    volver: {
        'past participle': 'vuelto'
    },
    producir: {
        indicative: {
            preterite: {
                singular: {
                    first: 'produje',
                    third: 'produjo'
                }
            }
        }
    },
    conducir: {
        indicative: {
            preterite: {
                singular: {
                    third: 'condujo'
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    third: 'conduzca'
                }
            },
            future: {
                singular: {
                    third: 'condujere'
                }
            },
            imperfect: {
                singular: {
                    third: 'condujese'
                }
            }
        }
    },
    venir: {
        indicative: {
            present: {
                singular: {
                    first: 'vengo',
                    second: 'vienes',
                    third: 'viene'
                },
                plural: {
                    third: 'vienen'
                }
            },
            preterite: {
                singular: {
                    first: 'vine',
                    second: 'viniste',
                    third: 'vino'
                },
                plural: {
                    first: 'vinimos',
                    second: 'vinisteis',
                    third: 'vinieron'
                }
            }
        },
        conditional: {
            present: {
                singular: {
                    first: "vendr\xeda",
                    second: "vendr\xedas",
                    third: "vendr\xeda"
                },
                plural: {
                    first: "vendr\xedamos",
                    second: "vendr\xedais",
                    third: "vendr\xedan"
                }
            }
        },
        subjunctive: {
            present: {
                singular: {
                    first: 'venga',
                    second: 'vengas',
                    third: 'venga'
                },
                plural: {
                    first: 'vengamos',
                    second: "veng\xe1is",
                    third: 'vengan'
                }
            },
            'imperfect -ra': {
                singular: {
                    first: 'viniera',
                    second: 'vinieras',
                    third: 'viniera'
                },
                plural: {
                    first: "vini\xe9ramos",
                    second: 'vinierais',
                    third: 'vinieran'
                }
            },
            'imperfect -se': {
                singular: {
                    first: 'viniese',
                    second: 'vinieses',
                    third: 'viniese'
                },
                plural: {
                    first: "vini\xe9semos",
                    second: 'vinieseis',
                    third: 'viniesen'
                }
            },
            future: {
                singular: {
                    first: 'viniere',
                    second: 'vinieres',
                    third: 'viniere'
                },
                plural: {
                    first: "vini\xe9remos",
                    second: 'viniereis',
                    third: 'vinieren'
                }
            }
        },
        imperative: {
            affirmative: {
                singular: {
                    second: 'ven',
                    third: 'venga'
                },
                plural: {
                    first: 'vengamos',
                    third: 'vengan'
                }
            },
            negative: {
                singular: {
                    second: 'venga',
                    third: 'vengamos'
                },
                plural: {
                    second: "veng\xe1is",
                    third: 'vengan'
                }
            }
        }
    }
};

},{}],"5LJsJ":[function(require,module,exports,__globalThis) {
"use strict";
/**
 * @license
 * Copyright 2019 Ludan Stoecklé, 2017, HealthTap, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.endingsAux = exports.endingsSuffix = void 0;
exports.endingsSuffix = {
    ar: {
        infinitive: 'ar',
        gerund: 'ando',
        'past participle': {
            singular: {
                masculine: 'ado',
                feminine: 'ada'
            },
            plural: {
                masculine: 'ados',
                feminine: 'adas'
            }
        },
        first: {
            singular: {
                indicative: {
                    present: 'o',
                    imperfect: 'aba',
                    preterite: "\xe9",
                    future: "ar\xe9"
                },
                subjunctive: {
                    present: 'e',
                    'imperfect -ra': 'ara',
                    'imperfect -se': 'ase',
                    future: 'are'
                },
                conditional: "ar\xeda"
            },
            plural: {
                indicative: {
                    present: 'amos',
                    imperfect: "\xe1bamos",
                    preterite: 'amos',
                    future: 'aremos'
                },
                subjunctive: {
                    present: 'emos',
                    'imperfect -ra': "\xe1ramos",
                    'imperfect -se': "\xe1semos",
                    future: "\xe1remos"
                },
                conditional: "ar\xedamos",
                imperative: 'emos'
            }
        },
        second: {
            singular: {
                indicative: {
                    present: {
                        tu: 'as',
                        vos: "\xe1s"
                    },
                    imperfect: 'abas',
                    preterite: 'aste',
                    future: "ar\xe1s"
                },
                subjunctive: {
                    present: {
                        tu: 'es',
                        vos: "\xe9s"
                    },
                    'imperfect -ra': 'aras',
                    'imperfect -se': 'ases',
                    future: 'ares'
                },
                conditional: "ar\xedas",
                imperative: {
                    affirmative: {
                        tu: 'a',
                        vos: "\xe1"
                    },
                    negative: {
                        tu: 'es',
                        vos: "\xe9s"
                    }
                }
            },
            plural: {
                indicative: {
                    present: "\xe1is",
                    imperfect: 'abais',
                    preterite: 'asteis',
                    future: "ar\xe9is"
                },
                subjunctive: {
                    present: "\xe9is",
                    'imperfect -ra': 'arais',
                    'imperfect -se': 'aseis',
                    future: 'areis'
                },
                conditional: "ar\xedais",
                imperative: {
                    affirmative: 'ad',
                    negative: "\xe9is"
                }
            }
        },
        third: {
            singular: {
                indicative: {
                    present: 'a',
                    imperfect: 'aba',
                    preterite: "\xf3",
                    future: "ar\xe1"
                },
                subjunctive: {
                    present: 'e',
                    'imperfect -ra': 'ara',
                    'imperfect -se': 'ase',
                    future: 'are'
                },
                conditional: "ar\xeda",
                imperative: 'e'
            },
            plural: {
                indicative: {
                    present: 'an',
                    imperfect: 'aban',
                    preterite: 'aron',
                    future: "ar\xe1n"
                },
                subjunctive: {
                    present: 'en',
                    'imperfect -ra': 'aran',
                    'imperfect -se': 'asen',
                    future: 'aren'
                },
                conditional: "ar\xedan",
                imperative: 'en'
            }
        }
    },
    ir: {
        infinitive: 'ir',
        gerund: 'iendo',
        'past participle': {
            singular: {
                masculine: 'ido',
                feminine: 'ida'
            },
            plural: {
                masculine: 'idos',
                feminine: 'idas'
            }
        },
        first: {
            singular: {
                indicative: {
                    present: 'o',
                    imperfect: "\xeda",
                    preterite: "\xed",
                    future: "ir\xe9"
                },
                subjunctive: {
                    present: 'a',
                    'imperfect -ra': 'iera',
                    'imperfect -se': 'iese',
                    future: 'iere'
                },
                conditional: "ir\xeda"
            },
            plural: {
                indicative: {
                    present: 'imos',
                    imperfect: "\xedamos",
                    preterite: 'imos',
                    future: 'iremos'
                },
                subjunctive: {
                    present: 'amos',
                    'imperfect -ra': "i\xe9ramos",
                    'imperfect -se': "i\xe9semos",
                    future: "i\xe9remos"
                },
                conditional: "ir\xedamos",
                imperative: 'amos'
            }
        },
        second: {
            singular: {
                indicative: {
                    present: {
                        tu: 'es',
                        vos: "\xeds"
                    },
                    imperfect: "\xedas",
                    preterite: {
                        tu: 'iste',
                        vos: 'istes'
                    },
                    future: "ir\xe1s"
                },
                subjunctive: {
                    present: {
                        tu: 'as',
                        vos: "\xe1s"
                    },
                    'imperfect -ra': 'ieras',
                    'imperfect -se': 'ieses',
                    future: 'ieres'
                },
                conditional: "ir\xedas",
                imperative: {
                    affirmative: {
                        tu: 'e',
                        vos: "\xed"
                    },
                    negative: {
                        tu: 'as',
                        vos: "\xe1s"
                    }
                }
            },
            plural: {
                indicative: {
                    present: "\xeds",
                    imperfect: "\xedais",
                    preterite: 'isteis',
                    future: "ir\xe9is"
                },
                subjunctive: {
                    present: "\xe1is",
                    'imperfect -ra': 'ierais',
                    'imperfect -se': 'ieseis',
                    future: 'iereis'
                },
                conditional: "ir\xedais",
                imperative: {
                    affirmative: 'id',
                    negative: "\xe1is"
                }
            }
        },
        third: {
            singular: {
                indicative: {
                    present: 'e',
                    imperfect: "\xeda",
                    preterite: "i\xf3",
                    future: "ir\xe1"
                },
                subjunctive: {
                    present: 'a',
                    'imperfect -ra': 'iera',
                    'imperfect -se': 'iese',
                    future: 'iere'
                },
                conditional: "ir\xeda",
                imperative: 'a'
            },
            plural: {
                indicative: {
                    present: 'en',
                    imperfect: "\xedan",
                    preterite: 'ieron',
                    future: "ir\xe1n"
                },
                subjunctive: {
                    present: 'an',
                    'imperfect -ra': 'ieran',
                    'imperfect -se': 'iesen',
                    future: 'ieren'
                },
                conditional: "ir\xedan",
                imperative: 'an'
            }
        }
    },
    er: {
        infinitive: 'er',
        gerund: 'iendo',
        'past participle': {
            singular: {
                masculine: 'ido',
                feminine: 'ida'
            },
            plural: {
                masculine: 'idos',
                feminine: 'idas'
            }
        },
        first: {
            singular: {
                indicative: {
                    present: 'o',
                    imperfect: "\xeda",
                    preterite: "\xed",
                    future: "er\xe9"
                },
                subjunctive: {
                    present: 'a',
                    'imperfect -ra': 'iera',
                    'imperfect -se': 'iese',
                    future: 'iere'
                },
                conditional: "er\xeda"
            },
            plural: {
                indicative: {
                    present: 'emos',
                    imperfect: "\xedamos",
                    preterite: 'imos',
                    future: 'eremos'
                },
                subjunctive: {
                    present: 'amos',
                    'imperfect -ra': "i\xe9ramos",
                    'imperfect -se': "i\xe9semos",
                    future: "i\xe9remos"
                },
                conditional: "er\xedamos",
                imperative: 'amos'
            }
        },
        second: {
            singular: {
                indicative: {
                    present: {
                        tu: 'es',
                        vos: "\xe9s"
                    },
                    imperfect: "\xedas",
                    preterite: {
                        tu: 'iste',
                        vos: 'istes'
                    },
                    future: "er\xe1s"
                },
                subjunctive: {
                    present: {
                        tu: 'as',
                        vos: "\xe1s"
                    },
                    'imperfect -ra': 'ieras',
                    'imperfect -se': 'ieses',
                    future: 'ieres'
                },
                conditional: "er\xedas",
                imperative: {
                    affirmative: {
                        tu: 'e',
                        vos: "\xe9"
                    },
                    negative: {
                        tu: 'as',
                        vos: "\xe1s"
                    }
                }
            },
            plural: {
                indicative: {
                    present: "\xe9is",
                    imperfect: "\xedais",
                    preterite: 'isteis',
                    future: "er\xe9is"
                },
                subjunctive: {
                    present: "\xe1is",
                    'imperfect -ra': 'ierais',
                    'imperfect -se': 'ieseis',
                    future: 'iereis'
                },
                conditional: "er\xedais",
                imperative: {
                    affirmative: 'ed',
                    negative: "\xe1is"
                }
            }
        },
        third: {
            singular: {
                indicative: {
                    present: 'e',
                    imperfect: "\xeda",
                    preterite: "i\xf3",
                    future: "er\xe1"
                },
                subjunctive: {
                    present: 'a',
                    'imperfect -ra': 'iera',
                    'imperfect -se': 'iese',
                    future: 'iere'
                },
                conditional: "er\xeda",
                imperative: 'a'
            },
            plural: {
                indicative: {
                    present: 'en',
                    imperfect: "\xedan",
                    preterite: 'ieron',
                    future: "er\xe1n"
                },
                subjunctive: {
                    present: 'an',
                    'imperfect -ra': 'ieran',
                    'imperfect -se': 'iesen',
                    future: 'ieren'
                },
                conditional: "er\xedan",
                imperative: 'an'
            }
        }
    }
};
exports.endingsAux = {
    first: {
        singular: {
            indicative: {
                perfect: 'he',
                pluperfect: "hab\xeda",
                'future perfect': "habr\xe9",
                'preterite perfect': 'hube'
            },
            subjunctive: {
                perfect: 'haya',
                pluperfect: 'hubiera',
                'future perfect': 'hubiere'
            },
            conditional: {
                perfect: "habr\xeda"
            }
        },
        plural: {
            indicative: {
                perfect: 'hemos',
                pluperfect: "hab\xedamos",
                'future perfect': 'habremos',
                'preterite perfect': 'hubimos'
            },
            subjunctive: {
                perfect: 'hayamos',
                pluperfect: "hubi\xe9ramos",
                'future perfect': "hubi\xe9remos"
            },
            conditional: {
                perfect: "habr\xedamos"
            }
        }
    },
    second: {
        singular: {
            indicative: {
                perfect: 'has',
                pluperfect: "hab\xedas",
                'future perfect': "habr\xe1s",
                'preterite perfect': 'hubiste'
            },
            subjunctive: {
                perfect: 'hayas',
                pluperfect: 'hubieras',
                'future perfect': 'hubieres'
            },
            conditional: {
                perfect: "habr\xedas"
            }
        },
        plural: {
            indicative: {
                perfect: "hab\xe9is",
                pluperfect: "hab\xedais",
                'future perfect': "habr\xe9is",
                'preterite perfect': 'hubisteis'
            },
            subjunctive: {
                perfect: "hay\xe1is",
                pluperfect: 'hubierais',
                'future perfect': 'hubiereis'
            },
            conditional: {
                perfect: "habr\xedais"
            }
        }
    },
    third: {
        singular: {
            indicative: {
                perfect: 'ha',
                pluperfect: "hab\xeda",
                'future perfect': "habr\xe1",
                'preterite perfect': 'hubo'
            },
            subjunctive: {
                perfect: 'haya',
                pluperfect: 'hubiera',
                'future perfect': 'hubiere'
            },
            conditional: {
                perfect: "habr\xeda"
            }
        },
        plural: {
            indicative: {
                perfect: 'han',
                pluperfect: "hab\xedan",
                'future perfect': "habr\xe1n",
                'preterite perfect': 'hubieron'
            },
            subjunctive: {
                perfect: 'hayan',
                pluperfect: 'hubieran',
                'future perfect': 'hubieren'
            },
            conditional: {
                perfect: "habr\xedan"
            }
        }
    }
};

},{}]},["doc2t","feIgE"], "feIgE", "parcelRequireb11d", {})

//# sourceMappingURL=homeroom.d2ddbab1.js.map

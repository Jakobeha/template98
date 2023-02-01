#! /usr/bin/env node
// noinspection NodeCoreCodingAssistance

// region Boilerplate
const esbuild = require('esbuild')
const builtinModules = require('builtin-modules')
const fs = require('fs')
const path = require('path')

function readdir (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

/** Derived from https://stackoverflow.com/questions/46390733/recursively-read-a-directories-with-a-folder */
async function traverse (dir, accumulator = []) {
  for (const fileName of await readdir(dir)) {
    const filePath = path.resolve(dir, fileName)
    if (fs.statSync(filePath).isDirectory()) {
      await traverse(filePath, accumulator)
    } else {
      accumulator.push(filePath)
    }
  }
  return accumulator
}

const nodeModules = builtinModules.flatMap(moduleName => [moduleName, `node:${moduleName}`])
// endregion

// region build functions
/** ES-modules unminified build */
function libraryBuild (name, src, outdir) {
  traverse(src).then(entryPoints => {
    esbuild.build({
      entryPoints,
      sourcemap: true,
      minify: false,
      format: 'esm',
      outdir,
      watch: process.argv.includes('--watch')
    }).catch(err => {
      console.error(`${name} build failed`, err)
    })
  }).catch(err => {
    console.error(`${name} build failed; traversing library files failed`, err)
  })
}

/** commonjs browser/node unminified build */
function binaryBuild (name, entryPoints, outdir) {
  esbuild.build({
    entryPoints,
    sourcemap: true,
    bundle: true,
    minify: false,
    format: 'esm',
    target: 'esnext',
    platform: 'neutral',
    mainFields: ['module', 'main'],
    outdir,
    define: {
      'import.meta.url': 'importMetaUrl'
    },
    inject: ['polyfills.js'],
    watch: process.argv.includes('--watch'),
    external: nodeModules
  }).catch(err => {
    console.error(`${name} build failed`, err)
  })
}
// endregion

// region the builds
libraryBuild('Library', 'lib', 'out/lib')
binaryBuild('Binary', ['bin/index.ts'], 'out/bin')
binaryBuild('Testsuite', ['tests/index.ts'], 'out/tests')

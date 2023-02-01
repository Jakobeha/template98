// bin.ts requires polyfills for the browser build

export const importMetaUrl =
  typeof document === 'undefined'
    ? new URL('file:' + process.cwd()).href
    : ((document.currentScript && document.currentScript.src) || new URL('index.js', document.baseURI).href)

globalThis.require = name => {
  switch (name) {
    case 'util':
      // Unfortunately somewhere platform_node requires util
      return {
        TextEncoder,
        TextDecoder
      }
    default:
      console.error(`CommonJS-style unresolved require of ${name}`)
      return null
  }
}

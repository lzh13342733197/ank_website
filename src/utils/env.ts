export const isServer = typeof globalThis === 'undefined'
export const isClient = !isServer

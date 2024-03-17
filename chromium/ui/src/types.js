/**
 * @typedef {object} View
 * @property {string} name
 * @property {import('svelte').ComponentType} component
 * @property {import('svelte').ComponentType} icon
 */

/**
 * @typedef {object} EventPayload
 * @property {string} type
 * @property {any} data
 */

/**
 * @typedef {object} TimeoutProperty
 * @property {number} [timeout=3000]
 */

/**
 * @typedef {EventPayload & TimeoutProperty} RequestPayload
 */

/**
 * @callback EventEmitterOnFunction
 * @param {string} name
 * @param {(...args: any[]) => void} fn
 * @returns {void}
 */

/**
 * @typedef {EventEmitterOnFunction} EventEmitterOnceFunction
 */

/**
 * @typedef {EventEmitterOnFunction} EventEmitterOffFunction
 */

/**
 * @callback EventEmitterEmitFunction
 * @param {string} name
 * @param {...any} args
 * @returns {void}
 */

/**
 * @typedef {object} EventEmitter
 * @property {EventEmitterOnFunction} on
 * @property {EventEmitterOnceFunction} once
 * @property {EventEmitterOffFunction} off
 * @property {EventEmitterEmitFunction} emit
 */

/**
 * @callback RequestFunction
 * @param {RequestPayload} payload
 * @returns {Promise<any>}
 */

/**
 * @callback EventFunction
 * @param {EventPayload} payload
 * @returns {void}
 */

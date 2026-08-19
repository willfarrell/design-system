/* eslint-env browser */
/* global trustedTypes */

// create pewc trustedTypesPolicy
// const link = d.querySelector(`link[href*="/trustedtypes-"][href$=".js"]`);
// const scriptURL = link?.href ?? `/js/pewc/trustedtypes.js`
// const createPolicy = await import(scriptURL);
// await createPolicy('pewc')

// lock registry, import last so every policy is created first
if (typeof trustedTypes !== "undefined") Object.freeze(trustedTypes);

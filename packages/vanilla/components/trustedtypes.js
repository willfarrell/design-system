let policy
let initPromise;
const createPolicy = async (policyName = 'pewc') => {
  if (!policy) {
    if (!initPromise) {
      initPromise = Promise.resolve().then(() => {
        policy = trustedTypes.createPolicy(policyName, {
          // createHTML when needed
        })
      })
    }
    await initPromise;
  }
  return policy
}

export default createPolicy

/*

// TODO https://caniuse.com/mdn-api_element_sethtml
// import DOMPurify from "dompurify";
const trustedTypePolicyDefaults = {
  createHTML: (string) => string,
		// DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: false }),
	createScript: (string) => {
		const url = new URL(string);
		// Only allow same-origin
		return url.pathname + url.hash + url.search;
	},
	createScriptURL: (string) => string,
};

const trustedTypePolicy = trustedTypes.createPolicy("ds", {
	...trustedTypePolicyDefaults,
	// Disabled, only trusted sources used
	// createHTML: (string) => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: false }) // 9kb br :(
});

*/

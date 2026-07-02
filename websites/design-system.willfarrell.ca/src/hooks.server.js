// import localeMiddleware from "@hooks/localeMiddleware.js";
import applyCacheControlMiddleware from "@design-system/hooks/applyCacheControlMiddleware.js";
// import applyContentEncodingMiddleware from "@design-system/hooks/applyContentEncodingMiddleware.js";
import removeCommentsMiddleware from "@design-system/hooks/removeCommentsMiddleware.js";
import removeDuplicateImportMiddleware from "@design-system/hooks/removeDuplicateImportMiddleware.js";
import removeOnEventsMiddleware from "@design-system/hooks/removeOnEventsMiddleware.js";
import tardisecMiddleware from "@hooks/tardisecMiddleware.js";
import { sequence } from "@sveltejs/kit/hooks";

// export {init} from '@hooks/init.js'
export { handleError } from "./hooks/handleError.js";

export const handle = sequence(
	// localeMiddleware,
	// applyContentEncodingMiddleware,
	applyCacheControlMiddleware,
	tardisecMiddleware,
	removeCommentsMiddleware,
	removeOnEventsMiddleware,
	removeDuplicateImportMiddleware,
);

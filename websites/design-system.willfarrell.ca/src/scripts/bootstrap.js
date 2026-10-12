//import "@willfarrell-ds/vanilla/bootstrap/config.js";
import "@willfarrell-ds/vanilla/bootstrap/serviceworker.js";
import offlineClient from "@work-bee/offline/client";
// import designTokens from "@willfarrell-ds/vanilla/index.tokens.json" with {
// 	type: "json",
// };
import "@willfarrell-ds/vanilla/bootstrap/webcomponents.js";
import "@willfarrell-ds/vanilla/bootstrap/tooltip.js";
import "@willfarrell-ds/vanilla/bootstrap/keyshortcuts.js";
// last: it freezes the trustedTypes registry
import "@willfarrell-ds/vanilla/bootstrap/trustedtypes.js";

offlineClient();

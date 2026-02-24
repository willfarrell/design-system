#!/usr/bin/env node
// #!/usr/bin/env -S node --experimental-json-modules --no-warnings

import { Command, Option } from "commander";
import extract from "./commands/extract.js";
import inline from "./commands/inline.js";
import optimizeStyles from "./commands/optimizeStyles.js";

const program = new Command()
	.name("ds")
	//.version(metadata.version)
	.description("CI tooling for your design system");

program
	.command("extract", { isDefault: true })
	.argument("<dir>", "Path to the build folder with .html files")
	.addOption(
		new Option("--theme <theme>", "Where theme styles are located").default(
			"@design-system/style/theme.css",
		),
	)
	.addOption(new Option("--css-path <path>", "Where you want the css saved"))
	//.addOption(new Option('--js-path <path>', 'Where bootstreap should be saved'))
	//.addOption(new Option('--pewc-dir <path>', 'Where pewc files should be copied'))
	.addOption(new Option("--debug", "log debug information").preset(true))
	.action(extract);

program
	.command("inline")
	.argument("<dir>", "Directory to apply changes to")
	.argument("<input>", "Path to css/js file to inline into all html files")
	.addOption(new Option("--debug", "log debug information").preset(true))
	.action(inline);

program
	.command("optimize-styles")
	.argument("<dir>", "Directory to apply changes to")
	.addOption(new Option("--iterations", "number of passes to do").preset(10))
	.addOption(new Option("--prefix", "variable prefix").preset("ds-")) // TODO use
	.addOption(new Option("--debug", "log debug information").preset(true))
	.action(optimizeStyles);

program.parse();

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
	.addOption(
		new Option(
			"--input-dir <paths...>",
			"Paths to directories with .html/.js files",
		),
	)
	.addOption(
		new Option("--theme <theme>", "Where theme styles are located").default(
			"@willfarrell-ds/vanilla/theme.css",
		),
	)
	.addOption(
		new Option("--output-dir <path>", "Directory where css files are saved"),
	)
	//.addOption(new Option('--js-path <path>', 'Where bootstrap should be saved'))
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
	.description(
		`Optimize CSS files in a directory.

Optimizations:
  - Inline single-use CSS custom properties (variables)
  - Simplify calc(), min(), max(), clamp() with static values
  - Partially simplify calc() by combining like-unit terms
  - Simplify calc() expressions containing var()
  - Convert color functions to hex (rgb, hsl, hwb, lab, lch, oklab, oklch)
  - Convert color(srgb ...) and color(srgb-linear ...) to hex
  - Resolve color-mix(in srgb, ...) to hex
  - Shorten hex colors (#aabbcc -> #abc, #aabbccdd -> #abcd)
  - Strip units from zero values (0px -> 0, 0rem -> 0)
  - Remove inherited properties that match body declarations
  - Remove CSS block comments
  - Remove empty rules`,
	)
	.argument("<dir>", "Directory to apply changes to")
	.addOption(
		new Option("--iterations", "number of passes to do").default(10).preset(10),
	)
	//.addOption(new Option("--prefix", "variable prefix").preset("ds-")) // TODO use
	.addOption(new Option("--debug", "log debug information").preset(true))
	.action(optimizeStyles);

program.parse();

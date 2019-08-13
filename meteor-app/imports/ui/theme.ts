/*
 ------------ the nomenclature used for these colors. --------------------
main - The primary color of the brand. Not the most commonly used color.
accent - A color that is distinctive and rarly used. Use to draw attention to a particularly importaint thing.
*Variant - A color that is a little different than *.

 */

const theme = {
	main: "hsl(204, 63%, 55%)",
	mainVariant: "#0480EA",
	accent: "hsl(48, 99%, 50%)",
	error: "red",

	background: "hsl(0, 0%, 95%)",
	// The background color of most things that have things in them.
	surface: "white",
	surfaceAccent: "hsl(240, 4%, 14%)",

	// The "on" colors.
	// Used for things like text and symbols.
	onMain: "white",
	onAccent: "white",
	onBackground: "#333",
	onSurface: "#333",
	onSurfaceAccent: "#cbcbcb",
	onError: "white",

	// The "weak" colors.
	// Used for things that are subtle, disabled, or placeholders.
	onMainWeak: "white",
	onBackgroundWeak: "lightgrey",
	onSurfaceWeak: "lightgrey",
	onSurfaceAccentWeak: "#cbcbcb",
};

export default theme;

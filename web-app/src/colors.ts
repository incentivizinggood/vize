/** The color pallette to use across the website. */
const colors = {
	main: "hsl(204, 63%, 55%)",
	mainVariant: "#0480EA",
	accent: "hsl(48, 99%, 50%)",
	error: "red",

	background: "rgb(241, 249, 255)",

	backgroundImage: "linear-gradient(to top, #1da1f2, #64b7f5, #93cdf8, #bfe2fb, #eaf7ff)",
	// The background color of most things that have things in them. It is a light gray color

	vizeBlue: "#439bd5",

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

	/** The legacy variables used in styles. These are the same as in
	 * src/sass/base/_variables.scss. We repeat them here so that they can be
	 * used in newly converted styled components.
	 */
	old: {
		concrete: "#f2f2f2",
		seashell: "#f1f1f1",
		outerSpace: "#343a40",
		vizeBlue: "#439bd5",
		secondaryColorRed: "#e35",
		gallery: "#f0f0f0",
		pictonBlue: "#58ace4",
	},
};

export default colors;

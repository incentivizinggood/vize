/** The color pallette to use across the website. */
const colors = {
	primaryColorBlue: "#1da1f2",
	secondaryColorGreen: "#188038",
	tertiaryColorLightBlue: "#eaf7ff",

	// Used for the hover color of a primary button
	darkPrimaryBlue: "rgb(26, 145, 218)",

	// Used for secondary button hover background color
	lightGray: "rgba(15, 20, 25, 0.1)",

	// Used for button border color
	darkGray: "rgb(207, 217, 222)",

	errorBackground: "red",
	errorText: "white",

	// The "weak" colors.
	// Used for things that are subtle, disabled, or placeholders.
	onMainWeak: "white",
	onBackgroundWeak: "lightgrey",
	onSurfaceWeak: "lightgrey",
	onSurfaceAccentWeak: "#cbcbcb",
};

// Box Shadow Colors taken from https://getcssscan.com/css-box-shadow-examples
const boxShadow = {
	// use the "wide" option as the default. If it doesn't look good you can use the narrow option instead
	wide: "rgba(149, 157, 165, 0.2) 0px 8px 24px", // box shadow #0 from list of examples
	narrow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px", // box shadow #9 from list of examples
};

const borderRadius = {
	container: "16px",
	containerMobile: "10px",
	smallImage: "8px",
	button: "30px",
};

export { colors, boxShadow, borderRadius };

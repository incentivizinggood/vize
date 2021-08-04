const boundary = {
	// Small devices (landscape phones, 576px and down)
	phoneMaxWidth: "576px",
	// Medium devices (tablets, 768px and down)
	tabletPortraitMaxWidth: "768px",
	// Large devices (tablet landscape, 992px and down)
	tabletLandscapeMaxWidth: "992px",
	// Extra large devices (desktops, 1200px and down)
	desktopMaxWidth: "1291px",
};

// Media queries for the different screen catagories that we support.
const forSize = {
	desktopAndDown: `@media (max-width: ${boundary.desktopMaxWidth})`,
	tabletLandscapeAndDown: `@media (max-width: ${boundary.tabletLandscapeMaxWidth})`,
	tabletAndDown: `@media (max-width: ${boundary.tabletPortraitMaxWidth})`,
	phoneOnly: `@media (max-width: ${boundary.phoneMaxWidth})`,
};

export { forSize, boundary };

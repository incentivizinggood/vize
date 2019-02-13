import React from "react";

import withScroll from "/imports/ui/hoc/scroll.jsx";
import style from "./style.scss";

function FadableNav(props) {
	// How far down that the user can scroll before the navbar goes opaque.
	const threshold = 100;

	const X = ({ opaque }) => (
		<nav className={opaque ? style.navbarOpaque : null}>
			{props.children}
		</nav>
	);

	if (props.animated) {
		// Animated; The navbar fades to opaque after the page is scrolled down.
		const Y = withScroll(({ scroll }) => <X opaque={scroll > threshold} />);
		return <Y />;
	}
	// No animation; The navbar is always opaque.
	return <X opaque />;
}

export default FadableNav;

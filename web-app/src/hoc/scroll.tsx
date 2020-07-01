import React from "react";

function useScroll() {
	const [scroll, setScroll] = React.useState(window.pageYOffset);

	React.useEffect(() => {
		function handleScroll() {
			setScroll(window.pageYOffset);
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return scroll;
}

// Get the window's scroll position as a prop.
export default function withScroll<OuterProps>(
	WrappedComponent: React.ComponentType<OuterProps & { scroll: number }>
) {
	return function(props: OuterProps) {
		const scroll = useScroll();
		return <WrappedComponent {...props} scroll={scroll} />;
	};
}

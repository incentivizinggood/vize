import React from "react";

// Get the window's scroll position as a prop.
export default function withScroll<OuterProps>(
	WrappedComponent: React.ComponentType<OuterProps & { scroll: number }>
) {
	return class extends React.Component<OuterProps, { scroll: number }> {
		constructor(props: OuterProps) {
			super(props);

			this.state = {
				scroll: window.pageYOffset,
			};

			// These bindings are necessary to make `this` work in callbacks.
			this.handleScroll = this.handleScroll.bind(this);
		}

		componentDidMount() {
			window.addEventListener("scroll", this.handleScroll);
		}

		componentWillUnmount() {
			window.removeEventListener("scroll", this.handleScroll);
		}

		handleScroll() {
			this.setState({
				scroll: window.pageYOffset,
			});
		}

		render() {
			return (
				<WrappedComponent {...this.props} scroll={this.state.scroll} />
			);
		}
	};
}

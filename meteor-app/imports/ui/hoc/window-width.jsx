import React from "react";

export default function withWindowWidth(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				windowWidth: window.innerWidth,
			};
			this.handleResize = this.handleResize.bind(this);
		}

		componentDidMount() {
			window.addEventListener("resize", this.handleResize);
		}

		componentWillUnmount() {
			window.removeEventListener("resize", this.handleResize);
		}

		handleResize() {
			this.setState({ windowWidth: window.innerWidth });
		}

		render() {
			return (
				<WrappedComponent
					{...this.props}
					windowWidth={this.state.windowWidth}
				/>
			);
		}
	};
}

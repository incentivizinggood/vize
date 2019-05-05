import React from "react";

function HoverPanelContainer(props) {
	return (
		<div className="container">
			<div className="col-md-12">
				<center>{props.children}</center>
			</div>
			<div className="clearfix" />
		</div>
	);
}

export default HoverPanelContainer;

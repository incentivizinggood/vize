import React from "react";
import { Link } from "react-router-dom";

function HoverPanel(props) {
	return (
		<div className="hover panel-hm">
			<div className="front">
				<div className="frontTitle">{props.header}</div>
				<img className="frontLogo" src={props.logo} />
				<div className="frontLocation">{props.text}</div>
				{props.link && (
					<>
						<br />
						<div className="fl-ri-re">
							<Link
								to={props.link.to}
								className="btn btn-primary"
							>
								{props.link.content}
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default HoverPanel;

import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Reviews } from "../../api/data/reviews.js";

export default class VoteButtons extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<div>
			<br />
			<div  className="thumb_up_bn">
			   <button type="button" className="btn btn-default btn-circle btn-xl"> <i  className="fa fa-thumbs-o-up  "></i></button>
			</div>
			<br />
			<div  className="thumb_don_bn">
			   <button type="button" className="btn btn-default btn-circle btn-xl">  <i   className="fa fa-thumbs-o-down"></i></button>
			</div>
		</div>);
	}
}

import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
//import { Votes } from "../../api/data/votes.js";

class VoteButtons extends React.Component {
	constructor(props) {
		super(props);
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);
		this.state = {
			upVotes: 0,
			downVotes: 0,
		}
		console.log("Constructing buttons for review " + this.props.review._id);
	}

	upVote(event) {
		event.preventDefault();
		Meteor.call("reviews.changeVote", this.props.review, true, (error, result) => {
			if(!result) {
				console.log("Messed up upvote");
			}
			else {
				// Change state here if you want to reactively update
				// based on user vote
				this.setState((prevState) => {
						return {upVotes: prevState.upVotes+1};
				});
				console.log("Upvoting review " + this.props.review._id + ": " + this.props.review.upvotes);
			}
		});
	}

	downVote(event) {
		event.preventDefault();
		Meteor.call("reviews.changeVote", this.props.review, false, (error, result) => {
			if(!result) {
				console.log("Messed up downvote");
			}
			else {
				// Change state here if you want to reactively update
				// based on user vote
				this.setState((prevState) => {
						return {downVotes: prevState.downVotes+1};
				});
				console.log("Downvoting review " + this.props.review._id + ": " + this.props.review.downvotes);
			}
		});
	}

	render() {
		return(
			<div>
				<br />
				<div  className="thumb_up_bn">
					<button type="button" className="btn btn-default btn-circle btn-xl" onClick={this.upVote}>
						<i  className="fa fa-thumbs-o-up  "></i>
					</button>
				</div>
				<br />
				<div  className="thumb_don_bn">
					<button type="button" className="btn btn-default btn-circle btn-xl" onClick={this.downVote}>
						<i   className="fa fa-thumbs-o-down"></i>
					</button>
				</div>
			</div>
		);
	}
}

export default withTracker(({ review }) => {
	/*
		Will need the Votes subscription and stuff
		if/when we're ready to make sure the button
		colors persist across refreshes based on the
		user's vote
	*/
	//let voteHandle = Meteor.subscribe("Votes");
	return {
		//isReady: voteHandle.ready(),
		review: review,
		//vote: Votes.findOne({reviewId: review._id, submittedBy: this.userId}),
	};
})(VoteButtons);

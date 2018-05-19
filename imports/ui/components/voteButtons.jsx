import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
//import { Votes } from "../../api/data/votes.js";

class VoteButtons extends React.Component {
	constructor(props) {
		super(props);
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);
		this.renderUpButton = this.renderUpButton.bind(this);
		this.renderDownButton = this.renderDownButton.bind(this);
		if (Meteor.isDevelopment) {
			this.state = {
				upVotes: 0,
				downVotes: 0,
			};
		}
	}

	upVote(event) {
		event.preventDefault();
		Meteor.call(
			"reviews.changeVote",
			this.props.review,
			true,
			(error, result) => {
				if (!result) {
					console.log("Messed up upvote");
					console.log(error);
				} else {
					// Change state here if you want to reactively update
					// based on user vote
					if (Meteor.isDevelopment) {
						this.setState(prevState => {
							return { upVotes: prevState.upVotes + 1 };
						});
						console.log(
							"Upvoting review " +
								this.props.review._id +
								": " +
								this.props.review.upvotes
						);
					}
				}
			}
		);
	}

	downVote(event) {
		event.preventDefault();
		Meteor.call(
			"reviews.changeVote",
			this.props.review,
			false,
			(error, result) => {
				if (!result) {
					console.log("Messed up downvote");
					console.log(error);
				} else {
					// Change state here if you want to reactively update
					// based on user vote
					if (Meteor.isDevelopment) {
						this.setState(prevState => {
							return { downVotes: prevState.downVotes + 1 };
						});
						console.log(
							"Downvoting review " +
								this.props.review._id +
								": " +
								this.props.review.downvotes
						);
					}
				}
			}
		);
	}

	renderUpButton() {
		return (
			<div className="thumb_up_bn">
				<button
					type="button"
					className="btn btn-default btn-circle btn-xl"
					style={this.props.upStyle}
					onClick={this.upVote}
				>
					<i className="fa fa-thumbs-o-up  " />
				</button>
			</div>
		);
	}

	renderDownButton() {
		return (
			<div className="thumb_don_bn">
				<button
					type="button"
					className="btn btn-default btn-circle btn-xl"
					style={this.props.downStyle}
					onClick={this.downVote}
				>
					<i className="fa fa-thumbs-o-down" />
				</button>
			</div>
		);
	}

	render() {
		return (
			<div>
				<br />
				{this.renderUpButton()}
				<br />
				{this.renderDownButton()}
			</div>
		);
	}
}

export default withTracker(({ review, userVotes }) => {
	// One of the more ridiculous pieces of code I've had to write
	let userVote = userVotes.findOne({
		submittedBy: Meteor.userId(),
		references: review._id,
		voteSubject: "review",
	});
	let upButtonStyle =
		userVote === undefined || userVote.value === false
			? { backgroundColor: "transparent" }
			: { backgroundColor: "green" };
	let downButtonStyle =
		userVote === undefined || userVote.value === true
			? { backgroundColor: "transparent" }
			: { backgroundColor: "red" };
	return {
		review: review,
		vote: userVote,
		upStyle: upButtonStyle,
		downStyle: downButtonStyle,
	};
})(VoteButtons);

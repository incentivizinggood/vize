import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Votes } from "/imports/api/data/votes.js";

function VoteButtons(props) {
	const vote = isUpvote => {
		Meteor.call("reviews.changeVote", props.review.id, isUpvote, error => {
			props.refetch();
			if (error) {
				console.log(`Messed up ${isUpvote ? "upvote" : "downvote"}`);
				console.error(error);
			} else {
				console.log(
					`We just ${isUpvote ? "upvoted" : "downvoted"}the review ${
						props.review.id
					}`
				);
			}
		});
	};

	const upVote = event => {
		event.preventDefault();
		vote(true);
	};

	const downVote = event => {
		event.preventDefault();
		vote(false);
	};

	const upButton = (
		<div className="thumb_up_bn">
			<button
				type="button"
				className="btn btn-default btn-circle btn-xl"
				style={props.upStyle}
				onClick={upVote}
			>
				<i className="fa fa-thumbs-o-up  " />
			</button>
		</div>
	);

	const downButton = (
		<div className="thumb_don_bn">
			<button
				type="button"
				className="btn btn-default btn-circle btn-xl"
				style={props.downStyle}
				onClick={downVote}
			>
				<i className="fa fa-thumbs-o-down" />
			</button>
		</div>
	);

	return (
		<div>
			<br />
			{upButton}
			<br />
			{downButton}
		</div>
	);
}

export default withTracker(({ review, refetch }) => {
	// One of the more ridiculous pieces of code I've had to write
	const userVote = Votes.findOne({
		submittedBy: Meteor.userId(),
		references: review.id,
		voteSubject: "review",
	});
	const upButtonStyle =
		userVote === undefined || userVote.value === false
			? { backgroundColor: "transparent" }
			: { backgroundColor: "green" };
	const downButtonStyle =
		userVote === undefined || userVote.value === true
			? { backgroundColor: "transparent" }
			: { backgroundColor: "red" };
	return {
		review,
		refetch,
		vote: userVote,
		upStyle: upButtonStyle,
		downStyle: downButtonStyle,
	};
})(VoteButtons);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Meteor } from "meteor/meteor";

export default function VoteButtons(props) {
	const vote = isUpvote => event => {
		event.preventDefault();
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

	const isUp =
		props.review.currentUserVote && props.review.currentUserVote.isUpvote;

	const isDown =
		props.review.currentUserVote && !props.review.currentUserVote.isUpvote;

	const upButtonStyle = isUp
		? { backgroundColor: "green" }
		: { backgroundColor: "transparent" };

	const downButtonStyle = isDown
		? { backgroundColor: "red" }
		: { backgroundColor: "transparent" };

	const upButton = (
		<div className="thumb_up_bn">
			<button
				type="button"
				className="btn btn-default btn-circle btn-xl"
				style={upButtonStyle}
				onClick={vote(true)}
			>
				<FontAwesomeIcon icon="thumbs-up" />
			</button>
		</div>
	);

	const downButton = (
		<div className="thumb_don_bn">
			<button
				type="button"
				className="btn btn-default btn-circle btn-xl"
				style={downButtonStyle}
				onClick={vote(false)}
			>
				<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
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

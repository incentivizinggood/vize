import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Meteor } from "meteor/meteor";

import style from "./vote-buttons.scss";

export default function VoteButtons(props) {
	const { review, refetch, className, ...otherProps } = props;
	const vote = isUpvote => event => {
		event.preventDefault();
		Meteor.call("reviews.changeVote", review.id, isUpvote, error => {
			refetch();
			if (error) {
				console.log(`Messed up ${isUpvote ? "upvote" : "downvote"}`);
				console.error(error);
			} else {
				console.log(
					`We just ${isUpvote ? "upvoted" : "downvoted"}the review ${
						review.id
					}`
				);
			}
		});
	};

	let curVote;
	if (review.currentUserVote) {
		curVote = review.currentUserVote.isUpvote ? "up" : "down";
	} else {
		curVote = "none";
	}

	return (
		<div
			{...otherProps}
			className={style.voteButtons + (className || "")}
			data-vote={curVote}
		>
			<button
				type="button"
				className={style.upButton}
				onClick={vote(true)}
			>
				<FontAwesomeIcon icon="thumbs-up" />
			</button>
			<button
				type="button"
				className={style.downButton}
				onClick={vote(false)}
			>
				<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
			</button>
		</div>
	);
}

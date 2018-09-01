import React from "react";

import { Meteor } from "meteor/meteor";

import style from "./vote-buttons.scss";

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

	let curVote;
	if (props.review.currentUserVote) {
		curVote = props.review.currentUserVote.isUpvote ? "up" : "down";
	} else {
		curVote = "none";
	}

	return (
		<div className={style.voteButtons} data-vote={curVote}>
			<button
				type="button"
				className={style.upButton}
				onClick={vote(true)}
			>
				<span role="img" aria-label="thumbs up">
					&#x1f44d;
				</span>
			</button>
			<button
				type="button"
				className={style.downButton}
				onClick={vote(false)}
			>
				<span role="img" aria-label="thumbs down">
					&#x1f44e;
				</span>
			</button>
		</div>
	);
}

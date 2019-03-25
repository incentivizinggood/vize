import React from "react";
import { Mutation } from "react-apollo";

import style from "./vote-buttons.scss";
import voteButtonsQuery from "./vote-buttons.graphql";
import VoteButton from "./vote-button.jsx";

function voteToString(vote) {
	if (vote === null || vote.isUpvote === null) {
		return "none";
	} else if (vote.isUpvote) {
		return "up";
	} else {
		return "down";
	}
}

export default function VoteButtons(props) {
	const { review, className, ...otherProps } = props;

	return (
		<Mutation mutation={voteButtonsQuery}>
			{castVote => (
				<div
					{...otherProps}
					className={style.voteButtons + (className || "")}
					data-vote={voteToString(review.currentUserVote)}
				>
					<VoteButton isUpButton {...{ castVote, review }} />
					<VoteButton {...{ castVote, review }} />
				</div>
			)}
		</Mutation>
	);
}

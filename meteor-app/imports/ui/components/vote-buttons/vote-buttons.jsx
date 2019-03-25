import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mutation } from "react-apollo";

import style from "./vote-buttons.scss";
import voteButtonsQuery from "./vote-buttons.graphql";
import VoteButton from "./vote-button.jsx";

export default function VoteButtons(props) {
	const { review, refetch, className, ...otherProps } = props;

	let curVote;
	if (review.currentUserVote) {
		curVote = review.currentUserVote.isUpvote ? "up" : "down";
	} else {
		curVote = "none";
	}

	return (
		<Mutation mutation={voteButtonsQuery}>
			{(castVote, stuff) => {
				console.log(stuff);
				return (
					<div
						{...otherProps}
						className={style.voteButtons + (className || "")}
						data-vote={curVote}
					>
						<VoteButton isUpButton {...{ castVote, review }} />
						<VoteButton {...{ castVote, review }} />
					</div>
				);
			}}
		</Mutation>
	);
}

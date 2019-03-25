import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./vote-buttons.scss";

export default function VoteButton({ isUpButton, castVote, review }) {
	return (
		<button
			type="button"
			className={isUpButton ? style.upButton : style.downButton}
			onClick={event => {
				console.log(
					`Clicked the ${isUpButton ? "up" : "down"} button.`
				);
				event.preventDefault();
				castVote({
					variables: {
						input: {
							isUpvote:
								review.currentUserVote !== null &&
								review.currentUserVote.isUpvote === isUpButton
									? null
									: isUpButton,
							subjectId: review.id,
						},
					},
				});
			}}
		>
			{isUpButton ? (
				<FontAwesomeIcon icon="thumbs-up" />
			) : (
				<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
			)}
		</button>
	);
}

import React from "react";
import Popup from "reactjs-popup";

import { translations as T } from "imports/ui/translations";

/**
 * This commponent was made to help convert the resources-workers and
 * resources-employers pages to use reactjs-popup. This component and those
 * pages still need some refactoring.
 */
function ModalText({ title, content }) {
	return (
		<Popup
			trigger={
				<button className="btn btn-success button">
					<T.resourcesWorkers.readMore />
				</button>
			}
			modal
			closeOnDocumentClick
			overlayStyle={{ maxWidth: "none" }}
		>
			<h1>{title}</h1>
			{content}
		</Popup>
	);
}

export default ModalText;

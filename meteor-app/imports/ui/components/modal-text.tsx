import React from "react";
import Popup from "reactjs-popup";

import { i18n } from "meteor/universe:i18n";

const T = i18n.createComponent();

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
					<T>common.resourcesWorkers.readMore</T>
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

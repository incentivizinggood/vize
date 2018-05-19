import React from "react";

/* The "404" page.
 * Note: This is not technicaly a 404 page because the server
 *       is not actualy sending a 404 error to an HTTP reqest.
 */
export default class NotFoundPage extends React.Component {
	render() {
		return (
			<div className="page not-found">
				<h1>404</h1>
				<h2>That page could not be found.</h2>
			</div>
		);
	}
}

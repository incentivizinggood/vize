import React from "react";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

function PageWrapper(props) {
	// Set the page's title.
	React.useEffect(() => {
		document.title = props.title || "Vize";
	});

	return (
		<div>
			<Header navIsAnimated={props.navIsAnimated} />
			{props.children}
			<Footer />
		</div>
	);
}

export default PageWrapper;

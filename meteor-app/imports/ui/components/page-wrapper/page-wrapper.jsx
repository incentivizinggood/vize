import React from "react";

import Dialog from "/imports/ui/components/dialog-box";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";

function PageWrapper(props) {
	return (
		<div>
			<Header navIsAnimated={props.navIsAnimated} />
			{props.children}
			<Dialog />
			<Footer />
		</div>
	);
}

export default PageWrapper;

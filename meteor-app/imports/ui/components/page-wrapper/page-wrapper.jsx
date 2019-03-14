import React from "react";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.tsx";

function PageWrapper(props) {
	return (
		<div>
			<Header navIsAnimated={props.navIsAnimated} />
			{props.children}
			<Footer />
		</div>
	);
}

export default PageWrapper;

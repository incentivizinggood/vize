import React from "react";
import { Link } from "react-router-dom";

import Button from "./button.jsx";

function LinkButton(props) {
	return <Button as={Link} {...props} />;
}

export default LinkButton;

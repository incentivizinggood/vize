import React from "react";
import * as Formik from "formik";
import { Rating } from "@material-ui/lab";
import styled from "styled-components";

const RatingLayout = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: left;

	margin-top: 16px;
`;

const Legend = styled.div`
	margin-left: 10px;
`;

type RatingFieldProps = Formik.FieldProps<any> & {
	label: string;
};

const RatingField = ({
	label,
	field: { name, value, onChange },
}: RatingFieldProps) => (
	<RatingLayout>
		<Legend>{label}</Legend>
		<Rating name={name} value={value} onChange={onChange} />
	</RatingLayout>
);

export default RatingField;

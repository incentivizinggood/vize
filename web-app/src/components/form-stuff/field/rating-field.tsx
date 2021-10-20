import React from "react";
import * as Formik from "formik";
import { FormHelperText } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import styled from "styled-components";

import { colors } from "src/global-styles";

const RatingContainer = styled.div<{ hasError: boolean }>`
	margin-top: 16px;

	color: ${(props) => (props.hasError ? colors.errorBackground : "inherit")};
`;

const RatingLayout = styled.div`
	display: flex;
	justify-content: left;
`;

const Legend = styled.div`
	margin-left: 10px;
`;

type RatingFieldProps = Formik.FieldProps<any> & {
	label: string;
	required?: boolean;
};

const RatingField = ({
	label,
	required,
	field: { name, value, onChange },
	form: { touched, errors },
}: RatingFieldProps) => {
	const error = Formik.getIn(errors, name);
	const hasError = Formik.getIn(touched, name) && error;

	return (
		<RatingContainer hasError={hasError}>
			<RatingLayout>
				<Rating name={name} value={value} onChange={onChange} />
				<Legend>
					{label}
					{required ? " *" : null}
				</Legend>
			</RatingLayout>
			{hasError ? <FormHelperText error>{error}</FormHelperText> : null}
		</RatingContainer>
	);
};

export default RatingField;

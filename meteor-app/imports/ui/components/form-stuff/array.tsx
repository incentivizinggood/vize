import React from "react";
import { FieldArray, connect } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button } from "imports/ui/components/button";

const ArrayContainer = styled.div`
	margin-top: 20px;
`;

const ElementContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 20px;
	margin-top: 20px;
	width: 100%;
	max-width: 500px;

	background-color: ${props => props.theme.surface};
	color: ${props => props.theme.onSurface};
	box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
	padding: 30px;
	position: relative;
	padding-top: 20px;
`;

const ElementDeleteButton = styled(Button)`
	&&&&&&&&& {
		padding: 0;
		width: 1.5em;
		height: 1.5em;

		position: absolute;
		right: 10px;
		top: 10px;
	}
`;

function FormArray({ name, T, formik: { values }, ElementRender }) {
	return (
		<>
			<FieldArray
				name={name}
				render={arrayHelpers => (
					<ArrayContainer>
						{values[name] && values[name].length > 0
							? values[name].map((x, index) => (
									<ElementContainer>
										<ElementDeleteButton
											type="button"
											onClick={() =>
												arrayHelpers.remove(index)
											} // remove a friend from the list
										>
											<FontAwesomeIcon icon={faTimes} />
										</ElementDeleteButton>
										<ElementRender
											name={`${name}[${index}]`}
										/>
									</ElementContainer>
							  ))
							: null}
						<Button
							type="button"
							onClick={() => arrayHelpers.push("")}
						>
							<FontAwesomeIcon icon={faPlus} />
							{T ? (
								<>
									{" "}
									<T.addElement array={values[name]} />
								</>
							) : null}
						</Button>
					</ArrayContainer>
				)}
			/>
		</>
	);
}

export default connect(FormArray);

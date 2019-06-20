import React from "react";
import { FieldArray, connect } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { Button } from "/imports/ui/components/button";

const ArrayContainer = styled.div`
	margin-top: 10px;
`;
const ElementContainer = styled.div`
	> * {
		display: inline-block;
		vertical-align: middle;
	}
`;

const Foo = styled.div`
	margin-left: 10px;
`;

const B = styled(Button)`
	&&&&&&&&& {
		padding: 0;
		width: 1.5em;
		height: 1.5em;
	}
`;

function FormArray({ name, formik: { values }, ElementRender }) {
	return (
		<FieldArray
			name={name}
			render={arrayHelpers => (
				<ArrayContainer>
					{values[name] && values[name].length > 0
						? values[name].map((friend, index) => (
								<>
									<B
										type="button"
										onClick={() =>
											arrayHelpers.insert(index, "")
										} // insert an empty string at a position
									>
										<FontAwesomeIcon icon={faPlus} />
									</B>
									<ElementContainer>
										<B
											type="button"
											onClick={() =>
												arrayHelpers.remove(index)
											} // remove a friend from the list
										>
											<FontAwesomeIcon icon={faMinus} />
										</B>
										<Foo>
											<ElementRender
												name={`${name}[${index}]`}
											/>
										</Foo>
									</ElementContainer>
								</>
						  ))
						: null}
					<B type="button" onClick={() => arrayHelpers.push("")}>
						<FontAwesomeIcon icon={faPlus} />
					</B>
				</ArrayContainer>
			)}
		/>
	);
}

export default connect(FormArray);

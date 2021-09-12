import React from "react";
import { FieldArray, connect, FormikContextType } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button } from "src/components/button";
import { TranslationComponent } from "src/translations";
import { forSize } from "src/responsive";

export const ArrayContainer = styled.div`
	margin-top: 20px;
`;

const ElementContainer = styled.div`
	margin-top: 20px;
	width: 100%;
	background-color: white;
	color: black;
	position: relative;
	padding-top: 20px;
`;
const ElementHeading = styled.h5`
	text-transform: capitalize;
	color: hsl(204, 63%, 55%);
	// margin-bottom: 20px;
`;
// const ElementDeleteButton = styled(Button)`
// 	&&&&&&&&& {
// 		padding: 0;
// 		width: 1.5em;
// 		height: 1.5em;
// 		position: absolute;
// 		right: 10px;
// 		top: 10px;
// 	}
// `;
const FieldDeleteButton = styled(Button)`
	border-radius: 3rem !important;
	font-weight: 0 !important;
	padding: 0.6em 3em !important;
	${forSize.phoneOnly} {
		padding: 0.2em 1em !important;
		font-size: 0.9rem;
	}
`;
const ElementAddButton = styled(Button)`
	border-radius: 3rem !important;
	background-color: #f0f8ff !important;
	border: none !important;
	font-weight: 0 !important;
`;
const ElementHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const HeaderHorizontalLine = styled.div`
	width: 100%;
	background-color: hsl(204, 63%, 55%);
	height: 1px;
	margin: 0px 5px;
`;

interface FormArrayProps {
	name: string;
	T?: {
		addElement: TranslationComponent<
			({ array }: { array: unknown[] }) => string
		>;
	};
	ElementRender: React.ComponentType<{ name: string; index: number }>;
}

function FormArray({
	name,
	T,
	ElementRender,
	formik: { values },
}: FormArrayProps & { formik: FormikContextType<any> }) {
	return (
		<>
			<FieldArray
				name={name}
				render={(arrayHelpers) => (
					<ArrayContainer>
						{values[name] && values[name].length > 0
							? values[name].map((x: unknown, index: number) => (
									<ElementContainer>
										<ElementHeader>
											<ElementHeading>
												{name}
											</ElementHeading>
											<HeaderHorizontalLine />

											{index !== 0 && (
												<>
													<FieldDeleteButton
														type="button"
														onClick={() =>
															arrayHelpers.remove(
																index
															)
														} // remove a friend from the list
													>
														Remove {name}
													</FieldDeleteButton>
												</>
											)}
										</ElementHeader>
										<ElementRender
											name={`${name}[${index}]`}
											index={index}
										/>
									</ElementContainer>
							  ))
							: null}
						{!(name === "shifts" && values.shifts?.length >= 3) && (
							<ElementAddButton
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
							</ElementAddButton>
						)}
					</ArrayContainer>
				)}
			/>
		</>
	);
}

export default connect<any, any>(FormArray);

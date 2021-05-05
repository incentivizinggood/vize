import React from "react";
import MaskedInput from "react-text-mask";

const PhoneNumberInputMask = (props: any) => {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={(ref: any) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={[
				"(",
				/[1-9]/,
				/\d/,
				/\d/,
				")",
				" ",
				/\d/,
				/\d/,
				/\d/,
				"-",
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			]}
			placeholderChar={"\u2000"}
			showMask
		/>
	);
};
export default PhoneNumberInputMask;

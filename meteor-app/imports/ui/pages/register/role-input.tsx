import React from "react";

import { RadioItem, RadioGroup } from "imports/ui/components/radio";
import { translations } from "imports/ui/translations";

const T = translations.loginRegister;

function RoleInput() {
	return (
		<T
			renderer={t => (
				<RadioGroup legend="I am a...">
					<RadioItem
						fieldName="role"
						value="worker"
						label={t.employee}
					/>
					<RadioItem
						fieldName="role"
						value="company"
						label={t.employer}
					/>
				</RadioGroup>
			)}
		/>
	);
}

export default RoleInput;

import React from "react";

import i18n from "meteor/universe:i18n";

import { RadioItem, RadioGroup } from "/imports/ui/components/radio.jsx";

const t = i18n.createTranslator("common.loginRegister");

function RoleInput() {
	return (
		<RadioGroup legend="I am a...">
			<RadioItem fieldName="role" value="worker" label={t("employee")} />
			<RadioItem fieldName="role" value="company" label={t("employer")} />
		</RadioGroup>
	);
}

export default RoleInput;

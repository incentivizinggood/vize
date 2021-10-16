import React from "react";

import { translations } from "src/translations";
const T = translations.legacyTranslationsNeedsRefactor;

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.5;

// used to get a relative date for job posts (ex. "Posted 3 days ago")
export function absoluteDateToRelativeDate(datePosted: Date): JSX.Element {
	const currentDate = new Date();
	const postedDateUTC = Date.UTC(
		datePosted.getFullYear(),
		datePosted.getMonth(),
		datePosted.getDate()
	);
	const currentDateUTC = Date.UTC(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate()
	);

	const diffDays = Math.floor((currentDateUTC - postedDateUTC) / _MS_PER_DAY);
	const diffMonths = Math.floor(
		(currentDateUTC - postedDateUTC) / _MS_PER_MONTH
	);

	if (diffDays == 1) {
		return (
			<>
				<T.showjob.posted_on /> {diffDays} <T.showjob.day_ago />
			</>
		);
	}
	if (diffDays < 30.5) {
		return (
			<>
				<T.showjob.posted_on /> {diffDays} <T.showjob.days_ago />
			</>
		);
	} else if (diffMonths === 1) {
		return (
			<>
				<T.showjob.posted_on /> {diffMonths} <T.showjob.month_ago />
			</>
		);
	} else {
		return (
			<>
				<T.showjob.posted_on /> {diffMonths} <T.showjob.months_ago />
			</>
		);
	}
}

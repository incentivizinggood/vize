import React from "react";
import { translations } from "src/translations";

const T = translations.createJobAd.fields;

interface Interval {
	start: number;
	end: number;
}

function intervalOverlap(...intervals: Interval[]): number {
	return Math.max(
		0,
		Math.min(...intervals.map(({ end }) => end)) -
			Math.max(...intervals.map(({ start }) => start))
	);
}

function intervalSetOverlap(
	intervalsA: Interval[],
	intervalsB: Interval[]
): number {
	/*
	The overlaps between two sets of intervals is the sum of the overlap of each
	pair of intervals across the sets, as long as each set of intervals does not
	overlap it self.
	*/
	let total = 0;
	for (const intervalA of intervalsA) {
		for (const intervalB of intervalsB) {
			total += intervalOverlap(intervalA, intervalB);
		}
	}
	return total;
}

/**
 * Break an interval that may wrap around a loop into an equivalent set of
 * intervals that do not wrap around.
 */
function breakLoopedInterval(loop: Interval, interval: Interval): Interval[] {
	if (interval.start <= interval.end) {
		return [interval];
	} else {
		return [
			{ start: loop.start, end: interval.end },
			{ start: interval.start, end: loop.end },
		];
	}
}

/**
 * Calculate the length of overlap of two intervals on a loop.
 * @param mod The length of the loop. The loop starts at 0 and goes to mod.
 */
export function loopedIntervalOverlap(
	loop: Interval,
	intervalA: Interval,
	intervalB: Interval
): number {
	return intervalSetOverlap(
		breakLoopedInterval(loop, intervalA),
		breakLoopedInterval(loop, intervalB)
	);
}

const t4am = 4 * 60;
const noon = 12 * 60;
const t8pm = 20 * 60;

export function getShiftName(
	startTime: string | null | undefined,
	endTime: string | null | undefined
): string | null {
	if (!startTime || !endTime) {
		return null;
	}

	const startTimeInt = Number(startTime.substring(0, 2));
	const endTimeInt = Number(endTime.substring(0, 2));
	const shift: Interval = { start: startTimeInt, end: endTimeInt };

	const shifts = [
		{ name: "Matutino (diurno)", start: t4am, end: noon }, // Morning shift
		{ name: "Vespertino (mixto)", start: noon, end: t8pm }, // Afternoon shift
		{ name: "Nocturno", start: t8pm, end: t4am }, // Night shift
	];

	return shifts
		.map(s => ({
			...s,
			overlap: loopedIntervalOverlap(
				{ start: 0, end: 24 * 60 },
				s,
				shift
			),
		}))
		.sort((a, b) => a.overlap - b.overlap)[0].name;
}

function dayName(day: number): JSX.Element {
	return [
		<T.jobSchedule.sunday />,
		<T.jobSchedule.monday />,
		<T.jobSchedule.tuesday />,
		<T.jobSchedule.wednesday />,
		<T.jobSchedule.thursday />,
		<T.jobSchedule.friday />,
		<T.jobSchedule.saturday />,
	][day];
}

function getShiftDayRange(
	startDay: number | null | undefined,
	endDay: number | null | undefined
): JSX.Element | null {
	if (!startDay || !endDay) {
		return null;
	}
	return (
		<>
			{dayName(startDay)}
			{" - "}
			{dayName(endDay)}
		</>
	);
}

function getShiftTimeRange(
	startTimeRaw: string | null | undefined,
	endTimeRaw: string | null | undefined
): string | null {
	if (!startTimeRaw || !endTimeRaw) {
		return null;
	}

	const startTimeNum = Number(startTimeRaw.substring(0, 2));
	const startTimeSuffix = startTimeNum >= 12 ? "PM" : "AM";
	let startTime = String(((startTimeNum + 11) % 12) + 1);
	startTime += startTimeRaw.substring(2, 5);

	const endTimeNum = Number(endTimeRaw.substring(0, 2));
	const endTimeSuffix = endTimeNum >= 12 ? "PM" : "AM";
	let endTime = String(((endTimeNum + 11) % 12) + 1);
	endTime += endTimeRaw.substring(2, 5);

	return (
		startTime +
		" " +
		startTimeSuffix +
		" - " +
		endTime +
		" " +
		endTimeSuffix
	);
}

interface JobScheduleProps {
	startTime: string | null | undefined;
	endTime: string | null | undefined;
	startDay: number | null | undefined;
	endDay: number | null | undefined;
}

export function JobSchedule(props: JobScheduleProps): JSX.Element {
	console.log(props.startDay);
	return (
		<span>
			{getShiftName(props.startTime, props.endTime)}
			{props.startDay && props.endDay && " | "}
			{getShiftDayRange(props.startDay, props.endDay)}
			{props.startTime && props.endTime && " | "}
			{getShiftTimeRange(props.startTime, props.endTime)}
		</span>
	);
}

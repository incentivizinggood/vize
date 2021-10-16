import React from "react";
import styled from "styled-components";
import { dayTranslations } from "api-server/src/utils/translation-utils";

import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

const ShiftDay = styled.span`
	color: black;
`;
const ShiftTime = styled.span`
	font-weight: 600;
`;

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
	intervalShift: Interval,
	intervalB: Interval
): number {
	return intervalSetOverlap(
		breakLoopedInterval(loop, intervalA),
		breakLoopedInterval(loop, intervalB)
	);
}

const t4am = 4 * 60;
const t11am = 11 * 60;
const t6pm = 18 * 60;

export function getShiftName(
	startTime: string | null | undefined,
	endTime: string | null | undefined
): string | null {
	if (!startTime || !endTime) {
		return null;
	}
	const startTimeInt = Number(startTime.substring(0, 2)) * 60;

	const shifts = [
		{ name: "Matutino (diurno)", start: t4am, end: t11am }, // Morning shift
		{ name: "Vespertino (mixto)", start: t11am, end: t6pm }, // Afternoon shift
		{ name: "Nocturno", start: t6pm, end: t4am }, // Night shift
	];

	if (startTimeInt >= shifts[2].start) {
		return shifts[2].name;
	} else if (startTimeInt >= shifts[1].start) {
		return shifts[1].name;
	} else {
		return shifts[0].name;
	}

	//return "test";

	// return shifts
	// 	.map(s => ({
	// 		...s,
	// 		overlap: loopedIntervalOverlap(
	// 			{ start: 0, end: 24 * 60 },
	// 			s,
	// 			shift
	// 		),
	// 	}))
	// 	.sort((a, b) => a.overlap - b.overlap)[0].name;
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

interface JobShiftProps {
	startTime: string | null | undefined;
	endTime: string | null | undefined;
	startDay: number | null | undefined;
	endDay: number | null | undefined;
}

export function JobShift({
	startTime,
	endTime,
	startDay,
	endDay,
}: JobShiftProps): JSX.Element {
	const startDayText = dayTranslations[startDay];
	const endDayText = dayTranslations[endDay];

	return (
		<>
			<ShiftDay>
				{startDayText} - {endDayText}
			</ShiftDay>
			<ShiftTime>{getShiftTimeRange(startTime, endTime)}</ShiftTime>
		</>
	);
}

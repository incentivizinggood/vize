import React from "react";

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

export function shiftName(shift: Interval): string {
	const shifts = [
		{ name: "morning", start: t4am, end: noon },
		{ name: "afternoon", start: noon, end: t8pm },
		{ name: "night", start: t8pm, end: t4am },
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

function dayName(day: number): string {
	return [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	][day];
}

interface JobScheduleProps {
	startTime: number;
	endTime: number;
	startDay: number;
	endDay: number;
}

export function JobSchedule(props: JobScheduleProps): React.ReactNode {
	return (
		<>
			{shiftName({ start: props.startTime, end: props.endTime })} -{" "}
			{dayName(props.startDay)} through {dayName(props.endDay)} -{" "}
			{props.startTime} to {props.endTime}
		</>
	);
}

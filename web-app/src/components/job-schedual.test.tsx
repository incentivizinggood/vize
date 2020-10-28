import { getShiftName } from "./job-schedual";

test("test shift name", () => {
	// This should result in a night shift
	const startTimeTest1 = "18:00";
	const endTimeTest1 = "07:00";
	expect(getShiftName(startTimeTest1, endTimeTest1)).toBe(
		"Vespertino (mixto)"
	);
});

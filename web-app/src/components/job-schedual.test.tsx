import { getShiftName } from "./job-schedual";

test("Test shift name", () => {
	// This should result in a night shift
	const startTimeTest1 = "18:00";
	const endTimeTest1 = "07:00";
	expect(getShiftName(startTimeTest1, endTimeTest1)).toBe("Nocturno");

	// This should result in a morning shift
	const startTimeTest2 = "8:00";
	const endTimeTest2 = "18:00";
	expect(getShiftName(startTimeTest2, endTimeTest2)).toBe(
		"Matutino (diurno)"
	);

	// This should result in an afternoon shift
	const startTimeTest3 = "13:00";
	const endTimeTest3 = "23:00";
	expect(getShiftName(startTimeTest3, endTimeTest3)).toBe(
		"Vespertino (mixto)"
	);
});

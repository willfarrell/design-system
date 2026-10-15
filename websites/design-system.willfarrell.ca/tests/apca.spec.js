import { expect, test } from "@playwright/test";
import { apcaContrast, bronzeMinimum } from "./apca.js";

const hex = (value) =>
	value.match(/[0-9a-f]{2}/gi).map((channel) => Number.parseInt(channel, 16));

test("APCA-W3 0.0.98G matches the reference Lc values", () => {
	expect(apcaContrast(hex("888888"), hex("ffffff"))).toBeCloseTo(63.06, 1);
	expect(apcaContrast(hex("ffffff"), hex("888888"))).toBeCloseTo(-68.54, 1);
	expect(apcaContrast(hex("000000"), hex("ffffff"))).toBeCloseTo(106.04, 1);
	expect(apcaContrast(hex("ffffff"), hex("000000"))).toBeCloseTo(-107.88, 1);
	expect(apcaContrast(hex("777777"), hex("777777"))).toBe(0);
});

test("APCA Bronze minimum follows font size and weight", () => {
	expect(bronzeMinimum(16, 400)).toBe(90);
	expect(bronzeMinimum(18, 400)).toBe(75);
	expect(bronzeMinimum(14, 700)).toBe(75);
	expect(bronzeMinimum(18, 700)).toBe(60);
	expect(bronzeMinimum(24, 400)).toBe(60);
	expect(bronzeMinimum(24, 700)).toBe(45);
	expect(bronzeMinimum(36, 400)).toBe(45);
});

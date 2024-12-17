import { Sum } from "../components/sum";

test("should return sum of two numbers", () => {
	let result = Sum(1, 5);
	expect(result).toBe(6);
});

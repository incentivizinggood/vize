import { assert } from "chai";

import sql from "./sql-template";

describe("sql templates", function() {
	it("can make simple statements with no values", function() {
		const query = sql`SELECT foo FROM bar`;
		assert.strictEqual(query.text, "SELECT foo FROM bar");
		assert.deepEqual(query.values, []);
	});
	it("can compose statements", function() {
		const baseQuery = sql`SELECT test FROM stuff`;
		const query = sql`${baseQuery} WHERE foo=${5}, bar<${"a"}`;
		assert.strictEqual(
			query.text,
			"SELECT test FROM stuff WHERE foo=$1, bar<$2"
		);
		assert.deepEqual(query.values, [5, "a"]);
	});
	it("can concat statements", function() {
		const query1 = sql`SELECT test FROM stuff`;
		const query2 = sql` WHERE thing = ${"the one"} `;
		const query3 = sql`OFFSET ${50} LIMIT ${10}`;
		const query = sql`${query1}${query2}${query3}`;
		assert.strictEqual(
			query.text,
			"SELECT test FROM stuff WHERE thing = $1 OFFSET $2 LIMIT $3"
		);
		assert.deepEqual(query.values, ["the one", 50, 10]);
	});
});

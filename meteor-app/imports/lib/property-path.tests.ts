import { assert } from "chai";

import { getAtPath, joinPaths } from "./property-path";

describe("getAtPath", function() {
	const foo = { a: { x: "test", y: 42 }, b: 72.2, g: null };

	it("gets the root object when the path is empty", function() {
		assert.strictEqual(getAtPath(foo, ""), foo);
	});

	it("can get a property just like the subscript opperator", function() {
		assert.strictEqual(getAtPath(foo, "b"), foo["b"]);
	});

	it("can get a property that is nested inside another", function() {
		assert.strictEqual(getAtPath(foo, "a.x"), "test");
	});

	it("returns undefined for a path to nonexistent properties", function() {
		assert.strictEqual(getAtPath(foo, "c"), undefined);
	});

	it("returns undefined for a path into nonexistent properties", function() {
		assert.strictEqual(getAtPath(foo, "c.x"), undefined);
	});

	it("returns undefined for a path into null properties", function() {
		assert.strictEqual(getAtPath(foo, "g.x"), undefined);
	});
});

describe("joinPaths", function() {
	it("does not put and extra dot when the lhs is empty", function() {
		assert.strictEqual(joinPaths("", "test"), "test");
	});

	it("does not put and extra dot when the rhs is empty", function() {
		assert.strictEqual(joinPaths("test", ""), "test");
	});

	it("can join simple paths", function() {
		assert.strictEqual(joinPaths("foo", "bar"), "foo.bar");
	});

	it("can join complex paths", function() {
		assert.strictEqual(joinPaths("foo.bar", "baz.buz"), "foo.bar.baz.buz");
	});
});

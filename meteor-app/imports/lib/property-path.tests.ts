import { assert } from "chai";

import { getAtPath, joinPaths } from "./property-path";

describe("getAtPath", function() {
	const foo = { a: { x: "test", y: 42 }, b: 72.2 };

	it("gets the root object when the path is empty", function() {
		assert.strictEqual(getAtPath(foo, ""), foo);
	});

	it("can get a property just like the subscript opperator", function() {
		assert.strictEqual(getAtPath(foo, "b"), foo["b"]);
	});

	it("can get a property that is nested inside another", function() {
		assert.strictEqual(getAtPath(foo, "a.x"), "test");
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

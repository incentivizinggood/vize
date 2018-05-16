// Method functionality
import { Mongo } from "meteor/mongo";
import { Reviews } from "./reviews.js";
import { Companies } from "./companies.js";

// Testing facilities
import { chai } from "meteor/practicalmeteor:chai"
import { sinon } from "meteor/practicalmeteor:sinon"
import { resetDatabase } from "meteor/xolvio:cleaner";
import { StubCollections } from "meteor/hwillson:stub-collections";

describe("companies", function () {
	describe("#createProfile(newCompanyProfile)", function () {
		it("should successfully insert a valid newCompanyProfile", function () {
			console.log("Hello, world of testing!");
			chai.assert.equal(1,1);
		});
		// it("should reject a user that isn't logged in");
		// it("should reject a user that isn't authorized"); // not sure how to do this yet
		// it("should reject a newCompanyProfile with an _id field");
		// it("should reject newCompanyProfile's that don't follow the Companies schema"); // will need multiple sub-tests
	});
});

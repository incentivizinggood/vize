/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import assert from "assert";

import constructModels from "./models.js";

if (Meteor.isServer) {
	describe("ReviewModel", function() {
		const {
			commentModel,
			companyModel,
			jobAdModel,
			reviewModel,
			salaryModel,
			userModel,
			voteModel,
		} = constructModels();
		it("There must be some reviews for these tests to work.", function() {
			assert(
				reviewModel.getAll().length > 0,
				"There is at least one review."
			);
		});
		describe("Concept type", function() {
			it("All reviews are reviews and not other things.", function() {
				reviewModel.getAll().forEach(review => {
					assert(
						reviewModel.isValid(review),
						"This review is a review."
					);
					assert(
						!commentModel.isValid(review),
						"This review is not a comment."
					);
					assert(
						!companyModel.isValid(review),
						"This review is not a company."
					);
					assert(
						!jobAdModel.isValid(review),
						"This review is not a jobAd."
					);
					assert(
						!salaryModel.isValid(review),
						"This review is not a salary."
					);
					assert(
						!userModel.isValid(review),
						"This review is not a user."
					);
					assert(
						!voteModel.isValid(review),
						"This review is not a vote."
					);
				});
			});
		});
		describe("Relationships", function() {
			it("getByAuthor and getTheAuthor should be inverse relationships.", function() {
				userModel.getAll().forEach(user => {
					reviewModel.getByAuthor(user).forEach(review => {
						assert(reviewModel.getTheAuthor(review) === user);
					});
				});
			});
			it("getByCompany and getTheCompany should be inverse relationships.", function() {
				companyModel.getAll().forEach(company => {
					reviewModel.getByCompany(company).forEach(review => {
						assert(reviewModel.getTheCompany(review) === company);
					});
				});
			});
		});
	});
}

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
				reviewModel.getAllReviews().length > 0,
				"There is at least one review."
			);
		});
		it("All reviews are reviews and not other things.", function() {
			reviewModel.getAllReviews().forEach(review => {
				assert(reviewModel.isValid(review), "This review is a review.");
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
		it("getByAuthor and getTheAuthor should be inverse relationships.", function() {
			userModel.getAllUsers().forEach(user => {
				reviewModel.getReviewsByAuthor(user).forEach(review => {
					assert(reviewModel.getAuthorOfReview(review) === user);
				});
			});
		});
		it("getByCompany and getTheCompany should be inverse relationships.", function() {
			companyModel.getAllCompanies().forEach(company => {
				reviewModel.getReviewsByCompany(company).forEach(review => {
					assert(reviewModel.getCompanyOfReview(review) === company);
				});
			});
		});
	});
}

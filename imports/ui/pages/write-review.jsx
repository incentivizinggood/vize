import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Reviews } from "../../api/data/reviews.js";

// Lots of nice boilerplate copy-pasted from
// create-company-profile.jsx

import { Template } from "meteor/templating"; // Used to set up the autoform
import Blaze from "meteor/gadicc:blaze-react-component"; // used to insert Blaze templates into React components
import MeteorError from "../meteor-error.jsx"; // used to display errors thrown by methods
import { ReactiveVar } from "meteor/reactive-var"; // used to hold global state because...you can't "pass props" to Blaze templates

//AutoForm business
import { AutoForm } from "meteor/aldeed:autoform";

//Until we actually make an account for testing
var Phony = Package['csauer:accounts-phony'].Phony;
Meteor.loginWithPhony(Phony.user);

//now the interesting part...
import "./write_review_blaze_form.html";

let formError = new ReactiveVar("good"); // This code looks easier than it was.

Template.write_review_blaze_form.helpers({
	reviews: Reviews,
	MeteorError: function() {
		return MeteorError;
	},
	hasError: function() {
		return formError.get() !== "good";
	},
	error: function() {
		return formError.get();
	},
});
AutoForm.addHooks("write_review_blaze_form", {

	onSuccess: function(formType, result) { // If your method returns something, it will show up in "result"
		console.log("SUCCESS: We did a thing in a " + formType + " form: " + result);
		formError.set("good");
	},
	onError: function(formType, error) { // "error" contains whatever error object was thrown
		console.log("ERROR: We did a thing in a " + formType + " form: " + error);
		formError.set(error.toString());
	},
});


export default class WriteReviewPage extends Component {
	//export const Review = new Mongo.Collection('review');
	// Props:
	constructor (props) {
		super(props);
		// this.state = {
		// 	value: ''
		// };
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}
	// // Handling change to the specific event
	// handleChange(event) {
	// 	this.setState({value: event.target.value});
	// }
	// // Handling the submit from forms
	// handleSubmit(event){
	// 	alert('A name was submitted: ' + this.state.value);
	// 	event.preventDefault();
	// }
	render() {
		return (
			<div className="page WriteReviewPage">
				<Blaze template="write_review_blaze_form"/>
			</div>
		);
		// return (
		// 	<div class="container  home_section">
		// 		<div class="stepwizard col-md-offset-3">
		// 			<div class="stepwizard-row setup-panel">
		// 				<div class="stepwizard-step1">
		// 					<a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
		// 					<p>Step 1</p>
		// 				</div>
		// 				<div class="stepwizard-step2">
		// 					<a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
		// 					<p>Step 2</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<form role="form" action="" method="post">
		// 			<div class="row setup-content" id="step-1">
		// 				<div class="col-md-12 form_width">
		// 					<div class="form-group">
		// 						<input maxlength="200" type="text" required="required" class="form-control" placeholder="Company Name" />
		// 					</div>
		// 					<div class="form-group">
		// 						<input maxlength="200" type="text" required="required" class="form-control" placeholder="Location" />
		// 					</div>
		// 					<div class="form-group">
		// 						<input maxlength="200" type="text" required="required" class="form-control" placeholder="Review Title" />
		// 						</div>
		// 						<div class="form-group">
		// 							<textarea class="form-control" id="exampleFormControlTextarea3" rows="7" placeholder="Pros*
		// 								What did you love about this company and why would you recommend it to someone else?"></textarea>
		// 						</div>
		// 						<div class="form-group">
		// 							<textarea class="form-control" id="exampleFormControlTextarea3" rows="7" placeholder="Cons*
		// 								What do you think this company didn't do right or could improve on ?"></textarea>
		// 						</div>
		// 						<div class="form-group">
		// 							<textarea class="form-control" id="exampleFormControlTextarea3" rows="7" placeholder="Additional Comments*
		// 								Enter any additional thoughts on the company and your exeprience working there."></textarea>
		// 						</div>
		// 						<div  class="clear"></div>
		// 						<div class="form-group button">
		// 							<button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div class="row setup-content" id="step-2">
		// 					<div class="col-md-12 form_width">
		// 						<div class="form-group " >
		// 							<select class="form-control_select5">
		// 								<option value="">Annual</option>
		// 								<option value="">Hourly</option>
		// 							</select>
		// 							<input maxlength="200" type="text" required="required" class="form-control_select6 full-right_select" placeholder="Salary" />
		// 						</div>
		// 						<div class="form-group " >
		// 							<select class="form-control">
		// 								<option value="">Job Title</option>
		// 								<option value="">Line Worker</option>
		// 								<option value="">Upper Management</option>
		// 							</select>
		// 						</div>
		// 						<div class="form-group " >
		// 							<input maxlength="200" type="text" required="required" class="form-control" placeholder="Number of months worked" />
		// 						</div>
		// 						<div class="form-group">
		// 							<div class="form-check">
		// 							</div>
		// 						</div>
		// 						<div class="form-group all_reting">
		// 							<div class="rating_text">
		// 								Health & Safety
		// 								<div class="lead  ri_lead">
		// 									<fieldset className="rating">
		// 										<input type="radio" id="star5" name="rating" value="5" />
		// 										<label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
		// 										<input type="radio" id="star4half" name="rating" value="4 and a half" />
		// 										<label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
		// 										<input type="radio" id="star4" name="rating" value="4" />
		// 										<label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
		// 										<input type="radio" id="star3half" name="rating" value="3 and a half" />
		// 										<label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
		// 										<input type="radio" id="star3" name="rating" value="3" />
		// 										<label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
		// 										<input type="radio" id="star2half" name="rating" value="2 and a half" />
		// 										<label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
		// 										<input type="radio" id="star2" name="rating" value="2" />
		// 										<label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
		// 										<input type="radio" id="star1half" name="rating" value="1 and a half" />
		// 										<label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
		// 										<input type="radio" id="star1" name="rating" value="1" />
		// 										<label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
		// 										<input type="radio" id="starhalf" name="rating" value="half" />
		// 										<label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 	stars"></label>
		// 									</fieldset>
		// 								</div>
		// 							</div>
		// 							<br/>
		// 							<div class="rating_text">
		// 								Work Environment
		// 								<div class="lead  ri_lead">
		// 									<fieldset className="rating">
		// 										<input type="radio" id="star5" name="rating" value="5" />
		// 										<label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
		// 										<input type="radio" id="star4half" name="rating" value="4 and a half" />
		// 										<label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
		// 										<input type="radio" id="star4" name="rating" value="4" />
		// 										<label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
		// 										<input type="radio" id="star3half" name="rating" value="3 and a half" />
		// 										<label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
		// 										<input type="radio" id="star3" name="rating" value="3" />
		// 										<label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
		// 										<input type="radio" id="star2half" name="rating" value="2 and a half" />
		// 										<label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
		// 										<input type="radio" id="star2" name="rating" value="2" />
		// 										<label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
		// 										<input type="radio" id="star1half" name="rating" value="1 and a half" />
		// 										<label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
		// 										<input type="radio" id="star1" name="rating" value="1" />
		// 										<label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
		// 										<input type="radio" id="starhalf" name="rating" value="half" />
		// 										<label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
		// 									</fieldset>
		// 								</div>
		// 							</div>
		// 							<br/>
		// 							<div class="rating_text">
		// 								Benefits
		// 								<div class="lead  ri_lead">
		// 									<fieldset className="rating">
		// 										<input type="radio" id="star5" name="rating" value="5" />
		// 										<label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
		// 										<input type="radio" id="star4half" name="rating" value="4 and a half" />
		// 										<label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
		// 										<input type="radio" id="star4" name="rating" value="4" />
		// 										<label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
		// 										<input type="radio" id="star3half" name="rating" value="3 and a half" />
		// 										<label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
		// 										<input type="radio" id="star3" name="rating" value="3" />
		// 										<label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
		// 										<input type="radio" id="star2half" name="rating" value="2 and a half" />
		// 										<label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
		// 										<input type="radio" id="star2" name="rating" value="2" />
		// 										<label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
		// 										<input type="radio" id="star1half" name="rating" value="1 and a half" />
		// 										<label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
		// 										<input type="radio" id="star1" name="rating" value="1" />
		// 										<label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
		// 										<input type="radio" id="starhalf" name="rating" value="half" />
		// 										<label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
		// 									</fieldset>
		// 								</div>
		// 							</div>
		// 							<br/>
		// 							<div class="rating_text">
		// 								Manager Relationship
		// 								<div class="lead  ri_lead">
		// 									<fieldset className="rating">
		// 										<input type="radio" id="star5" name="rating" value="5" />
		// 										<label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
		// 										<input type="radio" id="star4half" name="rating" value="4 and a half" />
		// 										<label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
		// 										<input type="radio" id="star4" name="rating" value="4" />
		// 										<label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
		// 										<input type="radio" id="star3half" name="rating" value="3 and a half" />
		// 										<label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
		// 										<input type="radio" id="star3" name="rating" value="3" />
		// 										<label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
		// 										<input type="radio" id="star2half" name="rating" value="2 and a half" />
		// 										<label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
		// 										<input type="radio" id="star2" name="rating" value="2" />
		// 										<label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
		// 										<input type="radio" id="star1half" name="rating" value="1 and a half" />
		// 										<label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
		// 										<input type="radio" id="star1" name="rating" value="1" />
		// 										<label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
		// 										<input type="radio" id="starhalf" name="rating" value="half" />
		// 										<label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
		// 									</fieldset>
		// 								</div>
		// 							</div>
		// 							<br/>
		// 						</div>
		// 						<button class="btn btn-success btn-lg pull-right" type="submit">Submit</button>
		// 						<button class="btn btn-primary backBtn2 btn-lg pull-right" type="button" >Back</button>
		// 						<div  class="clear"></div>
		// 					</div>
		// 				</div>
		// 			</form>
		// 		</div>
		// );
	}
}

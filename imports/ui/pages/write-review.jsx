import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {mongo} from 'meteor/mongo'
export default class WriteReviewPage extends Component {
    //export const Review = new Mongo.Collection('review');
    // Props:
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // Handling change to the specific event
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    // Handling the submit from forms
    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (

          <div className="review-form">
            <form className="new-task" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend><strong><h1>Review a Company</h1></strong></legend>
                    <strong>Company Name</strong><br/>
                    <input type="text" border="2" placeholder="Name of the company:"/><br/><br/>
                    <strong>Review Title</strong><br/>
                    <input type="text" border="2" placeholder="Name this review:"/><br/><br/>
                    <strong>Pros </strong><br/>
                        <textarea type="text" placeholder="What did you love about this company and why would you recommend it to someone else?" rows="6" cols="50" name="comment" form="usrform"></textarea><br/>
                    <strong>Cons </strong><br/>
                        <textarea type="text" placeholder="What do you think this comany this company didn't do right or could improve on?" rows="6" cols="50" name="comment" form="usrform"></textarea><br/>
                    <strong>Additional Comments </strong><br/>
                        <textarea type="text" placeholder="Enter any additional thoughts on the company and your exeprience working there." rows="6" cols="50" name="comment" form="usrform"></textarea><br/>
                        <strong>Wages:</strong>
                        <input type="number" ref="wagesInput" name="enteredWages" min="1" max= "100"/><br/>
                        <br/>
                    <strong>Postion: </strong><br/>
                        <select>
                          <option selected disabled>Choose one</option>
                           <option value="LineWorker">Line Worker </option>
                           <option value="UpperManagement">Upper Management</option>
                           <option value="LowerManagement">Lower Management</option>
                        </select>
                        <br/>
                        <br/>
                        <strong>Health & Safety:</strong>
                        <div className="col-md-12 comp-class">
                           <fieldset className="rating">
                              <input type="radio" id="star5" name="rating" value="5" />
                              <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                              <input type="radio" id="star4half" name="rating" value="4 and a half" />
                              <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                              <input type="radio" id="star4" name="rating" value="4" />
                              <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                              <input type="radio" id="star3half" name="rating" value="3 and a half" />
                              <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                              <input type="radio" id="star3" name="rating" value="3" />
                              <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                              <input type="radio" id="star2half" name="rating" value="2 and a half" />
                              <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                              <input type="radio" id="star2" name="rating" value="2" />
                              <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                              <input type="radio" id="star1half" name="rating" value="1 and a half" />
                              <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                              <input type="radio" id="star1" name="rating" value="1" />
                              <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                              <input type="radio" id="starhalf" name="rating" value="half" />
                              <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                           </fieldset>
                        </div>
            <br/>
                    <strong>Work Environment:</strong>
                    <div className="col-md-12 comp-class">
                       <fieldset className="rating">
                          <input type="radio" id="star5" name="rating" value="5" />
                          <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                          <input type="radio" id="star4half" name="rating" value="4 and a half" />
                          <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                          <input type="radio" id="star4" name="rating" value="4" />
                          <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                          <input type="radio" id="star3half" name="rating" value="3 and a half" />
                          <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                          <input type="radio" id="star3" name="rating" value="3" />
                          <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                          <input type="radio" id="star2half" name="rating" value="2 and a half" />
                          <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                          <input type="radio" id="star2" name="rating" value="2" />
                          <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                          <input type="radio" id="star1half" name="rating" value="1 and a half" />
                          <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                          <input type="radio" id="star1" name="rating" value="1" />
                          <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                          <input type="radio" id="starhalf" name="rating" value="half" />
                          <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                       </fieldset>
                    </div>
                    <br/>
                    <strong>Benefits:</strong>
                    <div className="col-md-12 comp-class">
                       <fieldset className="rating">
                          <input type="radio" id="star5" name="rating" value="5" />
                          <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                          <input type="radio" id="star4half" name="rating" value="4 and a half" />
                          <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                          <input type="radio" id="star4" name="rating" value="4" />
                          <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                          <input type="radio" id="star3half" name="rating" value="3 and a half" />
                          <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                          <input type="radio" id="star3" name="rating" value="3" />
                          <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                          <input type="radio" id="star2half" name="rating" value="2 and a half" />
                          <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                          <input type="radio" id="star2" name="rating" value="2" />
                          <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                          <input type="radio" id="star1half" name="rating" value="1 and a half" />
                          <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                          <input type="radio" id="star1" name="rating" value="1" />
                          <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                          <input type="radio" id="starhalf" name="rating" value="half" />
                          <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                       </fieldset>
                    </div>
                    <br/>
                    <strong>Manager Relationship:</strong>
                    <div className="col-md-12 comp-class">
                       <fieldset className="rating">
                          <input type="radio" id="star5" name="rating" value="5" />
                          <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                          <input type="radio" id="star4half" name="rating" value="4 and a half" />
                          <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                          <input type="radio" id="star4" name="rating" value="4" />
                          <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                          <input type="radio" id="star3half" name="rating" value="3 and a half" />
                          <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                          <input type="radio" id="star3" name="rating" value="3" />
                          <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                          <input type="radio" id="star2half" name="rating" value="2 and a half" />
                          <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                          <input type="radio" id="star2" name="rating" value="2" />
                          <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                          <input type="radio" id="star1half" name="rating" value="1 and a half" />
                          <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                          <input type="radio" id="star1" name="rating" value="1" />
                          <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                          <input type="radio" id="starhalf" name="rating" value="half" />
                          <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                       </fieldset>
                    </div>
                    <br/>
                    <input type="submit" id="reviewSubmit" value="Submit" />
                </fieldset>
            </form>
            </div>


        );
    }
}

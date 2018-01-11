import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {Mongo} from "meteor/mongo";
import {Tasks} from "../api/Tasks";
import {Review} from "../api/reviews";


// Hi = new Mongo.Collection('hing');
//
// Hi.allow({
//     insert() {return true},
//     update() {return true},
//     remove() {return true}
// });
// Hi.deny({
//     insert() {return false},
//     update() {return false},
//     remove() {return false}
// });
export default class Star extends React.Component {

    constructor() {
        super();
        this.state = {
            Wages: 1,
            Health: 1,
            Recommended: 1,
            title: '',
            description: ''
        };
    }

    // Handling the submit from forms
    handleSubmit(event){

        // Making sure method gets called
        alert('A name was submitted: ');

        // Prevent default browser form submit
        event.preventDefault();

        const Title = event.target.title.value;
        const Description = event.target.description.value;
        const wages = event.target.Wages.value;
        const health = event.target.Health.value
        const recommend = event.target.Recommended.value;

        // QuickCheck
        window.alert("Title: " + Title + "Description: " + Description + "Wages: " + wages + "Health: " + health + "Recommended: " + recommend);


        // Inserting to db
        //Hi.insert({text: "Hello"});
        Tasks.insert({text: "Hello"});
    }

    render() {
        const {Health} = this.state;
        const {Recommended} = this.state;
        const {Wages} = this.state;

        return (
            <html>
            <head>
                <title>Forms</title>
                <link type="text/css" rel="stylesheet" href="./main.css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"/>
            </head>
            <body>

            <form className="new-task" onSubmit={this.handleSubmit}>
                <fieldset>
                    <br/>
                    <br/>
                    <legend>Share your experiences here!!</legend>
                    <input type="text" placeholder="title:" name = "title" /><br/>
                    <textarea name = "description" type="text" placeholder="Enter text here .." rows="6" cols="50"></textarea><br/>

                    <div>
                            <h2>Wages: </h2>
                            <StarRatingComponent
                                name="Wages"
                                starCount={5}
                                value={Wages}
                            />
                            <br/>
                            <h2>Health and Safety: </h2>
                            <StarRatingComponent
                                name="Health"
                                starCount={5}
                                value={Health}
                            />
                            <br/>
                            <h2>Recommended: </h2>
                            <StarRatingComponent
                                name="Recommended"
                                starCount={5}
                                value={Recommended}
                            />
                    </div>
                    <br/>
                    <input type="submit" value="Submit" />
                </fieldset>
            </form>
            </body>
            </html>

        );
    }
}



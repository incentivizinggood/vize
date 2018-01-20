import React, { Component } from "react";
import ReactDOM from "react-dom";
import { mongo } from "meteor/mongo";

export default class Form extends Component {
    //export const Review = new Mongo.Collection('review');

    // Props:
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handling change to the specific event
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    // Handling the submit from forms
    handleSubmit(event) {
        alert("A name was submitted: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <html>
                <head>
                    <title>Forms</title>
                    <link type="text/css" rel="stylesheet" href="./main.css" />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" />
                </head>
                <body>
                    <form className="new-task" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Share your experiences here!!</legend>
                            <input type="text" placeholder="title:" />
                            <br />
                            <textarea
                                type="text"
                                placeholder="Enter text here .."
                                rows="6"
                                cols="50"
                                name="comment"
                                form="usrform"
                            />
                            <br />
                            Wages:
                            <input
                                type="number"
                                ref="wagesInput"
                                name="enteredWages"
                                min="1"
                                max="100"
                            />
                            <br />
                            Health:
                            <div className="rating">
                                <label>
                                    <input
                                        type="radio"
                                        name="stars"
                                        value="1"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars"
                                        value="2"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars"
                                        value="3"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars"
                                        value="4"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars"
                                        value="5"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                            </div>
                            <br />
                            Respect:
                            <div className="rating2">
                                <label>
                                    <input
                                        type="radio"
                                        name="stars2"
                                        value="1"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars2"
                                        value="2"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars2"
                                        value="3"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars2"
                                        value="4"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="stars2"
                                        value="5"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                            </div>
                            <br />
                            <input type="submit" value="Submit" />
                        </fieldset>
                    </form>
                </body>
            </html>
        );
    }
}

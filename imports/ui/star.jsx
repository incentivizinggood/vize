import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {Review} from "../api/reviews";

export default class Star extends React.Component {

    constructor() {
        super();
        this.state = {
            rating: 1,
            rating2: 1,
            title: '',
            description: ''
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    onStarClick2(nextValue, prevValue, name) {
        this.setState({rating2: nextValue});
    }

    // Handling the submit from forms
    handleSubmit(event){

        // Making sure method gets called
        alert('A name was submitted: ');

        // Prevent default browser form submit
        event.preventDefault();

        //const Title = event.target.title.value;
        //const Description = event.target.description.value;
        const Rate = event.target.rating.value
        //const Rate2 = this.state.rating2.valueOf();

        window.alert(Rate + "bitch i got it")



    }

    render() {
        const {rating} = this.state;
        const {rating2} = this.state;

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
                    Wages:
                    <input type="number" ref="wagesInput" name="enteredWages" min="1" max= "100"/><br/>

                    <div>
                            <h2>Health and Safety: {rating}</h2>
                            <StarRatingComponent
                                name="rating"
                                starCount={5}
                                value={rating}
                            />
                            <br/>
                            <h2>Recommended: {rating2}</h2>
                            <StarRatingComponent
                                name="rating2"
                                starCount={5}
                                value={rating2}
                                onStarClick={this.onStarClick2.bind(this)}
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
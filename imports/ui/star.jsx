import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

export default class Star extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 1,
            rating2: 1
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
        alert('A name was submitted: ' + this.state.rating);
        event.preventDefault();
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
                    <input type="text" placeholder="title:"/><br/>
                    <textarea type="text" placeholder="Enter text here .." rows="6" cols="50" name="comment" form="usrform"></textarea><br/>
                    Wages:
                    <input type="number" ref="wagesInput" name="enteredWages" min="1" max= "100"/><br/>

                    <div>
                            <h2>Health and Safety: {rating}</h2>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={rating}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                            <br/>
                            <h2>Recommended: {rating2}</h2>
                            <StarRatingComponent
                                name="rate2"
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
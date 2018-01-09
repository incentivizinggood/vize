<<<<<<< HEAD
import React, {Component} from 'react';
import {StarRating} from './StarRating.js'

export default class Star extends Component {
    render() {
        return (<html>
        <head>
            <title>Star</title>
            <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
        </head>
        <body>
        <br/>
        <br/>

        <div>
            <p> Health and Safety </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>

        <br/>
        <div>
            <p> Wages </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>
        <br/>
        <div>
            <p> Recommended </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>
        <br/>
        <textarea rows="10" columns="50" placeholder=" Your reviews here.."></textarea>
        <script>
            alert("Hello")
        </script>
        </body>
        </html>);

=======
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

export default class Star extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 6,
            rating2: 5
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    onStarClick2(nextValue, prevValue, name) {
        this.setState({rating2: nextValue});
    }

    render() {
        const {rating} = this.state;
        const {rating2} = this.state;

        return (
            <div>
                <br/>
                <h2>Rating from state: {rating}</h2>
                <StarRatingComponent
                    name="rate1"
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                <br/>
                <h2>Rating from state: {rating2}</h2>
                <StarRatingComponent
                    name="rate2"
                    starCount={10}
                    value={rating2}
                    onStarClick={this.onStarClick2.bind(this)}
                />
            </div>
        );
>>>>>>> urelbranch
    }
}
import React from "react";
import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";

export default class Star extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 6,
            rating2: 5
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    onStarClick2(nextValue, prevValue, name) {
        this.setState({ rating2: nextValue });
    }

    render() {
        const { rating } = this.state;
        const { rating2 } = this.state;

        return (
            <div>
                <br />
                <h2>Rating from state: {rating}</h2>
                <StarRatingComponent
                    name="rate1"
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
                <br />
                <h2>Rating from state: {rating2}</h2>
                <StarRatingComponent
                    name="rate2"
                    starCount={10}
                    value={rating2}
                    onStarClick={this.onStarClick2.bind(this)}
                />
            </div>
        );
    }
}

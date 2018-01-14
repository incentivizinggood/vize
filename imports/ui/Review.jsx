import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ReviewsDB } from '../api/data/reviews.js';

class Reviews extends Component {
    renderReviews() {
        let reviews = this.props.reviews;

        return reviews.map((review) => {
            return (
                <Review
                    key={review._id}
                    review={review}
                />
            );
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Reviews</h1>
                <span className="text">{this.props.reviews.text}</span>
            </div>
        );
    }
}

Reviews.propTypes = {
    // Error code
    //reviews: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('reviews');
    return {
        reviews: ReviewsDB.find({}).fetch(),
    };
}, Reviews);

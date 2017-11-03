import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { ReviewsDB } from '../api/reviews.js';

class Reviews extends Component {
    renderTasks() {
        let reviews = this.props.reviews;
        
        return reviews.map((task) => {
            return (
                <Review
                    key={reviews._id}
                    review={reviews}
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
    reviews: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('reviews');
    return {
        reviews: ReviewsDB.find({}).fetch(),
    };
}, Reviews);

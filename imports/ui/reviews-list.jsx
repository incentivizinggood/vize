import React from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Reviews } from "../api/data/reviews.js";
import ReviewListing from "./review-listing.jsx";

/* Display several reviews in a list.
 */
 
class ReviewsList extends React.Component {
    renderReviewList() {
        return this.props.reviews.map(review => (
            <ReviewListing key={review._id} review={review} />
        ));
    }
    render() {
        if (!this.props.isReady) {
            return <h2>Loading...</h2>;
        }

        return <div>{this.renderReviewList()}</div>;
    }
}

export default withTracker(({ query }) => {
    if (query === undefined) {
        query = {};
    }
    var handle = Meteor.subscribe("Reviews");

    return {
        isReady: handle.ready(),
        reviews: Reviews.find(query).fetch()
    };
})(ReviewsList);

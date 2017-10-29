import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Reviews } from '../api/reviews.js';

export default class Reviews extends Component {
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
  reviews: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    reviews: Reviews.find({}).fetch(),
  };
}, App);
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";

class Company extends Component {
    render() {
        return (
            <div className="container">
                <h2>#COMPANY NAME</h2>
                {/*Show company logo here */}
                <div className="about">
                    <h3>About Us</h3>
                    <p>#grab company about</p>
                </div>
                <div className="company-news">
                    <h3>Company News</h3>
                    <p>#grab company news</p>
                </div>
                <div className="company-details">
                    <h3>Address:</h3>
                    <span>#address</span>
                    <h3>Tel:</h3>
                    <span>#telephone</span>
                </div>
                <div className="ratings">
                    <div className="wages-rating">
                        <h4>Wages</h4>
                        {/*Show star rating for wages. Glyphicons available with bootstrap */}
                    </div>
                    <div className="safety-rating">
                        <h4>Safety</h4>
                        {/*Show star rating for safety. Glyphicons available with bootstrap */}
                    </div>
                    <div className="respect-rating">
                        <h4>Respect</h4>
                        {/*Show star rating for respect. Glyphicons available with bootstrap */}
                    </div>
                </div>
                <div className="reviews">
                    <h4 id="review-heading">Review Highlights</h4>
                    {/* display review highlights */}
                    <a>See all reviews...</a>
                </div>
            </div>
        );
    }
}


import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ReviewPage extends Component {
    render() {
        return (
            <div className='container'>
                <h2>#Company Name</h2>
                <h4 className='review-heading'>Reviews</h4>
                {/* For every review, display */}
            </div>
        );
    }
}

export default createContainer(()=>{
    
}, ReviewPage);
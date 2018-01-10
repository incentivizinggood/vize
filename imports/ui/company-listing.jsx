import React, {Component} from 'react';

export default class CompanyListing extends Component {

    render() {
        return (
            <div>
            <h3>{this.props.company.name}</h3>
            safety {this.props.company.ratings.safety} <br/>
            respect {this.props.company.ratings.respect}
            </div>
        );
    }
}

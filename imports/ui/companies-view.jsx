import React, { Component } from "react";
import CompanyListing from "./company-listing.jsx";
import CompaniesC from "../api/companies.js";
import { withTracker } from "meteor/react-meteor-data";

function wtf(x) {
    var functionlist = [];
    var otherslist = [];
    for (var p in x) {
        if (typeof x[p] === "function") {
            functionlist.push(p);
        } else {
            otherslist.push(p);
        }
    }
    console.log(
        "The object has the functions " +
            functionlist.join(", ") +
            " and the other stuff " +
            otherslist.join(", ")
    );
}

class Companies extends Component {
    renderCompanyList() {
        return this.props.companies.map(company => (
            <CompanyListing key={company._id} company={company} />
        ));
    }
    render() {
        return (<div>{this.renderCompanyList()}</div>);
    }
}

export default withTracker(() => {
    Meteor.subscribe('companies');

    return {
        companies: CompaniesC.CompaniesC.find({}).fetch()
    };
})(Companies);

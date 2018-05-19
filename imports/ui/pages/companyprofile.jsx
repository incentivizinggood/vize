import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../../api/data/companies.js";
import { Reviews } from "../../api/data/reviews.js";
import { JobAds } from "../../api/data/jobads.js";
import { Salaries } from "../../api/data/salaries.js";
import { Votes } from "../../api/data/votes.js";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import StarRatings from "react-star-ratings";

import OverviewTab from "../../ui/components/overviewTabCP.jsx";
import CompanyReview from "../../ui/components/companyReview.jsx";
import ReviewTab from "../../ui/components/reviewTabCP.jsx";
import JobTab from "../../ui/components/jobTabCP.jsx";
import SalaryTab from "../../ui/components/salaryTabCP.jsx";

/* The Company Profile  page of the site. */

class CompanyProfile extends React.Component {
    changeRating(newRating) {
        this.setState({
            rating: newRating,
        });
    }

    // var nojob = {
    //   locations[0]= "",
    //   pesosPerHour= "",
    //   contractType= "",
    //   jobDescription= "",
    //   jobTitle="",
    //   vizeApplyForJobUrl=""
    // }

    render() {
        if (!this.props.isReady) {
            return <h2>Loading...</h2>;
        }
        if (this.props.company === undefined) {
            return <h2>That company was not found</h2>;
        }

        return (
            <div className="navbarwhite">
                <Header />
                <br />
                <br />
                <br />

                <div className="welcome  welpadgo wel_profile">
                    <div className="container  welpad12 box_shadow">
                        <div className="col-md-2  prostar">
                            <img
                                src="/images/default-company.png"
                                className="img-responsive  hi"
                            />
                        </div>
                        <div className="col-md-6  prostar">
                            <div className="col-md-12">
                                <fieldset className="rating">
                                    <span className="headingoo">
                                        {this.props.company.name}
                                    </span>
                                    &nbsp;&nbsp;<StarRatings
                                        rating={
                                            this.props.company
                                                .overallSatisfaction
                                        }
                                        starDimension="25px"
                                        starSpacing="2px"
                                    />
                                </fieldset>
                            </div>
                            <div className="col-md-12 comp-prfl">
                                <p>
                                    <i
                                        className="fa fa-map-marker"
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </i>{" "}
                                    {this.props.company.locations[0]}
                                </p>
                                {/* displaying just the first company location for now, from the list */}
                                <p>
                                    <i
                                        className="fa fa-flask"
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </i>{" "}
                                    {this.props.company.industry}
                                </p>
                                <p>
                                    <i
                                        className="fa fa-globe"
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </i>{" "}
                                    {this.props.company.websiteURL}
                                </p>
                                <p>
                                    <i
                                        className="fa fa-users"
                                        aria-hidden="true"
                                    >
                                        {" "}
                                    </i>{" "}
                                    {this.props.company.numEmployees}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4 prostar">
                            <div className="col-md-12">
                                <div className="titlestar">
                                    {/* <div className="" data-toggle="buttons"> */}
                                    {/* <a href={this.props.company.vizeReviewUrl} className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a> */}

                                    <a
                                        href={this.props.company.vizeReviewUrl}
                                        className="btn btn-primary  add_review replus"
                                    >
                                        {" "}
                                        <i
                                            className="fa fa-plus"
                                            aria-hidden="true"
                                        />{" "}
                                        Add a Review
                                    </a>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"> </div>
                </div>

                <br />
                {/*}//navigation */}
                <section id="back_col">
                    <div className="container  mar_lf_ri">
                        <div className="row">
                            <div className="na_tab">
                                {/* <ul className="nav nav-tabs" role="tablist"> */}
                                <ul className=" nav nav-tabs">
                                    {/* Setting the width of each tab to 25% for each tab since we deleted the 5th one */}
                                    <li
                                        className="active"
                                        role="presentation"
                                        style={{ width: "25%" }}
                                    >
                                        <a
                                            href="#overview"
                                            aria-controls="overview"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            Overview
                                        </a>
                                    </li>
                                    <li
                                        role="presentation"
                                        style={{ width: "25%" }}
                                    >
                                        <a
                                            href="#reviews"
                                            aria-controls="reviews"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            Reviews
                                        </a>
                                    </li>
                                    <li
                                        role="presentation"
                                        style={{ width: "25%" }}
                                    >
                                        <a
                                            href="#jobs"
                                            aria-controls="jobs"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            Jobs
                                        </a>
                                    </li>
                                    <li
                                        role="presentation"
                                        style={{ width: "25%" }}
                                    >
                                        <a
                                            href="#salaries"
                                            aria-controls="salaries"
                                            role="tab"
                                            data-toggle="tab"
                                        >
                                            Salaries
                                        </a>
                                    </li>
                                    {/* Commenting out the Contact Us form for now */}
                                    {/* <li role="presentation"><a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact</a></li> */}
                                </ul>
                            </div>

                            <div className="tab_conten_man">
                                <div className="tab-content  ">
                                    {/* =====================overview tab====================  */}

                                    <OverviewTab
                                        jobsCount={this.props.jobsCount}
                                        jobAds={this.props.jobAds}
                                        salaries={this.props.salaries}
                                        companyoverview={this.props.company}
                                        companyreview={this.props.reviews}
                                        salariesCount={this.props.salariesCount}
                                        userVotes={this.props.userVotes}
                                    />

                                    {/* ===============overview tab end==================

        ===========review tab==================  */}
                                    {/* pass both!!!! */}
                                    <ReviewTab
                                        companyreview={this.props.reviews}
                                        companyinfo={this.props.company}
                                        userVotes={this.props.userVotes}
                                    />
                                    {/* ===========review tab  end==================

            ================job tab============== */}
                                    <JobTab
                                        jobAds={this.props.jobAds}
                                        jobsCount={this.props.jobsCount}
                                    />
                                    {/* ==================job tab end=====================

         =================Salaries  tab====================== */}
                                    <SalaryTab
                                        company={this.props.company}
                                        salaries={this.props.salaries}
                                        salariesCount={this.props.salariesCount}
                                    />
                                    {/* =================Salaries  tab  end======================

            ====================contact  tab==================== */}
                                    <div
                                        role="tabpanel"
                                        className="tab-pane"
                                        id="contact"
                                    >
                                        <div className="col-md-12  section_rview_back_color ">
                                            <div className="sect_re1 ">
                                                <h4 className="head_section_font">
                                                    Contact
                                                </h4>
                                                <hr />

                                                <div className="container-contact100">
                                                    <div className="wrap-contact100">
                                                        <form className="contact100-form validate-form">
                                                            <span className="contact100-form-title">
                                                                Feel free to
                                                                reach out to us
                                                            </span>
                                                            <div className="wrap-input100 rs1 validate-input">
                                                                <input
                                                                    id="first-name"
                                                                    className="input100"
                                                                    type="text"
                                                                    name="first-name"
                                                                    placeholder="Your Name"
                                                                />
                                                                <span className="focus-input100" />
                                                            </div>
                                                            <div className="wrap-input100 rs1 validate-input">
                                                                <input
                                                                    id="email"
                                                                    className="input100"
                                                                    type="text"
                                                                    name="email"
                                                                    placeholder="Eg. example@email.com"
                                                                />
                                                                <span className="focus-input100" />
                                                            </div>
                                                            <div className="wrap-input100 validate-input">
                                                                <textarea
                                                                    id="message"
                                                                    className="input100"
                                                                    name="message"
                                                                    placeholder="Please enter your comments..."
                                                                />
                                                                <span className="focus-input100" />
                                                            </div>
                                                            <div className="container-contact100-form-btn">
                                                                <button className="contact100-form-btn">
                                                                    <span>
                                                                        Submit
                                                                        <i className="zmdi zmdi-arrow-right m-l-8" />
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clear" />
                                        </div>
                                        {/* =================contact end====================== */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withTracker(({ companyId }) => {
    var handle1 = Meteor.subscribe("CompanyProfiles");
    var handle2 = Meteor.subscribe("Reviews");
    var handle3 = Meteor.subscribe("JobAds");
    var handle4 = Meteor.subscribe("Salaries");
    var handle5 = Meteor.subscribe("Votes", {
        submittedBy: Meteor.userId(),
        voteSubject: "review",
    });

    return {
        isReady:
            handle1.ready() &&
            handle2.ready() &&
            handle3.ready() &&
            handle4.ready() &&
            handle5.ready(),
        company: Companies.findOne(companyId),
        reviews: Reviews.find({ companyId: companyId }).fetch(),
        jobAds: JobAds.find({ companyId: companyId }).fetch(),
        jobsCount: JobAds.find({ companyId: companyId }).count(),
        salaries: Salaries.find({ companyId: companyId }).fetch(),
        salariesCount: Salaries.find({ companyId: companyId }).count(),
        userVotes: Votes, // the fetch thing doesn't suit my needs - Josh
    };
})(CompanyProfile);

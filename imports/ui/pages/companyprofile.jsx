import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../../api/data/companies.js";
import { Reviews } from "../../api/data/reviews.js";
import { JobAds } from "../../api/data/jobads.js";
import { Salaries } from "../../api/data/salaries.js";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import StarRatings from 'react-star-ratings';

import OverviewTab from "../../ui/components/overviewTabCP.jsx";
import CompanyReview from "../../ui/components/companyReview.jsx";
import ReviewTab from "../../ui/components/reviewTabCP.jsx";
import JobTab from "../../ui/components/jobTabCP.jsx";
import SalaryTab from "../../ui/components/salaryTabCP.jsx";

/* The Company Profile  page of the site. */

class CompanyProfile extends React.Component {

  changeRating( newRating ) {
      this.setState({
        rating: newRating
      });
    }

    render() {
      if (!this.props.isReady || !this.props.isReady1 || !this.props.isReady2 || !this.props.isReady3) {
          return <h2>Loading...</h2>;
      }
      if (this.props.company === undefined) {
          return <h2>That company was not found</h2>;
      }



        return(
         <div className="navbarwhite"><Header />
         <br />
         <br />
         <br />

      <div className="welcome  welpadgo wel_profile">
        <div className="container  welpad12 box_shadow">
           <div className="col-md-2  prostar">
              <img src="images/p5.jpg"  className="img-responsive  hi"/>
           </div>
           <div className="col-md-6  prostar">
              <div className="col-md-12">
                 <fieldset className="rating">
                    <span className="headingoo">{this.props.company.name}</span>
                    &nbsp;&nbsp;<StarRatings
                     rating={this.props.company.overallSatisfaction}
                     starDimension="25px"
                     starSpacing="2px"
                   />



                 </fieldset>

              </div>
              <div  className="col-md-12 comp-prfl">
                 <p><i className="fa fa-map-marker" aria-hidden="true"> </i> {this.props.company.locations[0]}</p>
                 {/* displaying just the first company location for now, from the list */}
         <p><i className="fa fa-flask" aria-hidden="true"> </i> {this.props.company.industry}</p>
         <p><i className="fa fa-globe" aria-hidden="true"> </i> {this.props.company.websiteURL}</p>
                 <p><i className="fa fa-users" aria-hidden="true"> </i> {this.props.company.numEmployees}</p>
              </div>
           </div>

           <div className="col-md-4 prostar">
              <div  className="col-md-12">
                 <div className="titlestar">
                    {/* <div className="" data-toggle="buttons"> */}
                      {/* <a href={this.props.company.vizeReviewUrl} className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a> */}

                      <a href={this.props.company.vizeReviewUrl} className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                    {/* </div> */}

                 </div>
              </div>
           </div>
        </div>
        <div className="clearfix"> </div>
     </div>

<br />
     {/*}//navigation */}
<section   id="back_col">

  <div className="container  mar_lf_ri">

     <div  className="row">


              <div  className="na_tab"  >
                 <ul className="nav nav-tabs" role="tablist">
                    <li className="active" role="presentation"  ><a href="#overview" aria-controls="overview" role="tab" data-toggle="tab">Overview</a></li>
                    <li role="presentation"><a href="#reviews" aria-controls="reviews" role="tab" data-toggle="tab">Reviews</a></li>
                    <li role="presentation"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a></li>
                    <li role="presentation"><a href="#salaries" aria-controls="salaries" role="tab" data-toggle="tab">Salaries</a></li>
                    <li role="presentation"><a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact</a></li>
                 </ul>
              </div>



        <div className="tab_conten_man">
           <div className="tab-content  ">

     {/* =====================overview tab====================  */}


        <OverviewTab jobsCount = {this.props.jobsCount} firstjobAd={this.props.jobAds[2]} firstsalary={this.props.salaries[0]} companyoverview={this.props.company} companyreview = {this.props.reviews} salariesCount = {this.props.salariesCount}/>

        {/* ===============overview tab end==================

        ===========review tab==================  */}
        {/* pass both!!!! */}
        <ReviewTab companyreview = {this.props.reviews} companyinfo = {this.props.company}/>
        {/* ===========review tab  end==================

            ================job tab============== */}
        <JobTab jobAds = {this.props.jobAds} jobsCount = {this.props.jobsCount}/>
          {/* ==================job tab end=====================

         =================Salaries  tab====================== */}
        <SalaryTab company={this.props.company} salaries = {this.props.salaries} salariesCount = {this.props.salariesCount}/>
             {/* =================Salaries  tab  end======================

            ====================contact  tab==================== */}
                            <div role="tabpanel" className="tab-pane" id="contact">
                               <div className="col-md-12  section_rview_back_color ">
                                  <div  className="sect_re1 ">
                                     <h4  className="head_section_font">Contact</h4>
                                    <hr />


                <div className="container-contact100">
                   <div className="wrap-contact100">
                      <form className="contact100-form validate-form">
                         <span className="contact100-form-title">
                         Feel free to reach out to us
                         </span>
                         <div className="wrap-input100 rs1 validate-input">
                            <input id="first-name" className="input100" type="text" name="first-name" placeholder="Your Name" />
                            <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 rs1 validate-input">
                            <input id="email" className="input100" type="text" name="email" placeholder="Eg. example@email.com" />
                            <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 validate-input">
                            <textarea id="message" className="input100" name="message" placeholder="Please enter your comments..."></textarea>
                            <span className="focus-input100"></span>
                         </div>
                         <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn">
                            <span>
                            Submit
                            <i className="zmdi zmdi-arrow-right m-l-8"></i>
                            </span>
                            </button>
                         </div>
                      </form>
                   </div>
                </div>
                </div>
                               <div className="clear"></div>
                            </div>
     {/* =================contact end====================== */}
                         </div>

                      </div>
                    </div>
                  </div>
</div>
</section>
</div>
        )
    }
}


export default withTracker(({ companyId }) => {
    var handle = Meteor.subscribe("CompanyProfiles");
    var handle1 = Meteor.subscribe("Reviews");
    var handle2 = Meteor.subscribe("JobAds");
    var handle3 = Meteor.subscribe("Salaries");

    return {
        isReady: handle.ready(),
        isReady1: handle1.ready(),
        isReady2: handle2.ready(),
        isReady3: handle3.ready(),
        company: Companies.findOne(companyId),
        reviews: Reviews.find({companyId: companyId}).fetch(),
        jobAds: JobAds.find({companyId: companyId}).fetch(),
        jobsCount: JobAds.find({companyId: companyId}).count(),
        salaries: Salaries.find({companyId: companyId}).fetch(),
        salariesCount: Salaries.find({companyId: companyId}).count(),
    };
})(CompanyProfile);

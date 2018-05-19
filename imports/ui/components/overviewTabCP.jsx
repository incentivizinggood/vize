import React from "react";
import StarRatings from 'react-star-ratings';
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";
import CompanyReview from "../../ui/components/companyReview.jsx";
import JobPosting from "../../ui/components/jobPosting.jsx";
import SalaryPosting from "../../ui/components/salaryPosting.jsx";

export default class OverviewTab extends React.Component {



render() {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var to_display_jobs;
  var salaries_to_display;
  var to_display_review;
  var className;
if(this.props.companyreview.length > 0){
  if(this.props.companyreview[0].wouldRecommendToOtherJobSeekers){
    className = <p style={{color:"#2E8B57"}}><i className="fa fa-check-square" style={{color:"#2E8B57"}} aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p>;
  }else{
    className = <p style={{color:"#FF4545"}}><i className="far fa-times-circle" style={{color:"#FF4545"}} aria-hidden="true"></i>&nbsp;&nbsp;Not Recommended</p>;
  }
}

//FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB

if(this.props.companyreview.length > 0){

  to_display_review =
	<CompanyReview item={this.props.companyreview[0]} userVotes={this.props.userVotes}/>

} else{
  to_display_review = "No Reviews to show right now";
}

//FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
  if(this.props.jobAds.length > 0){
    to_display_jobs =
    <div>
    <div>
       <h4><strong>{this.props.jobAds[0].jobTitle}</strong></h4>
    </div>
    <div>
      <div  className="add-buttons">
               <a href={this.props.jobAds[0].vizeApplyForJobUrl} className="btn btn-primary">   Apply now</a>
       </div>
       <p> <i className="fa fa-map-marker" ></i>&nbsp;&nbsp;&nbsp;{this.props.jobAds[0].locations[0]}</p>
       <p> <i className="fa fa-money" ></i>&nbsp;&nbsp;{this.props.jobAds[0].pesosPerHour}/Hour</p>
       <p> <i className="fa fa-calendar" ></i>&nbsp;&nbsp;{this.props.jobAds[0].contractType}</p>
    </div>


    <hr />
    <h4 className="h4-font-sz-job">Job Description</h4>
    <div  className="h4-font-sz">

          <p>{this.props.jobAds[0].jobDescription}</p>
   </div>
 </div>

  } else {  //the length == 0
    to_display_jobs = "No Jobs to show right now";
  }


//FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
  if(this.props.salaries.length > 0) {
    salaries_to_display =
    <div>
    <div className="hed-soft-mob">
            <p>{this.props.salaries[0].jobTitle}</p>
            <hr />
         </div>

         <p  className="mal-r">{this.props.salaries[0].gender}</p>

        <p>{this.props.salaries[0].incomeType}<span>: {this.props.salaries[0].incomeAmount}</span></p>
    </div>


  } else {
    salaries_to_display = "No Salaries to display right now";
  }



//MAIN JSX FILE

    return(
      <div role="tabpanel" className="tab-pane active" id="overview">

      <div className="col-md-12  section_rview_back_color ">
       <div  className="sect_re1 ">
        <h4  className="head_section_font">{this.props.companyoverview.name} Overview</h4>

        <hr />


        <div  className="over_p">
        <p>{this.props.companyoverview.descriptionOfCompany}</p>

         </div>
      </div>
      </div>
      <div className="clear"></div>

        <div  className="col-md-12  section_rview_back_color08  "> {/* review link */}
                               <h4  className="head_section_font">{this.props.companyoverview.name} Reviews</h4>
                               <div  className="add-buttons">
                                 <a href={this.props.companyoverview.vizeReviewUrl} className="btn btn-primary"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                                </div>

                               <hr />

                                <CompanyRating companyrating={this.props.companyoverview}/>

                             </div>
                             <div  className="col-md-12  section_overtopsect">

                            {to_display_review}


                          <center>
                            <div  className="na_tab1"  >
                             <ul className="" role="tablist">
                                <li role="presentation"  className="te_deco"><a href="#reviews" aria-controls="reviews" role="tab" data-toggle="tab"><strong>See All Reviews ></strong></a></li>
                             </ul>
                          </div>
                          </center>
                             </div>
                             {/* review link */}



                             <div className="col-md-12  section_rview_back_color_job"> {/* job link */}
                              <div  className="sect_re1 ">
                                  <h4  className="head_section_font">{this.props.jobsCount} Job(s) Available</h4>
                                  <hr />

                                  {to_display_jobs}


                                <center>
                                  <div  className="na_tab1">
                                   <ul className="" role="tablist">
                                   <li role="presentation"   className="te_deco"><a href="#jobs" aria-controls="jobs" aria-expanded="true" role="tab" data-toggle="tab"> <strong>See All Jobs ></strong></a></li>
                                    </ul>
                                    </div>
                                  </center>

                                   </div>

                             </div>

                             {/*job link */}

                           <div className="col-md-12  section_rview_back_color_job"> {/* salaries  */}
                                <div  className="sect_re1  sec_p">

                                   <h4  className="head_section_font">{this.props.salariesCount} Job Salaries</h4>

                                    <div  className="add-buttons">
                                             <a href={this.props.companyoverview.vizeSalaryUrl} className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"></i>   Add a salary</a>
                                           </div>
                                   <hr />

                                       {salaries_to_display}


                                        <center>

                                            <ul className="" role="tablist">
                                              <li role="presentation"   id="see_all_salaries" className="te_deco"><a href="#salaries" aria-controls="salaries" role="tab" data-toggle="tab"><strong>See All Salaries ></strong></a></li>
                                            </ul>
                                        </center>

                                      </div>
                                      </div>
      </div>

)
}
}

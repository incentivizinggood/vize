import React from "react";
import StarRatings from 'react-star-ratings';
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";
import CompanyReview from "../../ui/components/companyReview.jsx";
import JobPosting from "../../ui/components/jobPosting.jsx";
import SalaryPosting from "../../ui/components/salaryPosting.jsx";

export default class OverviewTab extends React.Component {



render() {
    return(
      <div role="tabpanel" className="tab-pane active" id="overview">

      <div className="col-md-12  section_rview_back_color ">
       <div  className="sect_re1 ">
        <h4  className="head_section_font">{this.props.company.name} Overview</h4>

        <hr />


        <div  className="over_p">
        <p>{this.props.company.descriptionOfCompany}</p>
        {/* Dont know what to do about the Mission */}
          <p><span>Mission:</span> Google’s mission is to organize the world’s information and make it universally accessible and useful.</p>
         </div>
      </div>
      </div>
      <div className="clear"></div>

        <div  className="col-md-12  section_rview_back_color08  "> {/* review link */}
                               <h4  className="head_section_font">{this.props.company.name} Reviews</h4>
                               <div  className="add-buttons">
                                          <button><i className="fa fa-plus" ></i>&nbsp; Add a Review</button>
                                </div>

                               <hr />
                                <CompanyRating company={this.props.company}/>

                             </div>


                                   <CompanyReview />
                             <div  className="col-md-12  section_overtopsect">
                                    {/* <center>  <li  className="te_deco"><a href="#reviewss"   >See All Reviews</a> </li></center> */}

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
                                  <h4  className="head_section_font">15 Jobs Available</h4>
                                  <hr />
                                   <div>
                                      <h4><strong>Software Engineer</strong></h4>
                                   </div>
                                   <div>
                                      <p> <i className="fa fa-map-marker" ></i>&nbsp;&nbsp;&nbsp;San Fransisco California</p>
                                      <p> <i className="fa fa-money" ></i>&nbsp;&nbsp;$50-$80/Hour</p>
                                      <p> <i className="fa fa-calendar" ></i>&nbsp;&nbsp;Full Time</p>
                                   </div>
                                    <div  className="fl-ri-app">
                                              <button>Apply Now</button>
                                            </div>
                                   <hr />
                                   <h4 className="h4-font-sz-job">Job Description</h4>
                                   <div  className="h4-font-sz">

                                         <p>Egestas mollitia quos metus natus assumenda ullam suscipit ultricies. Voluptas, nihil natoque elementum error ligula exercitatione
                                            quuntur turpis eros aut justo qui recusandae eos, soluta repellat ipsa tortor tempus ultricesfermentum! Corporis accusamus dictum! Sapien laboris massa fugit deserunt laboriosam mi consectetur curabitur cum.
                                         </p>

                                <hr />
                                <center>
                                  <div  className="na_tab1">
                                   <ul className="" role="tablist">
                                   <li role="presentation"   className="te_deco"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab"> <strong>See All Jobs ></strong></a></li>
                                    </ul>
                                    </div>
                                  </center>
                                <div   className="fl-ri">
                                               <p>posted on April 19th, 2018</p>
                                            </div>
                                   </div>
                                </div>
                             </div> {/*job link */}
                           <div className="col-md-12  section_rview_back_color_job"> {/* salaries  */}
                                <div  className="sect_re1  sec_p">

                                   <h4  className="head_section_font">30 Job Salaries</h4>
                                   <div  className="add-buttons">
                                              <button><i className="fa fa-plus" ></i>&nbsp; Add a Salary</button>
                                    </div>
                                   <hr />
                                      <SalaryPosting />


                                      <div  className="col-md-12  section_overtopsect">
                                        <center>
                                          <div  className="na_tab1"  >
                                            <ul className="" role="tablist">
                                              <li role="presentation"   className="te_deco"><a href="#salaries" aria-controls="salaries" role="tab" data-toggle="tab"><strong>See All Salaries ></strong></a></li>
                                            </ul>
                                          </div>
                                        </center>
                                      </div>
                                      </div>
                                      </div>

                                      {/* salaries end*/}


      </div>

)
}
}

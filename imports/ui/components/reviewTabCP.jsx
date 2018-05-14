import React from "react";
import StarRatings from 'react-star-ratings';
import CompanyReview from "../../ui/components/companyReview.jsx";
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";

export default class ReviewTab extends React.Component {

  render() {
      return(

      <div role="tabpanel" className="tab-pane" id="reviews">
         <div  className="col-md-12  section_rview_back_color2  "  >
           <h4  className="head_section_font">{this.props.companyreview.name} Reviews</h4>
           <div  className="add-buttons">
             <a href={this.props.companyreview.vizeReviewUrl} className="btn btn-primary"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                      {/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
            </div>
           <hr />

            {/* <CompanyRating /> */}
            <CompanyRating companyrating={this.props.companyreview}/>

         </div>
         {/* <hr />
         <h3  className="head_section_font_25">25 Reviews</h3> */}

         {/* <CompanyReview /> */}
         <CompanyReview companyreview={this.props.companyreview}/>



      {/* ==========review 2========== */}
                {/* <CompanyReview /> */}
                <CompanyReview companyreview={this.props.companyreview}/>


      </div>

    )
  }
  }

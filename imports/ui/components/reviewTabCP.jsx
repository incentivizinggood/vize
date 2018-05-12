import React from "react";
import StarRatings from 'react-star-ratings';
import CompanyReview from "../../ui/components/companyReview.jsx";
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";

export default class ReviewTab extends React.Component {

  render() {
      return(

      <div role="tabpanel" className="tab-pane" id="reviews">
         <div  className="col-md-12  section_rview_back_color2  "  >
           <h4  className="head_section_font">Google Reviews</h4>
           <div  className="add-buttons">
                      <button><i className="fa fa-plus" ></i>&nbsp; Add a Review</button>
            </div>
           <hr />

            <CompanyRating />

         </div>
         {/* <hr />
         <h3  className="head_section_font_25">25 Reviews</h3> */}

         <CompanyReview />



      {/* ==========review 2========== */}
                <CompanyReview />


      </div>

    )
  }
  }

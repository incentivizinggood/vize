import React from "react";
import StarRatings from 'react-star-ratings';
import CompanyReview from "../../ui/components/companyReview.jsx";
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";

export default class ReviewTab extends React.Component {

  render() {


    const RenderedItems = this.props.companyreview.map(function(item, i){
      return <CompanyReview key={i} item = {item}/>
    });

      return(

      <div role="tabpanel" className="tab-pane" id="reviews">
         <div  className="col-md-12  section_rview_back_color2  "  >
           <h4  className="head_section_font">{this.props.companyinfo.name} Reviews</h4>
           <div  className="add-buttons">
             <a href={this.props.companyinfo.vizeReviewUrl} className="btn btn-primary"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                      {/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
            </div>
           <hr />


            <CompanyRating companyrating={this.props.companyinfo}/>

         </div>

         {RenderedItems}

      </div>

    )
  }
  }

import React from "react";
import StarRatings from 'react-star-ratings';

export default class ReviewComponent extends React.Component {
  render() {
    // var className;
    // if(this.props.item.wouldRecommendToOtherJobSeekers){
    //   className = <p ><i className="fa fa-check-square" style={{color:"#2E8B57"}} aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p>;
    // }else{
    //   className = <p ><i className="far fa-times-circle" style={{color:"#FF4545"}} aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p>;
    // }

      return(


  <div  className="col-md-12  section_over_revi2 ">
    <div  className="rev_section">
       <div  className="mar_pad2">
         {/* this.props.companyreview has the company collection for that particular company */}

         {/* <p>{console.log(this.props.item.datePosted.toString())}</p> */}
          <p>{this.props.item.datePosted.toString()}<span>&nbsp;&nbsp;- <strong>{this.props.item.jobTitle}</strong></span></p>
          <h2  className="head-rev-con">{this.props.item.reviewTitle} </h2>

          <div className="btn-group show-on-hover">
             <a type="button" className="btn btn-default dropdown-toggle  btbn" data-toggle="dropdown">
             <StarRatings
              rating={(this.props.item.healthAndSafety + this.props.item.managerRelationship + this.props.item.workEnvironment + this.props.item.benefits)/4}
              //the average rating of all 5 ratings
              starDimension="15px"
              starSpacing="1.5px"
            />
             &nbsp;<i className="fa fa-caret-down"></i>
             </a>
             <ul className="dropdown-menu" role="menu">
               <li><label>Overall</label>
                  <br />
                  <StarRatings
                   rating={this.props.item.overallSatisfaction}
                   starDimension="15px"
                   starSpacing="1.5px"
                 />
               </li>
                <li><label>Health & Safety</label>
                   <br />
                   <StarRatings
                    rating={this.props.item.healthAndSafety}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li>  <label >Work Environment</label>
                   <br />
                   <StarRatings
                    rating={this.props.item.workEnvironment}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li><label >Benefits</label>
                   <br />
                   <StarRatings
                    rating={this.props.item.benefits}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li> <label >Manager Relationships</label>
                   <br />
                   <StarRatings
                    rating={this.props.item.managerRelationship}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>

             </ul>
          </div>

          <br />
          {/* //LEFT FOR NOW, the recommended star */}
          <p ><i className="fa fa-check-square-o faaa" aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p>
            {/* <p ><i className="far fa-times-circle" style={{color:"#FF4545"}} aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p> */}
            {/* {className} */}
       </div>
       <div  className="mar_pad">
          <div className="col-md-8">
             <div className="form-group  p-c-a">
               <br />
               <label>Pros</label>
               <br />
               <p >
                {this.props.item.pros}
               </p>
            </div>
            <br />
            <div className="form-group  p-c-a">
               <label>Cons</label>
               <br />
               <p>
                  {this.props.item.cons}
               </p>
            </div>
            <br />
            <div className="form-group  p-c-a">
               <label>Additional Comments</label>
               <br />
               <p>{this.props.item.additionalComments}</p>
            </div>
          </div>
          <div className="col-md-4 bn-col">
             <div  className="fl_ri">
                <br />
                <div  className="thumb_up_bn">
                   <button type="button" className="btn btn-default btn-circle btn-xl"> <i  className="fa fa-thumbs-o-up  "></i></button>
                </div>
                <br />
                <div  className="thumb_don_bn">
                   <button type="button" className="btn btn-default btn-circle btn-xl">  <i   className="fa fa-thumbs-o-down"></i></button>
                </div>
             </div>

          </div>
       </div>
       <div className="clear"></div>
    </div>


  </div>


)
}
}

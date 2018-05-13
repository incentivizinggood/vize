//This is the componenet that gets rendered when user searches for company name
import React from "react";
// import StarRatings from 'react-star-ratings';

const CompanyComponent = (props) => {

      return(
        <div>

        <div className="container box2 all_boxcolor">
           <div className="container  welpad1">
              <div className="col-md-3  prostar">
                 <a href="/companyprofile">
                    <div  className="shdo">
                       <img src=""  className="img-responsive"/>
                    </div>
                 </a>
              </div>
              <div className="col-md-4  prostar">
                 <label className="goo"> <a href={props.item.vizeProfileUrl}>{props.item.name}</a></label>

                 {/* &nbsp;&nbsp;<StarRatings
                  rating={4.103}
                  starDimension="25px"
                  starSpacing="2px"
                /> */}



                 <div  className="col-md-12 comp-class">
                    <div  className="locahed">
                       <h4><i className="fa fa-map-marker" aria-hidden="true"></i> <span>{props.item.locations}</span></h4>
                       <h4><i className="fa fa-flask" aria-hidden="true"></i> <span>{props.item.industry}</span></h4>
                       <h4><i className="fa fa-users" aria-hidden="true"></i> <span>{props.item.numEmployees}</span></h4>
                    </div>
                 </div>
              </div>
              <div className="col-md-5 prostar">
                 <div  className="col-md-12">
                    <div className="titlestar">
                       <div className="" data-toggle="buttons">
                          <label className="btn btn-lg btn-success active btn_follow1">
                          <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                          <i className="fa fa-check"></i> Following
                          </label>
                          <label className="btn btn-lg btn-danger btn_follow1">
                          <input type="radio" name="options" id="option" autoComplete="off"/>
                          Follow
                          </label>
                       </div>
                       <a href="#" className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                    </div>
                 </div>
              </div>
           </div>
           <div className="clearfix"> </div>
           <div  className="container  welpad1">
              <div  className="col-md-3">
                 <div  className="reviews1">
                    <ul>
                       <li className="active"><a href="#">{props.item.numReviews} <br/><span className="review_text">Reviews</span></a></li>
                       <li><a href="#">17K <br/><span className="review_text">Salaries</span></a></li>
                       <li><a href="#">8.0K <br/><span className="review_text">Interviews</span></a></li>
                    </ul>
                 </div>
              </div>
              <div  className="col-md-9">
                 <div className="pargrf">
                    <p>{props.item.descriptionOfCompany}</p>
                 </div>
              </div>
           </div>
           <div className="clearfix"> </div>
        </div>
    </div>
      );

  }

export default CompanyComponent;

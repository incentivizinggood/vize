import React from "react";
import StarRatings from 'react-star-ratings';

export default class ReviewComponent extends React.Component {
  render() {
      return(

        <div  className="col-md-12  section_over_revi2 ">
    <div  className="rev_section">
       <div  className="mar_pad2">
          <p>April 12, 2018<span>&nbsp;&nbsp;- Line Worker</span></p>
          <h2  className="head-rev-con">Lorem Lorem  </h2>

          <div className="btn-group show-on-hover">
             <a type="button" className="btn btn-default dropdown-toggle  btbn" data-toggle="dropdown">
             <StarRatings
              rating={4} //the average rating of all 5 ratings
              starDimension="15px"
              starSpacing="1.5px"
            />
             &nbsp;<i className="fa fa-caret-down"></i>
             </a>
             <ul className="dropdown-menu" role="menu">
               <li><label>Overall</label>
                  <br />
                  <StarRatings
                   rating={4}
                   starDimension="15px"
                   starSpacing="1.5px"
                 />
               </li>
                <li><label>Health & Safety</label>
                   <br />
                   <StarRatings
                    rating={4}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li>  <label >Work Environment</label>
                   <br />
                   <StarRatings
                    rating={3}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li><label >Benefits</label>
                   <br />
                   <StarRatings
                    rating={5}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>
                <li> <label >Manager Relationships</label>
                   <br />
                   <StarRatings
                    rating={4}
                    starDimension="15px"
                    starSpacing="1.5px"
                  />
                </li>

             </ul>
          </div>

          <br />
          <p ><i className="fa fa-check-square-o faaa" aria-hidden="true"></i>&nbsp;&nbsp;Recommended</p>
       </div>
       <div  className="mar_pad">
          <div className="col-md-8">
             <div className="form-group  p-c-a">
               <br />
               <label>Pros</label>
               <br />
               <p >
                  Awesome company with great benefits!
               </p>
            </div>
            <br />
            <div className="form-group  p-c-a">
               <label>Cons</label>
               <br />
               <p>
                  Managers were often rude and pretentious.
               </p>
            </div>
            <br />
            <div className="form-group  p-c-a">
               <label>Additional Comments</label>
               <br />
               <p>The company has been growing a lot and a can see a great future for it.</p>
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

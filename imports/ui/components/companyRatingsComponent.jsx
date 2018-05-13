import React from "react";
import StarRatings from 'react-star-ratings';

export default class CompanyRating extends React.Component {

  render() {
      return(
        <div>
          <div  className="col-md-6  bodr_lft">

             <div  className="star_boder ">
             <label>Overall</label>&nbsp;&nbsp;&nbsp;&nbsp;
             <StarRatings
              rating={4.2}
              starDimension="25px"
              starSpacing="2px"
            />
             &nbsp;&nbsp; &nbsp;&nbsp;<label id="overAllText">4.2</label>
          </div>
          <br />
          <div  className="tab_str" >
             <table  className="table">
                <tbody>
                  <tr>
                     <td><label htmlFor="input-2" className="control-label  lef_label">Health & Safety</label></td>
                     <td>
                     <StarRatings
                      rating={4.1}
                      starDimension="20px"
                      starSpacing="1.8px"
                    />
                        &nbsp;&nbsp; <label>4.1</label>
                     </td>
                  </tr>
                  <tr>
                     <td><label htmlFor="input-3" className="control-label   lef_label">Work Environment</label></td>
                     <td>
                     <StarRatings
                      rating={3.2}
                      starDimension="20px"
                      starSpacing="1.8px"
                    />
                        &nbsp;&nbsp; <label>3.2</label>
                     </td>
                  </tr>
                  <tr>
                     <td><label htmlFor="input-4" className="control-label   lef_label">Benefits</label></td>
                     <td>
                     <StarRatings
                      rating={3.5}
                      starDimension="20px"
                      starSpacing="1.8px"
                    />
                        &nbsp;&nbsp; <label>3.5</label>
                     </td>
                  </tr>
                  <tr>
                     <td>  <label htmlFor="input-5" className="control-label  lef_label">Manager Relationships</label></td>
                     <td>
                     <StarRatings
                      rating={3.6}
                      starDimension="20px"
                      starSpacing="1.8px"
                    />
                         &nbsp;&nbsp; <label>4.4</label>
                      </td>
                   </tr>
                   </tbody>
                </table>
             </div>
          </div>
          <div  className="col-md-6  ">
             {/* <h4  className="head_section_font">Google Overview</h4> */}
             {/* <div  className="revw_tab1">
                <p>4,389 Reviews</p>
                </div> */}
              <center> <h3> Recommended </h3></center>
                <br />
                     <div className="progress yellow">
                     <span className="progress-left">
                        <span className="progress-bar"></span>
                     </span>
                     <span className="progress-right" >
                        <span className="progress-bar"></span>
                     </span>
                     <div className="progress-value" >91%</div>
                     </div>
                     <center>
                     <div  className="col-md-6"><div  className="num_sett"><h1>38 </h1></div></div>
                     <div className="col-md-6"><div  className="num_sett">   <span>Average number <br /> of months worked</span></div></div>
                     </center>

          </div>
          <div className="clear"></div>
          </div>


        )
      }
      }

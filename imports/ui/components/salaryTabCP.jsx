import React from "react";
import SalaryPosting from "../../ui/components/salaryPosting.jsx";

export default class SalaryTab extends React.Component {

  render() {

    const RenderedItems = this.props.salaries.map(function(item, i) {
      return <SalaryPosting key={i} item={item}/>
        });

      return (
    <div role="tabpanel" className="tab-pane" id="salaries">
        <div className="col-md-12  section_rview_back_color03 ">
          <h4 className="head_section_font">{this.props.salariesCount} Job Salaries</h4>
            <div  className="add-buttons">
              <a href={this.props.company.vizeSalaryUrl} className="btn btn-primary"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Salary</a>
                       {/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
             </div>


            {/* <button>
              <i className="fa fa-plus"></i>&nbsp; Add a Salary</button> */}
        </div>

        <div className="col-md-12  section_rview_back_color05 ">
          {/* <SalaryPosting />
            <hr />
            <SalaryPosting /> */
          }

          {RenderedItems}

          {/* mobile view range show  section 1  code */}

          <div className="mobile_view">
            <div>
              <div className="hed-soft-mob">
                <p>Software Engineer</p>
              </div>

              <p className="mal-r">Male</p>
              <div className="pad-r">
                <p>Average<span>:$125,333</span>
                </p>
                <p>Range<span>:$99k-166k</span>
                </p>
              </div>

              <p className="mal-r">Female</p>
              <div className="pad-r">
                <p>Average<span>:$125,333</span>
                </p>
                <p>Range<span>:$99k-166k</span>
                </p>
              </div>
            </div>

            <div>
              <hr/>
              <div className="hed-soft-mob">
                <p>Product Manager</p>
              </div>

              <p className="mal-r">Male</p>
              <div className="pad-r">
                <p>Average<span>:$125,333</span>
                </p>
                <p>Range<span>:$99k-166k</span>
                </p>
              </div>

              <p className="mal-r">Female</p>
              <div className="pad-r">
                <p>Average<span>:$125,333</span>
                </p>
                <p>Range<span>:$99k-166k</span>
                </p>
              </div>
            </div>

            {/* mobile view range show   code  end */}

          </div>
          <div className="clear"></div>
        </div>
      </div>)
    }
  }

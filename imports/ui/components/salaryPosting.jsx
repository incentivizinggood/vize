import React from "react";

export default class SalaryPosting extends React.Component {
	render() {
		return (
			<div>
				<div>
					<div className="col-md-12 section_rview_back_color05 ">
						<div className="sect_re11 ">
							<div className="hed-soft-mob">
								<p>{this.props.item.jobTitle}</p>
								<hr />
							</div>

							<p className="mal-r">{this.props.item.gender}</p>
							<div className="pad-r">
								<p>
									{this.props.item.incomeType}
									<span>
										: {this.props.item.incomeAmount}
									</span>
								</p>
								{/* <p>Range<span>:$99k-166k</span></p> */}
							</div>

							{/* <p   className="mal-r">Female</p>
                  <div  className="pad-r">
                 <p>Average<span>:$125,333</span></p>
                 <p>Range<span>:$99k-166k</span></p>
                 </div> */}

							{/* <hr /> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/*
    <div  className="sect_re1  sec_p">

    <div    className="mobile-progress"   >
       <div  className="row">
          <div  className="col-md-4">
             <div  className="hed-soft">
                <p>Software Engineer</p>
             </div>
          </div>
          <div className="4"></div>
          <div   className="col-md-4  fl-ri-tb">
             <table  className="table   tbavr">
               <tbody>
                <tr>
                   <td><strong>Average</strong></td>
                   <td ><strong>Range</strong></td>
                </tr>
                </tbody>
             </table>
          </div>
       </div>
       <div className="row">
          <div  className="col-md-3">
             <p>Male</p>
          </div>
          <div className="col-md-5">

             <div className="progress1  ">
                <div className="progress-bar1 progress-bar-success" role="progressbar" style={{width:50}}>

                </div>
                <div className="progress-bar1 progress-bar-warning" role="progressbar" style={{width:10}}>

                </div>
                <div className="progress-bar1 progress-bar-success" role="progressbar" style={{width:40}}>

                </div>
             </div>

          </div>
          <div  className="col-md-4">
             <table  className="table">
               <tbody>
                <tr>
                   <td>$126,462</td>
                   <td  className="ali-lef">$99k-$166k</td>
                </tr>
                </tbody>
             </table>
          </div>
          <div className="clear"></div>
       </div>
       <div   className="row">
          <div  className="col-md-3">
             <p>Female</p>
          </div>
          <div className="col-md-5">

             <div className="progress1  ">
                <div className="progress-bar1 progress-bar-success" role="progressbar" style={{width:50}}>

                </div>
                <div className="progress-bar1 progress-bar-warning" role="progressbar" style={{width:10}}>

                </div>
                <div className="progress-bar1 progress-bar-success" role="progressbar" style={{width:40}}>

                </div>
             </div>

          </div>
          <div  className="col-md-4">
             <table  className="table">
             <tbody>
                <tr>
                   <td>$126,462</td>
                   <td  className="ali-lef">$99k-$166k</td>
                </tr>
                </tbody>
             </table>
          </div>
          <div className="clear"></div>
       </div>







     </div>
       </div>*/

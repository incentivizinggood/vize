import React from "react";
import Blaze from "meteor/gadicc:blaze-react-component";
import "./pages/search.html";
import { Companies } from "../api/data/companies.js";
import { withTracker } from "meteor/react-meteor-data";
import CompanyComponent from "./companyComponent.jsx";
import Header from "./pages/header.jsx";
import Footer from "./pages/footer.jsx";


/* A set of controls for the user to select search queries and options.
 * For use in the CompanySearchPage.
 */
var input = '';


////////////////////CHILD COMPONENT///////////////////
class Results extends React.Component {

  render(){
    var first = this.props.company;

    const RenderedItems = this.props.company.map(function(item, i){
      return <CompanyComponent key={i} item = {item}/>
    });


    return(
        <ul>
          {RenderedItems}
        </ul>

      );
  }
}


let Results1 = withTracker(({query}) => {
   var handle = Meteor.subscribe("CompanyProfiles");

   return {
       isReady: handle.ready(),
       company: Companies.find({"name": { $regex: ".*" + query + ".*", $options: 'i'}}).fetch()
       //db.CompanyProfiles.find({$text: {$search: "vize"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}
   };
})(Results);


///////////////Company Search -- Main Component////////////////////
export default class CompanySearchTrial extends React.Component {

  constructor(props){
    super(props);
    this.state = {input: ""};
  }

  componentDidMount(){
    console.log("Inside the company Search trial page");
  }

//Gives error for now -- Need to ask Julian for this.
  // componentWillMount() {
  //     const script = document.createElement("script");
  //     script.src = "/js/custom.js";
  //     script.async = true;
  //     document.body.appendChild(script);
  //     }

    handleSubmit(event){
        event.preventDefault();

        input = this.refs.input_search.value;
        // console.log(input);
        this.refs.input_search.value = "";
        this.setState({input: input});
    }

    render() {
        return (
          <div className="customcompanypage">
            <Header />
            <div className="container-fluid  search_companies">
            <div className="row all_boxcolor1 select_box1">
               <div>
                  <div  id="companies_header1" className="callbacks_container">

                     <ul className="rslides" id="slider3">
                        <li>
                           <div className="banner-text-info">
                              <form className="example" onSubmit= {this.handleSubmit.bind(this)}>
                                 <input ref ="input_search" type="text" placeholder="Search for a Company..."/>
                                 <button type="submit">SEARCH</button>
                              </form>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>
         <div className="clearfix"> </div>












{/* ////////////////////////RESULTS CODE///////////////////////////////// */}


          <Results1 query={this.state.input}/>

      </div>
        );
    }
}

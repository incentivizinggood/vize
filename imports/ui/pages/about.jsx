import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import { Meteor } from "meteor/meteor";

/* A page where visitors can get information about Vize and this app.
 */
export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            value: "",
            textBox: "",
            emailSending: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTextBoxChanging = this.handleTextBoxChanging.bind(this);
    }

    handleSubmit(event) {
        //alert("Called: " + this.state.name + " Email: " + this.state.emailSending  + " TextBox: " + this.state.textBox);

        Meteor.call(
            "sendEmail",
            "incentivizinggood@gmail.com",
            "postmaster@incentivizinggood.com",
            "Contacting us: " + this.state.name,
            "Howdy Vize reader,\n" +
                "Below is the message: \n" +
                this.state.textBox +
                ".\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: " +
                this.state.emailSending,
            (err, res) => {
                if (err) {
                    console.log("--- BEGIN error:");
                    alert("Please try again");
                    console.log(err);
                    console.log("--- END error");
                } else {
                    console.log("--- BEGIN success:");
                    console.log(res);
                    console.log("--- END success");
                    alert("Thank you for the feedback!");
                }
            }
        );

        // alert("wassup");
        event.preventDefault();

        //clearing fields
        document.getElementById("first-name").value = null;
        document.getElementById("email").value = null;
        document.getElementById("message").value = null;
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ emailSending: event.target.value });
    }
    handleTextBoxChanging(event) {
        this.setState({ textBox: event.target.value });
    }

    render() {
        return (
            <div>
                <Header />
                <div id="home" className="banner about-banner">
                    <div className="banner-info">
                        <div className="banner-text">
                            <h1>About</h1>
                        </div>
                    </div>
                </div>

                <div className="about">
                    <div className="container">
                        <div className="col-md-12">
                            <h1 className="al">The Problem</h1>
                            <h3 className="emplh3">
                                EMPLOYEES DON'T HAVE LEVERAGE
                            </h3>
                        </div>
                        <div className="col-md-12 ">
                            <div className="about-row">
                                <p>
                                    To fill large orders in a timely manner and
                                    get enough business to survive as a company,
                                    factories cuts corners, working their
                                    employees beyond their limits and not taking
                                    the time to ensure that the job is safe. In
                                    highly developed legal systems this would be
                                    stopped by the police and enforced with
                                    legislation that protects workers' labor
                                    rights. In most developing countries, such
                                    legislation either doesn't exist or they
                                    lack the capacity to enforce it. In short,
                                    factories have every incentive to cut
                                    corners, and no incentive to be held
                                    accountable to their employees. So how do we
                                    increase the leverage that workers have in
                                    this circumstance?
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>

                <div className="about  bl">
                    <div className="container">
                        <div className="col-md-12  cdoun">
                            <h1 className="al">Our Solution</h1>

                            <h3 className="emplh3">
                                REVIEWS ARE A FORM OF ACCOUNTABILITY
                            </h3>
                        </div>
                        <div className="col-md-12 ">
                            <div className="about-row">
                                <p>
                                    To provide employees in developing countries
                                    with more leverage, we're creating a
                                    platform for workers to share reviews of
                                    their working conditions with all other
                                    workers in their region. This will give
                                    workers the information they need to avoid
                                    factories with terrible working conditions.
                                    Factories with poor reviews will get fewer
                                    workers, thus be unable to fill large orders
                                    from buyers, and lose profits. This will
                                    create a direct incentive for factories to
                                    improve conditions based on feedback coming
                                    directly from the workers themselves.{" "}
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>

                <div className="cont about-cont">
                    <div className="container">
                        <div className="container-contact100">
                            <div className="wrap-contact100">
                                <form
                                    method="POST"
                                    className="contact100-form validate-form"
                                    onSubmit={this.handleSubmit}
                                    id="submitForm"
                                >
                                    <span className="contact100-form-title">
                                        Feel free to reach out to us
                                    </span>
                                    <div className="wrap-input100 rs1 validate-input">
                                        <input
                                            id="first-name"
                                            className="input100"
                                            type="text"
                                            name="first-name"
                                            placeholder="Your Name"
                                            onChange={this.handleNameChange}
                                        />
                                        <span className="focus-input100" />
                                    </div>
                                    <div className="wrap-input100 rs1 validate-input">
                                        <input
                                            id="email"
                                            className="input100"
                                            type="text"
                                            name="email"
                                            placeholder="Eg. example@email.com"
                                            onChange={this.handleEmailChange}
                                        />
                                        <span className="focus-input100" />
                                    </div>
                                    <div className="wrap-input100 validate-input">
                                        <textarea
                                            id="message"
                                            className="input100"
                                            name="message"
                                            placeholder="Please enter your comments..."
                                            onChange={
                                                this.handleTextBoxChanging
                                            }
                                        />
                                        <span className="focus-input100" />
                                    </div>
                                    <div className="container-contact100-form-btn">
                                        <button
                                            className="contact100-form-btn"
                                            form="submitForm"
                                            value="Submit"
                                        >
                                            <span>
                                                Submit
                                                <i className="zmdi zmdi-arrow-right m-l-8" />
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

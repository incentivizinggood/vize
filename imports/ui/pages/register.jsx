import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import Dialog from "./dialog-box.jsx"


const t = i18n.createTranslator("common.register");
const T = i18n.createComponent(t);

/* The page where users can create an account.
 */
export default class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() === null ? null : "loggedIn",
			success: false,
			username: "",
			password: "",
			role: "",
		};

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleInputChange(event) {
		const {target} = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const {name} = target;

		this.setState({
			[name]: value,
		});
	}


	handleSubmit(event) {
		event.preventDefault(); // Prevent the default behavior for this event.
		const createUserCallback = error => {
			if (error) console.error(error);
			this.setState({
				// Using slice here to remove the period from the error reason
				// so that it will work as a JSON key in the translation files.
				error: error ? error.reason.slice(0, -1) : null,
				success: !error,
			});
			if (this.state.success) {
				FlowRouter.go("/");
			}
		};
		const options = {
			username: this.state.username,
			password: this.state.password,
			role: this.state.role,
		};
		Accounts.createUser(options, createUserCallback);
	}

	buttonClicked(event) {
		event.preventDefault();
		$(document).ready(function() {
			$('#register-form-link').click(function(e) {
				$("#register-form").delay(100).fadeIn(100);
				$("#worker-form").fadeOut(100);
				$('#worker-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});

			$('#worker-form-link').click(function(e) {
				$("#worker-form").delay(100).fadeIn(100);
				$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});
		});
	}

	render() {
		if (this.state.success) {
			return <div className="page register">Sign up successful!</div>;
		}
		return (

			<div className="page register">
				{this.state.error ? <div>{this.state.error}</div> : null}
				<Header/>
				<div className="container  login-top-spce">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="panel panel-login   register-work-employee">
								<div className="panel-body">
									<div className="row">
										<div className="col-lg-12">
											<form id="register-form" action="" method="post" style= {{display: "none"}} onSubmit={this.handleSubmit}>
												<h3 className="top-head-employer" align="center">Employer Register</h3>
												<br/>
												<div  className="employer-fm">
													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="text" placeholder="Username" className="form-control"  name="username" id="username" autoFocus
																   required
																   value={this.state.username}
																   onChange={this.handleInputChange}/>
															<label for="Username" className="glyphicon glyphicon-user" rel="tooltip" title="Username" />
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="email" name="email" id="email" className="form-control"  placeholder="Email"/>
															<label for="email" className="fa fa-envelope-o" rel="tooltip" title="email" />
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="text" name="companyName" id="companyName" className="form-control"  placeholder="Company Name"/>
															<label for="companyName" className="fa fa-building-o" rel="tooltip" title="companyName"/>
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md   pwd-line-sm">
															<input type="password" name="password" id="password" className="form-control"  placeholder="Password" required
																   value={this.state.password}
																   onChange={this.handleInputChange}/>
															<label for="password" className="fa fa-lock" rel="tooltip" title="password"/>
														</div>
													</div>

													<div className="button-center">
														<a href="#" className="button out-bodr-get1">Get Started</a>
													</div>
												</div>
											</form>
											<form id="worker-form" action="" method="post" role="form"   style={{display: "block"}}>
												<h3  className="top-head-worker" align="center" >Worker  Register</h3>
												<br/>
												<div  className="employer-fm">
													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="text" placeholder="Username" className="form-control  "  name="username" id="username" autoFocus
																   required
																   value={this.state.username}
																   onChange={this.handleInputChange}/>
															<label for="Username" className="glyphicon glyphicon-user" rel="tooltip" title="Username" />
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="email" name="email" id="email" className="form-control  "  placeholder="Email" />
															<label for="email" className="fa fa-envelope-o" rel="tooltip" title="email"/>
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md   pwd-line-sm">
															<input type="password" name="password" id="password" className="form-control  "  placeholder="Password" required
																   value={this.state.password}
																   onChange={this.handleInputChange}/>
															<label for="password" className="fa fa-lock" rel="tooltip" title="password" />
														</div>
													</div>
												</div>

												<div className="button-center">
													<a href="#" className="button out-bodr-get1">Get Started</a>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="panel-heading  p-head">
									<div className="row">
										<div className="col-lg-12">
											<div className="text-center   login-link-cs">
												Already have an account?  <a href="/login" > Log In </a>
											</div>
											<div className="clearfix" />
										</div>
										<div className="col-xs-12 ">
											<div className="btn-emp">
												<a href="#"   className="button" id="register-form-link"  role="button" onClick={this.buttonClicked} >Employer</a>
											</div>
											<div  className="btn-work">
												<a href="#" className="button  active" id="worker-form-link"  role="button" onClick={this.buttonClicked} >Worker  </a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer/>
				<Dialog/>
			</div>
		);
	}
}


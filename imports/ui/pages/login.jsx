import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import i18n from "meteor/universe:i18n";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";

const t = i18n.createTranslator("common.login");
const T = i18n.createComponent(t);

/* The page where users can login to the app.
 */
export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: Meteor.userId() === null ? null : "loggedIn",
			success: false,
			username: "",
			password: "",
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
		const { target } = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault(); // Prevent the default behavior for this event.
		const loginCallback = error => {
			if (error) console.error(error);
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
			if (this.state.success) {
				FlowRouter.go("/");
			}
		};
		Meteor.loginWithPassword(
			this.state.username,
			this.state.password,
			loginCallback
		);
	}

	render() {
		if (this.state.success) {
			return (
				<div className="page login">
					<T>success</T>
				</div>
			);
		}
		return (
			<div className="page login">
				{this.state.error ? (
					<div>
						<T>{`error.${this.state.error}`}</T>
					</div>
				) : null}
				<Header/>
				<div className="container  login-top-spce">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="panel panel-login">
								<div className="panel-heading">
									<div className="row">
										<div className="col-xs-12">
											<br/>
												<h3 className="top-head-employer" align="center">Login</h3>
												<hr/>
										</div>
									</div>
								</div>
								<div className="panel-body">
									<div className="row">
										<div className="col-lg-12">
											<form id="login-form" action="#" method="post" role="form" style={{display: "block"}} onSubmit={this.handleSubmit}>
												<div className="login-fm">
													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="text" placeholder="Username" className="form-control  "  name="username" id="username" placeholder={t("username")} required value={this.state.username} onChange={this.handleInputChange}/>
															<label htmlFor="loginform-username" for="Username" className="glyphicon glyphicon-user" rel="tooltip" title="Username"/>
														</div>
													</div>

													<div className="form-group">
														<div className="icon-addon addon-md">
															<input type="password" name="password" id="password" className="form-control"  placeholder="Password" value="" placeholder={t("password")} required value={this.state.password} onChange={this.handleInputChange}/>
															<label for="password" className="fa fa-lock" rel="tooltip" title="password"/>
														</div>
													</div>

													<div className="form-group text-center">
													</div>

													<div className="button-center">
														<a href="#" className="button out-bodr-login" type="submit" value={t("submit")}>Login</a>
													</div>


													<div className="form-group">
														<div className="row">
															<div className="col-lg-12">
																<div className="text-center reg">
																	Don't have an account?  <a href="/register" > Register</a>
																</div>
																<br/>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

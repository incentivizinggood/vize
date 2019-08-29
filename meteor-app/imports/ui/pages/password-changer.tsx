import React from "react";
import { Link } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

import { withUser } from "imports/ui/hoc/user";
import PageWrapper from "imports/ui/components/page-wrapper";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor.passwordChanger;

/* A form where users can change their passwords.
 */
class PasswordChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: this.props.user !== null ? null : "Not logged in",
			success: false,
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: "",
		};

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		const callback = error => {
			if (error) console.error(error);
			this.setState({
				error: error ? error.reason : null,
				success: !error,
			});
		};

		// Double check to avoid typos.
		if (this.state.newPassword !== this.state.repeatNewPassword) {
			callback({ reason: "New passwords do not match" });
			return;
		}

		Accounts.changePassword(
			this.state.oldPassword,
			this.state.newPassword,
			callback
		);
	}

	renderContent() {
		return (
			<div
				className="password-reset"
				style={{ width: "80%", margin: "auto" }}
			>
				{this.state.error ? (
					<div>
						<T.error renderer={t => t[this.state.error]} />
					</div>
				) : null}
				<br />
				<h3>
					<strong>Change Password</strong>
				</h3>
				<br />
				<form onSubmit={this.handleSubmit}>
					<label
						htmlFor="passwordChangeForm-oldPassword"
						style={{ width: "100%" }}
					>
						<T.oldPassword
							renderer={t => (
								<input
									id="passwordChangeForm-oldPassword"
									name="oldPassword"
									type="password"
									placeholder={t}
									required
									value={this.state.oldPassword}
									onChange={this.handleInputChange}
									style={{ width: "100%" }}
								/>
							)}
						/>
					</label>
					<br />
					<br />
					<label
						htmlFor="passwordChangeForm-newPassword"
						style={{ width: "100%" }}
					>
						<T.newPassword
							renderer={t => (
								<input
									id="passwordChangeForm-newPassword"
									name="newPassword"
									type="password"
									placeholder={t}
									required
									value={this.state.newPassword}
									onChange={this.handleInputChange}
									style={{ width: "100%" }}
								/>
							)}
						/>
					</label>
					<br />
					<br />
					<label
						htmlFor="passwordChangeForm-repeatNewPassword"
						style={{ width: "100%" }}
					>
						<T.newPassword
							renderer={t => (
								<input
									id="passwordChangeForm-repeatNewPassword"
									name="repeatNewPassword"
									type="password"
									placeholder={t}
									required
									value={this.state.repeatNewPassword}
									onChange={this.handleInputChange}
									style={{ width: "100%" }}
								/>
							)}
						/>
					</label>
					<br />
					<br />
					<T.submit
						renderer={t => (
							<input
								type="submit"
								className="btn btn-primary"
								value={t}
							/>
						)}
					/>
					<br />
					<br />
				</form>
			</div>
		);
	}

	render() {
		let content = null;

		if (this.state.success) {
			content = (
				<div
					style={{ width: "80%", margin: "0 auto" }}
					className="password-reset"
				>
					<T.success />
					<br />
					<br />
				</div>
			);
		} else if (this.props.user) {
			content = this.renderContent();
		} else {
			content = (
				<div style={{ width: "80%", margin: "0 auto" }}>
					<br />
					You must be logged in to use this page. <br /> <br />
					<Link className="btn btn-primary" to="/login">
						Log In
					</Link>
					<br />
				</div>
			);
		}

		return (
			<PageWrapper title="Account Recovery">
				<div className="container form-page">
					<div className="row">
						<div
							className="back_top_hover"
							style={{ backgroundColor: "#ffffff" }}
						>
							<br />
							{content}
						</div>
					</div>
				</div>
			</PageWrapper>
		);
	}
}

export default withUser(PasswordChanger);

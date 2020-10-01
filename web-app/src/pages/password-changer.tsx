import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { urlGenerators } from "src/pages/url-generators";

import { withUser, useUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";
import { changePassword } from "src/auth";

const T = translations.legacyTranslationsNeedsRefactor.passwordChanger;

interface Inputs {
	oldPassword: string;
	newPassword: string;
	repeatNewPassword: string;
}

/* A form where users can change their passwords.
 */
export default function PasswordChanger() {
	const user = useUser();

	const { register, handleSubmit } = useForm<Inputs>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: "",
		},
	});

	const onSubmit: SubmitHandler<Inputs> = data => {
		// Double check to avoid typos.
		if (data.newPassword !== data.repeatNewPassword) {
			this.setState({
				error: "New passwords do not match",
				success: false,
			});
			return;
		}

		changePassword({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		})
			.then(() =>
				this.setState({
					error: null,
					success: true,
				})
			)
			.catch(error =>
				this.setState({
					error: error.error.errors,
					success: false,
				})
			);
	};

	return (
		<PageWrapper title="Account Recovery">
			<div className="container form-page">
				<div className="row">
					<div
						className="back_top_hover"
						style={{ backgroundColor: "#ffffff" }}
					>
						<br />

						<div
							className="password-reset"
							style={{ width: "80%", margin: "auto" }}
						>
							{this.state.error ? (
								<div>
									<T.error
										renderer={t =>
											// TODO: Some of the error messages,
											// particularly ones from the server,
											// will not be translated at the moment.
											t[this.state.error] ||
											this.state.error
										}
									/>
								</div>
							) : null}
							<br />
							<h3>
								<strong>Change Password</strong>
							</h3>
							<br />
							<form onSubmit={handleSubmit(onSubmit)}>
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
												ref={register}
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
												ref={register}
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
												ref={register}
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
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}

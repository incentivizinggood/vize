import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

import { translations as T } from "imports/ui/translations";

class CompaniesSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: "" };

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
		event.preventDefault();
		this.props.history.push(`/companies/?search=${this.state.search}`);
	}

	render() {
		return (
			<form className="form-search_header" onSubmit={this.handleSubmit}>
				<div className="search-bar-style">
					<T.companiesSearchBar
						renderer={({ placeholder }) => (
							<input
								type="text"
								className="companies-search-input"
								name="search"
								placeholder={placeholder}
								value={this.state.search}
								onChange={this.handleInputChange}
							/>
						)}
					/>
					<button type="submit" className="search-icon">
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</form>
		);
	}
}

export default withRouter(CompaniesSearchBar);

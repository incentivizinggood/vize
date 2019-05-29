import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.homePage");
const T = i18n.createComponent(t);

class CompaniesSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: "" };

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
		event.preventDefault();
		this.props.history.push(`/companies/?search=${this.state.search}`);
	}

	render() {
		return (
			<form className="form-search_header" onSubmit={this.handleSubmit}>
				<div className="search-bar-style">
					<input
						type="text"
						className="companies-search-input"
						name="search"
						placeholder={t("placeholder")}
						value={this.state.search}
						onChange={this.handleInputChange}
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

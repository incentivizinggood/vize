/* eslint-env mocha */

import assert from "assert";
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { If, Then, Else } from "./if-else.jsx";

describe("If else component", function() {
	const expectedRender = (
		<>
			<span>This is</span>
			suppost to
			<em>render</em>
		</>
	);
	const expectNoRender = (
		<>
			<span>This</span> should not <em>render</em>
		</>
	);

	const truthyValue = true;
	const falseyValue = false;

	it("When cond is truthy only what is in <Then> is rendered.", function() {
		const onTrue = (
			<If cond={truthyValue}>
				<Then>{expectedRender}</Then>
				<Else>{expectNoRender}</Else>
			</If>
		);

		const renderer = new ShallowRenderer();
		renderer.render(onTrue);
		const result = renderer.getRenderOutput();

		assert.equal(result.type, Then, "The result is just <Then>.");
		assert.equal(
			result.props.children,
			expectedRender,
			"Then still has its children."
		);
	});
	it("When cond is falsey only what is in <Else> is rendered.", function() {
		const onFalse = (
			<If cond={falseyValue}>
				<Then>{expectNoRender}</Then>
				<Else>{expectedRender}</Else>
			</If>
		);

		const renderer = new ShallowRenderer();
		renderer.render(onFalse);
		const result = renderer.getRenderOutput();

		assert.equal(result.type, Else, "The result is just <Else>.");
		assert.equal(
			result.props.children,
			expectedRender,
			"Else still has its children."
		);
	});
});

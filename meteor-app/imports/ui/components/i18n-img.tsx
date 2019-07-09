import React from "react";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

const t = i18n.createTranslator();

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface I18nImgProps
	extends Omit<JSX.IntrinsicElements["img"], "src" | "alt"> {
	src: (locale: string) => string;
	alt?: string;
}

/**
 * An img that can be swapped out for internationalization.
 * @param       src       A function that takes the current locale code and gives the url of the image to use.
 * @param       alt       A translation key for the alt text.
 * @param       restProps All other props will be passed unmodified to the img element.
 */
function I18nImg({ src, alt, ...restProps }: I18nImgProps) {
	const locale = i18n.getLocale();

	return (
		<img
			src={src(locale)}
			alt={alt === undefined ? "" : t(alt)}
			{...restProps}
		/>
	);
}

export default withUpdateOnChangeLocale(I18nImg) as React.ComponentType<
	I18nImgProps
>;

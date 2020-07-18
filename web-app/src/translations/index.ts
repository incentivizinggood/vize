export * from "./types";
import makeTranslationComponents, { makeTranslationHook } from "./translations";

import en from "./en";
import es from "./es";

const translations = makeTranslationComponents({
	en,
	es,
});

const useTranslations = makeTranslationHook({
	en,
	es,
});

export { translations, useTranslations };

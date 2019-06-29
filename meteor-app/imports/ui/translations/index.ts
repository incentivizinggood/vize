import makeTranslationComponents from "./translations";

import en from "./en";
import es from "./es";

const translations = makeTranslationComponents({
	en,
	es,
});

export { translations };

interface MonthTranslationsInterface {
	[key: string]: string;
}

export const monthTranslations: MonthTranslationsInterface = {
	0: "enero",
	1: "febrero",
	2: "marzo",
	3: "abril",
	4: "mayo",
	5: "junio",
	6: "julio",
	7: "agosto",
	8: "septiembre",
	9: "octubre",
	10: "noviembre",
	11: "diciembre",
};

export const workShiftTranlsations = {
	MORNING_SHIFT: "Turno Matutino",
	AFTERNOON_SHIFT: "Turno Vespertino",
	NIGHT_SHIFT: "Turno Nocturno",
};

export const educationTranslations = {
	SOME_HIGH_SCHOOL: "Preparatoria Trunca",
	HIGH_SCHOOL: "Preparatoria",
	SOME_COLLEGE: "Universidad Trunca",
	COLLEGE_DEGREE: "Título Universitario",
};

export const languageProficiencyTranslations = {
	NATIVE_LANGUAGE: "Nativo",
	FLUENT: "Fluido",
	CONVERSATIONAL: "Conversacional",
	BASIC: "Básico",
	NO_PROFICIENCY: "Ninguno",
};

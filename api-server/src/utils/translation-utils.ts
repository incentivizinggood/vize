interface DateTranslationsInterface {
	[key: string]: string;
}

export const monthTranslations: DateTranslationsInterface = {
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

export const dayTranslations: DateTranslationsInterface = {
	0: "lun",
	1: "mar",
	2: "mie",
	3: "jue",
	4: "vie",
	5: "sab",
	6: "dom",
};

export const salaryTypeTranlsations = {
	YEARLY_SALARY: "año",
	MONTHLY_SALARY: "mes",
	WEEKLY_SALARY: "semana",
	DAILY_SALARY: "dia",
	HOURLY_WAGE: "hora",
};

export const contractTypeTranlsations = {
	FULL_TIME: "Tiempo Completo",
	PART_TIME: "Medio Tiempo",
	INTERNSHIP: "Prácticas (Pasantía)",
	TEMPORARY: "Proyecto (Temporal)",
	CONTRACTOR: "Contratista",
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

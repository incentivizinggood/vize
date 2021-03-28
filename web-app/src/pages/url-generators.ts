export const queryRoutes = {
	about: "acerca-de-nosotros",
	createCompanyProfile: "crear-perfil-de-la-empresa",
	createUserProfile: "crear-perfil-de-usuario",
	contactUs: "contactenos",
	reviews: "evaluaciones",
	reviewSubmitted: "evaluacion-enviada",
	forEmployers: "empleadores",
	help: "ayuda",
	jobs: "trabajos",
	job: "trabajo",
	jobApplicationSubmitted: "solicitud-enviada",
	myAccount: "mi-cuenta",
	postJob: "publicar-una-oferta",
	companies: "empresas",
	overview: "descripcion-general",
	workerResources: "recursos",
	employerResources: "empleadores/recursos",
	companyProfile: "perfil-de-la-empresa",
	writeReview: "escribir-evaluacion",
	submitSalaryData: "agregar-salario",
	salaries: "salarios",
	applyForJob: "postularme",
	register: "crear-cuenta",
	requestPasswordReset: "solicitud-para-restablecer-contraseña",
	resetPassword: "restablecer-contraseña",
	login: "iniciar-sesion",
	user: "usuario",
	privacyPolicy: "poliza-de-privacidad",
	changePassword: "cambiar-contraseña",
};

export const queryParameters = {
	companyName: "nombre-de-empresa",
	user: "usuario",
};

// exporting commonly-used URL generators
// in order to reduce the risk of typos
// and reduce the use of magic strings

export function vizeResourceUrl(slug: string, audienceType: string): string {
	if (audienceType === "EMPLOYERS") {
		return `/${queryRoutes.employerResources}/recurso/${slug}`;
	} else {
		return `/${queryRoutes.workerResources}/recurso/${slug}`;
	}
}

export function vizeResourceTopicUrl(topicName: string): string {
	return `./${queryRoutes.workerResources}/temas/${topicName}`;
}

export function vizeCompanyProfileUrl(
	companyId: string,
	companyTab?: string
): string {
	if (companyTab) {
		return `/${queryRoutes.companyProfile}/${companyId}/${companyTab}`;
	} else {
		return `/${queryRoutes.companyProfile}/${companyId}`;
	}
}

export function vizeReviewUrl(companyName?: string): string {
	return `/${queryRoutes.writeReview}/${
		companyName
			? `?${queryParameters.companyName}=${encodeURIComponent(
					companyName
			  )}`
			: ""
	}`;
}

export function vizeSalaryUrl(companyName?: string): string {
	return `/${queryRoutes.submitSalaryData}/${
		companyName
			? `?${queryParameters.companyName}=${encodeURIComponent(
					companyName
			  )}`
			: ""
	}`;
}

export function vizeApplyForJobUrl(jobId: string): string {
	return `/${queryRoutes.applyForJob}/?id=${jobId}`;
}

export function vizeRegister(userRole?: string): string {
	return `/${queryRoutes.register}/${
		userRole
			? `?${queryParameters.user}=${encodeURIComponent(userRole)}`
			: ""
	}`;
}

export function vizeLogin(userRole?: string): string {
	return `/${queryRoutes.login}/${
		userRole
			? `?${queryParameters.user}=${encodeURIComponent(userRole)}`
			: ""
	}`;
}

export function vizeRequestPasswordReset(): string {
	return `/${queryRoutes.requestPasswordReset}`;
}

export function vizeResetPassword(): string {
	return `/${queryRoutes.resetPassword}`;
}

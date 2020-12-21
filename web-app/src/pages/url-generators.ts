export const queryRoutes = {
	resources: "recursos",
	companyProfile: "perfil-de-la-empresa",
	writeReview: "escribir-evaluacion",
	submitSalaryData: "submit-salary-data",
	applyForJob: "postularme",
	register: "crear-cuenta",
	login: "iniciar-sesion",
	user: "usuario",
};

// exporting commonly-used URL generators
// in order to reduce the risk of typos
// and reduce the use of magic strings

export function vizeResourceUrl(slug: string): string {
	return `/${queryRoutes.resources}/recurso/${slug}`;
}

export function vizeResourceTopicUrl(topicName: string): string {
	return `/${queryRoutes.resources}/temas/${topicName}`;
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
		companyName ? `?companyname=${encodeURIComponent(companyName)}` : ""
	}`;
}

export function vizeSalaryUrl(companyName?: string): string {
	return `/${queryRoutes.submitSalaryData}/${
		companyName ? `?companyname=${encodeURIComponent(companyName)}` : ""
	}`;
}

export function vizeApplyForJobUrl(jobId: string): string {
	return `/${queryRoutes.applyForJob}/?id=${jobId}`;
}

export function vizeRegister(userRole?: string): string {
	return `/${queryRoutes.register}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
}

export function vizeLogin(userRole?: string): string {
	return `/${queryRoutes.login}/${
		userRole ? `?user=${encodeURIComponent(userRole)}` : ""
	}`;
}

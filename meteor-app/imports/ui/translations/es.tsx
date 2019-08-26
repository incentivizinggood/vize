import React from "react";

export default {
	homePage: {
		mainBanner: "Encuentre un Buen Trabajo Cerca de Usted",
		searchButton: "Buscar",
		placeholder: "Buscar una empresa...",
		findjob_title: "Conoce El Trabajo Antes De Que Lo Consigas",
		rewardText: "Gana $100 pesos por compartir tu experiencia laboral",
		findjob_text:
			"No pierda el tiempo yendo de fábrica a fábrica, busque puestos de trabajo y lea opiniones de otros empleados para encontrar el mejor trabajo para usted",
		jobsButton: "Trabajos",
		findemp_title: (
			<>
				Encuentre un empleador
				<br />
				que lo trate bien
			</>
		),
		findemp_text:
			"Vize te ayuda a identificar empleadores basados en diferentes industrias, tipos de trabajo y tamaños de empresas. Las opiniones y calificaciones incentivan a las empresas a crear ambientes de trabajo enriquecedores y condiciones de trabajo seguras.",
		companiesButton: "Empresas",
		hear: "Escuche de su ",
		community: "comunidad",
		hear_text:
			"Consulte opiniones y valoraciones anónimas de compañías expedidas por personas en su Comunidad. Agregue valor a la comunidad al compartir su experiencia laboral.",
		add_review_button: "Agregar una Opinión",
		get_fair_salary: "Obtenga un salario",
		your_work: "justo por su trabajo",
		fairsalary_text:
			"Encuentre cientos de salarios para diferentes puestos de trabajo y géneros. Comparta su salario de forma anónima para asegurarse de que otros reciban una compensación justa.",
		salary_button: "Agregar un Salario",
		discover_employers: "Comience a descubrir nuevos empleadores ahora",
		signup_button: "Registrar",
	},
	companiesSearchBar: {
		placeholder: "Buscar una empresa...",
	},
	header: {
		companies: "Compañias",
		jobs: "Trabajos",
		resources: "Recursos",
		my_company: "Mi Compañía",
		post_a_job: "Publicar un Trabajo",
		for_employers: "Para Empleadores",
		login: "Iniciar Sesión",
		signup: "Registrar",
		signup_or_login: "Registrar O Iniciar Sesion",
		logout: "Cerrar Seccion",
		myaccount: "Mi Cuenta",
	},
	footer: {
		aboutUs: "Acerca de nosotros",
		contactUs: "Contáctenos",
		help: "Ayuda",
		allRightsReserved: "Todos los derechos reservados",
	},
	loginRegister: {
		login: "Iniciar Sesión",
		noAccount: "¿No tienes una cuenta? ",
		register: "Registrar",
		username: { label: "Usuario", placeholder: "Usuario" },
		password: { label: "Contraseña", placeholder: "Contraseña" },
		registrationSuccess: "¡Registracion exitosa!",
		companyName: {
			label: "Nombre de Compañía",
			placeholder: "Nombre de Compañía",
		},
		alreadyAccount: "¿Ya tienes una cuenta? ",
		employee: "Trabajador",
		employer: "Empleador",
		email: {
			label: "Correo Electrónico",
			placeholder: "Correo Electrónico",
		},
		createAccount: "Crear Cuenta",
		registerOrLogin: "Regístrese o inicie sesión para escribir una opinión",
	},
	createCompany: {
		formTitle: "Crear un nuevo perfil",
		fields: {
			companyName: {
				label: "Nombre de la empresa",
				placeholder: "Por favor ingrese el nombre de su empresa",
			},
			contactEmail: {
				label: "Email de contacto",
				placeholder:
					"Proporcione un correo electrónico para comunicarnos con su empresa (ejemplo@email.com)",
			},
			yearEstablished: { label: "Año Establecido" },
			numEmployees: { label: "Numero de empleados" },
			industry: {
				label: "Industria",
				placeholder:
					"Por favor díganos la industria principal de su empresa",
			},
			locations: {
				label: "Ubicaciones",
				addElement: ({ array }: { array: unknown[] }) =>
					`Agrega ${array.length > 0 ? "otra" : "una"} ubicación`,
				city: {
					label: "Ciudad",
					placeholder: "Ingrese la ciudad para su ubicación",
				},
				address: {
					label: "Dirección",
					placeholder: "Ingresa la dirección de tu ubicación",
				},
				industrialHub: {
					label: "Parque Industrial",
					placeholder:
						"Ingrese al parque industrial para su ubicación (por ejemplo, Florido, Pacífico, etc.)",
				},
			},
			contactPhoneNumber: {
				label: "Numbero de Contacto",
				placeholder: "###-###-####",
			},
			websiteURL: {
				label: "Url pagina de internet",
				placeholder:
					"Ingrese la URL del sitio web de su empresa, si tiene una",
			},
			descriptionOfCompany: {
				label: "Descripcion de la compañia",
				placeholder:
					"Ingrese una breve descripción de su empresa para que otros la vean en su página de perfil, si lo desea",
			},
		},
		messages: {
			nameTaken: "El nombre proporcionado ya esta en uso",
		},
		submit: "Enviar",
	},
	createReview: {
		formTitle: "Escribe una Reseña",
		formSubTitle: "Contribuya sus opiniones anónimas a la comunidad",
		fields: {
			companyName: {
				label: "Nombre de la empresa",
				placeholder:
					"Ingrese el nombre de la compañía que está revisando",
			},
			reviewTitle: {
				label: "Titulo de la revisión",
				placeholder: "Por favor, elija un título para su opinión",
			},
			location: {
				label: "Localización",
				city: {
					label: "Ciudad",
					placeholder: "Ingrese la ciudad para su ubicación",
				},
				address: {
					label: "Dirección",
					placeholder: "Ingresa la dirección de tu ubicación",
				},
				industrialHub: {
					label: "Parque Industrial",
					placeholder:
						"Ingrese al parque industrial para su ubicación (por ejemplo, Florido, Pacífico, etc.)",
				},
			},
			jobTitle: {
				label: "Titulo del Trabajo",
				placeholder:
					"Ingrese el nombre del puesto que ocupó en esta empresa",
			},
			numberOfMonthsWorked: {
				label: "Numero de meses trabajados",
			},
			pros: {
				label: "Ventajas",
				placeholder:
					"¿Qué te gusta de esta empresa y por qué la recomendarías a otra persona?",
			},
			cons: {
				label: "Limitaciones",
				placeholder:
					"¿Qué fue lo que no te gustó de esta empresa? ¿Qué crees que podrían hacer para ser mejores?",
			},
			wouldRecommendToOtherJobSeekers: {
				label: "Recomendaría a otros solicitantes de empleo",
				yes: "Yes",
				no: "No",
			},
			healthAndSafety: {
				label: "Salud y Beneficios",
			},
			managerRelationship: {
				label: "Relaciones del Gerente",
			},
			workEnvironment: {
				label: "Ambiente Laboral",
			},
			benefits: {
				label: "Beneficios",
			},
			overallSatisfaction: {
				label: "Satisfacción General",
			},
			additionalComments: {
				label: "Comentarios Adicionales",
				placeholder:
					"Ingrese cualquier pensamiento o comentario adicional que pueda tener sobre su experiencia trabajando para esta empresa.",
			},
		},
		submit: "Enviar",
	},
	createSalary: {
		formTitle: "Forma Salarial",
		header1: "Comparta su salario de forma anónima para asegurarse ",
		header2: "de que otros reciban una compensación justa",
		fields: {
			companyName: {
				label: "Nombre de la empresa",
				placeholder: "Díganos el nombre de la empresa en que trabajó",
			},
			reviewTitle: {
				label: "Titulo de la revisión",
				placeholder: "Por favor, elija un título para su opinión",
			},
			location: {
				label: "Localización",
				city: {
					label: "Ciudad",
					placeholder: "Ingrese la ciudad para su ubicación",
				},
				address: {
					label: "Dirección",
					placeholder: "Ingresa la dirección de tu ubicación",
				},
				industrialHub: {
					label: "Parque Industrial",
					placeholder:
						"Ingrese al parque industrial para su ubicación (por ejemplo, Florido, Pacífico, etc.)",
				},
			},
			jobTitle: {
				label: "Titulo del Trabajo",
				placeholder: "Díganos su título de trabajo en la empresa",
			},
			incomeType: {
				label: "Tipo de Ingreso (en Pesos)",
				yearlySalary: "Salario anual",
				monthlySalary: "Salario mensual",
				weeklySalary: "Salario semanal",
				hourlyWage: "Salario por hora",
			},
			incomeAmount: {
				label: "Cantidad de Ingresos",
			},
			gender: {
				label: "Genero",
				male: "Hombre",
				female: "Mujer",
			},
		},
		submit: "Enviar",
	},
	createJobAd: {
		formTitle: "Publicar un Trabajo",
		header1:
			"Alcance a cientos de trabajadores con nuestras publicaciones de trabajo",
		fields: {
			jobTitle: {
				label: "Titulo del Trabajo",
				placeholder:
					"Por favor díganos el título del puesto que está anunciando",
			},
			locations: {
				label: "Ubicaciones",
				addElement: ({ array }: { array: unknown[] }) =>
					`Agrega ${array.length > 0 ? "otra" : "una"} ubicación`,
				city: {
					label: "Ciudad",
					placeholder: "Ingrese la ciudad para su ubicación",
				},
				address: {
					label: "Dirección",
					placeholder: "Ingresa la dirección de tu ubicación",
				},
				industrialHub: {
					label: "Parque Industrial",
					placeholder:
						"Ingrese al parque industrial para su ubicación (por ejemplo, Florido, Pacífico, etc.)",
				},
			},

			pesosPerHour: {
				label: "Pesos por Semana",
				placeholder:
					"Ingrese un valor, $x, o un rango de valores, $x-$y en pesos por semana",
			},
			contractType: {
				label: "Tipo de Contrato",
				fullTime: "Tiempo completo",
				partTime: "Medio tiempo",
				contractor: "Contratista",
			},
			jobDescription: {
				label: "Descripcion del Trabajo",
				placeholder:
					"Por favor ingrese una descripción formal de este trabajo",
			},
			responsibilities: {
				label: "Resposabilidades",
				placeholder:
					"Por favor resuma las responsabilidades de este puesto",
			},
			qualifications: {
				label: "Calificaciones",
				placeholder:
					"Por favor resuma las calificaciones necesarias para este puesto",
			},
		},
		submit: "Enviar",
	},
	applyToJobAd: {
		formTitle: "Solicitar un trabajo",
		fields: {
			fullName: {
				label: "Nombre completo",
				placeholder: "Por favor ingrese su nombre completo aquí",
			},
			email: {
				label: "Direccion de correo electronico",
				placeholder: "ejemplo@gmail.com",
			},
			phoneNumber: {
				label: "Numero telefonico",
				placeholder: "###-###-####",
			},
			coverLetter: {
				label: "Carta de presentación / Comentarios adicionales",
				placeholder:
					"Use este espacio para describir por qué sería el más adecuado para esta posición. También puede incluir cualquier comentario adicional que le gustaría enviar a la empresa junto con su solicitud",
			},
		},
		submit: "Enviar",
	},
	resourcesWorkers: {
		readMore: "Leer Más →",
		here: "aquí",
		publishArticleMessage:
			"¿Le gustaría publicar un artículo en nuestro sitio? Envíenos un correo electrónico con su artículo a ",
		trainingProgramsTitle: "Programas de entrenamiento en la UABC ",
		trainingProgramsDesc:
			"Volver a la escuela y obtener un título puede ser una gran oportunidad para aumentar tu conjunto de habilidades y tu salario, pero muchas personas no tienen el tiempo ni el dinero para terminar un programa completo.",
		trainingProgramsArticle:
			"Volver a la escuela y obtener un título puede ser una gran oportunidad para aumentar tu conjunto de habilidades y tu salario, pero muchas personas no tienen el tiempo ni el dinero para terminar un programa completo. Un título puede tardar años en completarse y costar miles de dólares. Si trabajas a tiempo completo, esto puede parecer casi imposible. Hay otra opción, programas de entrenamiento a corto plazo. Estos cursos pueden brindarle una experiencia en contabilidad, administración, redacción o mucho más. En general, solo duran alrededor de 1 mes y son una fracción del costo de un título completo. Si está interesado en encontrar un curso que se adapte a su trabajo y le da la oportunidad de aumentar sus salarios, puede encontrar los programas de UABC",
		laborLawsTitle: "Aprendiendo sobre las Leyes Laborales",
		laborLawsDesc:
			"Puede ser muy difícil saber si su empleador ha violado las leyes laborales en México. Si ha estado teniendo problemas con su empleador, una organización en el centro de Tijuana, Ollin Calli podría ayudarlo.",
		laborLawsArticle:
			"Puede ser muy difícil saber si su empleador ha violado las leyes laborales en México. El sistema legal es muy complicado, especialmente si nunca ha sido entrenado, pero las leyes laborales de México cubren muchos más abusos de lo que cabría esperar. Si ha estado teniendo problemas con su empleador, una organización en el centro de Tijuana, Ollin Calli podría ayudarlo. Son una organización sin fines de lucro que ayuda a los empleados que han sido aprovechados por su empleador. Pueden ayudarlo con ciertos asuntos legales, brindarle más información sobre sus derechos o darle una variedad de opciones. Si desea contactarlos, puede encontrar su sitio web ",
		educationDistanceTitle: "Educación a Distancia",
		educationDistanceDesc:
			"Aumente su nivel de educación con 'Educación a Distancia', un curso diseñado por el Tecnológico Nacional de México para las personas que trabajan a tiempo completo pero que desean aumentar sus habilidades para encontrar un trabajo mejor.",
		educationDistanceArticlePt1:
			"Tomarse el tiempo para aumentar su educación mientras trabaja en un trabajo de tiempo completo puede ser muy difícil. Es posible que tenga que trabajar de 5 a 6 días a la semana con largas horas, por lo que ir a una clase normal durante la semana es imposible. La clave es encontrar una educación que le permita ser flexible con su horario, y no requiere ir a clase todos los días. Es por esto que el Tecnológico Nacional de México creó Educacion a Distancia, un curso diseñado para personas que trabajan a tiempo completo pero que desean aumentar sus habilidades para encontrar un trabajo nuevo y mejor remunerado. Los cursos se imparten solo los sábados de 4 a 6 horas y el resto de la clase se puede hacer completamente en línea con su teléfono o una computadora. En este momento se ofrecen dos especializaciones, ingeniería industrial e ingeniería logística. Si le interesa, puede visitar su sitio web ",
		educationDistanceArticlePt2:
			", o comunicarse con el Departamento de Desarrollo Académico al (664) 607-8410 ext 127 o enviar un correo electrónico a ",
		becomeBilingualTitle: "Aprenda a ser Bilingüe!",
		becomeBilingualDesc:
			"Si puede hablar inglés, a menudo puede negociar un salario mucho más alto con su empleador o encontrar un trabajo mejor remunerado. Hemos enumerado las cinco mejores clases bilingües en Tijuana a continuación con información de contacto, ¡siéntase libre de revisarlas!",
		becomeBilingualArticle:
			"Tijuana es la ciudad de las maquiladoras. Empresas de todo el mundo vienen aquí para fabricar sus productos, incluidos Japón, Corea y, por supuesto, los Estados Unidos. Lo único que todas estas empresas tienen en común es que su personal a menudo habla inglés. Si puede hablar inglés, a menudo puede negociar un salario mucho más alto con su empleador o encontrar un trabajo mejor remunerado. Hemos enumerado las cinco mejores clases bilingües en Tijuana a continuación con información de contacto, ¡siéntase libre de revisarlas!",
	},
	resourcesEmployers: {
		here: "aquí",
		workerEngagementTitle: "Compromiso de los Trabajadores",
		workerEngagementDesc:
			"Averiguar qué piensan y quieren sus empleados de su empresa puede ser muy difícil. ¿Cómo se entera de lo que realmente quieren sus empleados para asegurarse de que permanezcan y no se conviertan en otra estadística de facturación?",
		workerEngagementArticle:
			"Averiguar qué piensan y quieren sus empleados de su empresa puede ser muy difícil. Muchas veces tienen miedo de molestar a sus gerentes porque no quieren perder sus trabajos o ser castigados. En cambio, muchos empleados preferirían irse por una compañía diferente. Entonces, ¿cómo se entera de lo que sus empleados quieren para asegurarse de que permanezcan y no se conviertan en otra estadística de facturación? Nosotros en Vize queremos ayudar. Creamos una plataforma para que los empleados le digan qué es bueno y qué podría mejorarse en su fábrica. Puede leer sus calificaciones sobre diversos aspectos de su empresa, como salarios, beneficios, relación con el gerente y salud y seguridad. Con este conocimiento general, puede leer sus reseñas para obtener una comprensión más profunda de sus empleados. Si se contacta con el equipo de Vize, también podemos ayudarlo a analizar esas revisiones y darle una opinión directa sobre las preocupaciones más profundas de sus empleados y cómo utilizar estas ideas para reducir la tasa de rotación. Si desea ponerse en contacto con el equipo de Vize, envíenos un correo electrónico a ",
		AllianceTitle: "La Alianza Empresarial Responsable",
		AllianceDesc:
			"La Alianza Empresarial Responsable (RBA) es una asociación de empresas de la industria electrónica, minorista, automotriz y de juguetes que se han unido para mejorar las condiciones de sus empleados.",
		AllianceArticlePt1:
			"La Alianza Empresarial Responsable (RBA) es una asociación de empresas de la industria electrónica, minorista, automotriz y de juguetes que se han unido para mejorar las condiciones de sus empleados. Como resultado, ha aumentado la retención en las empresas a las que asisten. Se cree que estas mejoras conducen a una mayor productividad y rentabilidad, ya que los empleados están mejor capacitados y más motivados. El personal de RBA ayuda a estas compañías a realizar evaluaciones de su fuerza laboral y a capacitar a la administración sobre la mejor manera de abordar los desafíos que encuentran. Una lista completa de sus servicios se puede encontrar ",
		AllianceArticlePt2:
			". También tienen una academia en línea para proporcionar una opción más accesible para la consulta.",
		learnEmployeesTitle: "Aprende de tus Empleados",
		learnEmployeesDesc:
			"La competencia por el trabajo en este momento es tan alta como siempre. Los empleados a menudo dejarán un puesto si otro trabajo paga solo unos pocos pesos adicionales. Para mantener grandes empleados, su empresa debe diferenciarse.",
		learnEmployeesArticlePt1:
			"La competencia por el trabajo en este momento es tan alta como siempre. Los empleados a menudo dejarán un puesto si otro trabajo paga solo unos pocos pesos adicionales. Las tasas de rotación en muchas fábricas representan el 8% de toda su fuerza de trabajo cada mes. Esto aumenta el costo de volver a capacitar y reclutar nuevos empleados. Para mantener grandes empleados, su empresa debe diferenciarse. Elevate Limited puede ayudarlo a lograr eso, aprendiendo lo que sus empleados realmente quieren y cómo actuar de acuerdo con esa información. Usan un programa llamado ",
		learnEmployeesArticlePt2:
			" para obtener retroalimentación directa y honesta de sus empleados a través de una encuesta telefónica. Los consultores pueden ayudarlo a formular un plan sobre cómo satisfacer las necesidades de esos empleados. Si está interesado en obtener más información sobre sus servicios, puede encontrar su sitio web ",
	},
};

import React from "react";

import exampleJobPostSquareEs from "src/images/example-job-post-square-es.png";
import analyticsDashboardEs from "src/images/analytics-dashboard-es.png";

export default {
	homePage: {
		mainBanner: "Encuentra un Buen Trabajo Cerca de Ti en Tijuana",
		searchButton: "Buscar",
		placeholder: "Buscar una empresa...",
		findjob_title: "Conoce El Trabajo Antes De Que Lo Consigas",
		rewardText:
			"Gana $100 pesos por compartir tu experiencia laboral de forma anónima",
		rewardText2:
			"Tu voz le ayudará a otros colaboradores encontrar un trabajo bueno, en Tijuana, con una fábrica que los respete",
		findjob_text:
			"No pierda el tiempo yendo de fábrica a fábrica, busque puestos de trabajo y lea evaluaciones de otros empleados para encontrar el mejor trabajo para usted",
		jobsButton: "Trabajos",
		findemp_title: (
			<>
				Encuentre un empleador
				<br />
				que lo trate bien
			</>
		),
		findemp_text:
			"Vize te ayuda a identificar empleadores basados en diferentes industrias, tipos de trabajo y tamaños de empresas. Las evaluaciones y calificaciones incentivan a las empresas a crear ambientes de trabajo enriquecedores y condiciones de trabajo seguras.",
		companiesButton: "Empresas",
		hear: "Escuche de su ",
		community: "comunidad",
		hear_text:
			"Consulte evaluaciones y valoraciones anónimas de empresas expedidas por personas en su Comunidad. Agregue valor a la comunidad al compartir su experiencia laboral.",
		add_review_button: "Agregar Evaluación",
		get_fair_salary: "Obtenga un salario",
		your_work: "justo por su trabajo",
		fairsalary_text:
			"Encuentre cientos de salarios para diferentes puestos de trabajo y géneros. Comparta su salario de forma anónima para asegurarse de que otros reciban una compensación justa.",
		salary_button: "Agregar Salario",
		discover_employers: "Comience a descubrir nuevos empleadores ahora",
		signup_button: "Registrar",
	},
	companiesSearchBar: {
		placeholder: "Buscar una empresa...",
	},
	header: {
		companies: "Empresas",
		write_review: "Agregar Evaluación",
		jobs: "Trabajos",
		resources: "Recursos",
		my_company: "Mi Empresa",
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
		username: {
			label: "Nombre de Usuario",
			placeholder: "Nombre de Usuario",
		},
		password: { label: "Contraseña", placeholder: "Contraseña" },
		registrationSuccess: "¡Registracion exitosa!",
		companyName: {
			label: "Nombre de Empresa",
			placeholder: "Nombre de Empresa",
		},
		alreadyAccount: "¿Ya tienes una cuenta? ",
		employee: "Trabajador",
		employer: "Empleador",
		email: {
			label: "Correo Electrónico",
			placeholder: "Correo Electrónico",
		},
		createAccount: "Crear Cuenta",
		registerOrLogin:
			"Regístrate o inicia una sesión para escribir una evaluación",
		mustBeLoggedIn: "Debes de iniciar una sesión para ver esta página.",
		errors: {
			usernameRequired: "Nombre de Usuario es un campo requerido",
			usernameNotFound: "El nombre de usuario no se ha encontrado",
			emailRequired: "Correo Electrónico es un campo requerido",
			emailValid: "Correo Electrónico debe ser válido",
			passwordRequired: "Contraseña es un campo requerido",
			passwordIncorrect: "Contraseña incorrecta",
			companyNameRequired: "Nombre de Compañía es un campo requerido",
		},
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
				label: "Descripcion de la Empresa",
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
		formTitle: "Escribe una Evaluación",
		formSubTitle1:
			"Tu evaluación anónima le ayudará a otros trabajadores encontrar un trabajo bueno, en Tijuana, con una fábrica que los respete.",
		formSubTitle2: "Reclama tus $100 pesos con Swap o Paypal.",
		formSubTitle3:
			" Aviso de Privacidad: Su identidad se ocultará para que esta evaluación sea anónima. Su nombre de usuario y los campos que tengan un icono de escudo no se mostrarán en su evaluación.",
		formSalaryNotice:
			"Los datos salariales no se mostrarán en esta evaluación. Para proteger su identidad, estos datos se van a agregar con otros salarios para crear un resumen.",
		fields: {
			companyName: {
				label: "Nombre de la empresa",
				placeholder:
					"Ingrese el nombre de la empresa que está evaluando",
			},
			reviewTitle: {
				label: "Titulo de la evaluación",
				placeholder: "Ingrese un título que describa su evaluación",
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
						"Ingrese al parque industrial donde se ubica la empresa",
				},
			},
			jobTitle: {
				label: "Puesto Desempeñado",
				placeholder:
					"Por ejemplo: Operador, Jefe de Linea, Supervisor, etc.",
			},
			numberOfMonthsWorked: {
				label: "Numero de meses trabajados",
			},
			employmentStatus: {
				label: "Estado de Empleo",
				former: "Ex empleado",
				current: "Actual",
			},
			pros: {
				label: "Ventajas",
				placeholder:
					"¿Qué te gusta de esta empresa y por qué la recomendarías a otra persona? ¿Cuáles son algunas de las prestaciones que ofrece esta empresa?",
			},
			cons: {
				label: "Limitaciones",
				placeholder:
					"¿Qué es lo que no te gusta de esta empresa? ¿Qué crees que podrían hacer para ser mejores?",
			},
			wouldRecommendToOtherJobSeekers: {
				label: "Recomendaría a otros solicitantes de empleo",
				yes: "Si",
				no: "No",
			},
			contractType: {
				label: "Tipo de Contrato",
				fullTime: "Tiempo completo",
				partTime: "Medio tiempo",
				internship: "Prácticas (Pasantía)",
				temporary: "Proyecto (Temporal)",
				contractor: "Contratista",
			},
			healthAndSafety: {
				label: "Salud y Beneficios",
			},
			managerRelationship: {
				label: "Relaciones con Supervisores",
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
					"Ingrese cualquier pensamiento o comentario adicional que pueda tener sobre su experiencia trabajando para esta empresa. ¿Tienes algún consejo para la gestión de la empresa?",
			},
			incomeType: {
				label: "Tipo de Ingreso (en Pesos)",
				yearlySalary: "Anual",
				monthlySalary: "Mensual",
				weeklySalary: "Sueldo por Semana",
				dailySalary: "Sueldo por Día",
				hourlyWage: "Sueldo por Hora",
			},
			incomeAmount: {
				label: "Cantidad de Ingresos",
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
				placeholder: "Por favor, elija un título para su evaluación",
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
				label: "Puesto Desempeñado",
				placeholder:
					"Por ejemplo: Operador, Jefe de Linea, Supervisor, etc.",
			},
			incomeType: {
				label: "Tipo de Ingreso (en Pesos)",
				yearlySalary: "Anual",
				monthlySalary: "Mensual",
				weeklySalary: "Sueldo por Semana",
				dailySalary: "Sueldo por Día",
				hourlyWage: "Sueldo por Hora",
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
				label: "Titulo de Empleo",
				placeholder: "Ingrese el título del empleo que está anunciando",
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
			salaryMin: {
				label: "Salario Mínimo",
				placeholder: "Ingrese un número en pesos",
			},
			salaryMax: {
				label: "Salario Máximo",
				placeholder: "Ingrese un número en pesos",
			},
			salaryType: {
				label: "Tipo de Ingreso (en Pesos)",
				yearlySalary: "Anual",
				monthlySalary: "Mensual",
				weeklySalary: "Sueldo por Semana",
				dailySalary: "Sueldo por Día",
				hourlyWage: "Sueldo por Hora",
			},
			contractType: {
				label: "Tipo de Contrato",
				fullTime: "Tiempo completo",
				partTime: "Medio tiempo",
				internship: "Prácticas (Pasantía)",
				temporary: "Proyecto (Temporal)",
				contractor: "Contratista",
			},
			jobDescription: {
				label: "Descripción del Trabajo",
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
	resources: {
		featuredResources: "Recursos Destacados",
		topics: "Temas",
		recentResources: "Recursos Recientes",
		contact: {
			title: "Contacto",
			phone: "Telefono",
			email: "Email",
			website: "Sitio Web",
			location: "Localización",
		},
		read: "Leer",
	},
	legacyTranslationsNeedsRefactor: {
		passwordChanger: {
			oldPassword: "Contraseña actual",
			newPassword: "Nueva contraseña",
			repeatNewPassword: "Repetir nueva contraseña",
			submit: "Cambiar contraseña",
			error: {
				"Incorrect password": "Contraseña incorrecta",
				"New passwords do not match":
					"Las nuevas contraseñas no coinciden",
			},
			success: "Restablecimiento de contraseña exitoso!",
		},
		search: {
			loading: "Cargando...",
			noCompaniesMatch: "Tu búsqueda no coincidio con una empresa",
			placeholder: "Busquar una empresa...",
			button: "Buscar",
		},
		reviewSubmitted: {
			contributing: "¡Gracias por contribuir a tu comunidad!",
			reviewSubmitted:
				"Tu evaluación se envió con éxito y ha sido agregada al perfil de la empresa.",
			earnedReward: "¡Has ganado una recompensa!",
			reachingOutSoon:
				"Nos comunicaremos contigo lo mas pronto que podamos. Estamos recibiendo muchas evaluaciones entonces por favor ten paciencia.",
			referralOffer:
				"Por un tiempo limitado, también estamos ofreciendo $40 pesos por cada persona que refieras. Comparte este enlace con tus conocidos y por cada persona que escriba una evaluación para una fabrica en Tijuana usando este enlace, te enviaremos $40 pesos",
			inviteFriends:
				"Invita tus conocidos a llenar una encuesta laborando en una fábrica para que puedan contribuir a la mejoría de las condiciones de trabajo.",
			phoneFaiure: "Error: tu número de teléfono ya ha sido registrado",
			phoneSuccess:
				"Tu número de teléfono ha sido registrado exitosamente",
			phoneSuccess2: "Te enviaremos tu recompensa dentro de 24 horas",
			rewardYou:
				"Nos gustaría recompensarlo por tomar el tiempo para escribir una evaluación.",
			rewardOptions:
				"Por favor seleccione de las siguientes opciones de recompensa:",
			paypalCash: "Recibe $100 pesos a través de PayPal",
			swapCash: "Recibe $100 pesos a través de Swap en menos de 24 horas",
			minutesReward: "Recibe $100 en minutos",
			getReward: "Recibir Recompensa",
			enterPhone: "Por favor, ingrese su número de teléfono",
			phoneNumberUsed: "Número de teléfono ya utilizado",
			rewardAlreadyClaimed: "Recompensa ya ha sido reclamada",
			invalidPhoneNumber: "Número de teléfono invalido",
			submit: "Enviar",
		},
		jobsearch: {
			loading: "Cargando...",
			nojobs: "No hay anuncios de trabajo disponibles en este momento.",
			jobsAvailable: "Oferta(s) de Empleo Disponible(s)",
		},
		aboutUs: {
			about: "Acerca de Nosotros",
			the_problem: "El Problema",
			noLeverage: "Los empleados no tienen ventaja o influencia",
			problem_text:
				"Para llenar grandes pedidos de manera oportuna y obtener suficientes negocios para sobrevivir como empresa, las fábricas recortan esquinas, trabajan a sus empleados más allá de sus límites y no se toman el tiempo para asegurarse de que el trabajo sea seguro. En sistemas jurídicos altamente desarrollados, la policía detendría esta medida y la aplicaría con una legislación que proteja los derechos laborales de los trabajadores. En la mayoría de los países en desarrollo, dicha legislación o no existe o no tienen la capacidad para hacerla cumplir. En resumen, las fábricas tienen todos los incentivos para tomar un atajo, y no hay incentivos para rendir cuentas a sus empleados. Entonces, ¿cómo aumentamos el apalancamiento que los trabajadores tienen en esta circunstancia?",
			our_solution: "Nuestra Solucion",
			reviews_accountability:
				"LAS EVALUACIONES SON UNA FORMA DE RESPONSABILIDAD",
			solution_text:
				"Para proporcionar más apalancamiento a los empleados de los países en desarrollo, estamos creando una plataforma para que los trabajadores compartan las evaluaciones de sus condiciones de trabajo con todos los demás trabajadores de su región. Esto dará a los trabajadores la información que necesitan para evitar fábricas con condiciones de trabajo terribles. Las fábricas con malas críticas obtendrán menos trabajadores, por lo tanto no podrán cumplir pedidos grandes de compradores y perderán ganancias. Esto creará un incentivo directo para que las fábricas mejoren las condiciones basadas en las evaluaciones que provienen directamente de los propios trabajadores.",
			reach_us: "No dude en contactarnos",
			submit_button: "Enviar",
			placeholder_name: "Su Nombre",
			placeholder_email: "Eg. ejemplo@email.com",
			placeholder_comments: "Por favor deje sus comentarios",
		},
		forEmployers: {
			headerText:
				"Recluta y retiene a la mejor fuerza laboral en Tijuna con Vize",
			getStarted: "Empezar",
			heading1: "El Problema",
			card1part1:
				"Muchas fábricas como la suya enfrentan tasas de rotación del",
			card1part2: " de su fuerza laboral",
			card1part3: " cada año",
			card2part1:
				"Las altas tasas de rotación te obligan a gastar más tiempo y dinero en",
			card2part2: " reclutar y entrenar",
			card3part1: "Perder 1 trabajador les puede costar al menos",
			card3part2: " $11,000 pesos cada mes",
			heading2: "La Solución",
			recruitingHeading: "Reclutamiento",
			recruitingText:
				"Le ayudamos a reclutar los mejores empleados con puestos de trabajo asequibles y efectivos.",
			retainmentHeading: "Retención",
			retainmentText:
				"Luego, le brindamos información práctica sobre cómo retener sus empleados utilizando datos analiticos directamente de los trabajadores en todo Tijuana.",
			heading3: "Precios",
			pricingText1: "Los primeros 10 clientes obtienen",
			pricingText2: " acceso premium",
			pricingText3: " completo a nuestros servicios",
			pricingText4: " GRATIS",
			pricingText5: " durante los primeros 90 días.",
			businessHeading: "Negocio",
			businessText1: "5 Anuncios de Trabajo",
			businessText2: "Panel de Análisis de Datos",
			businessText3: "Recursos de Negocio",
			premiumHeading: "Premium",
			premiumText1: "10 Anuncios de Trabajo",
			premiumText2: "Panel de Análisis de Datos",
			premiumText3: "Recursos de Negocio",
			premiumText4: "Análisis y Consultoría Individualizados",
			img: {
				exampleJobPost: {
					src: exampleJobPostSquareEs,
					alt: "",
				},
				analyticsDashboard: {
					src: analyticsDashboardEs,
					alt: "",
				},
			},
		},
		companyreview: {
			recommend: "Recomendado",
			not_recommend: "No recomendado",
			overall: "En general",
			health_safety: "Salud y Seguridad",
			work_env: "Ambiente de Trabajo",
			report: "Reportar",
			benefits: "Beneficios",
			manager_relation: "Relaciones con Supervisores",
			pros: "Ventajas",
			cons: "Limitaciones",
			additional_comments: "Comentarios Adicionales",
		},
		flags: {
			choose_reason: "Elige Una Razón",
			in_comment: "Comentario Inapropiado",
			please_choose_reason: "Porfavor completar todos los campos",
			false: "Información Falsa",
			other: "Algo Más",
			explanation: "Por favor proporcione una explicación",
			submit: "Enviar",
			thanks: "Gracias! El mensaje fue enviado.",
			report_review: "Reportar Evaluación",
		},
		jobpostings: {
			apply_now: "Aplica Ahora",
			hour: " Pesos Por Hora",
			day: " Pesos Por Dia",
			week: " Pesos Por Semana",
			month: " Pesos Por Mes",
			year: " Pesos Por Año",
			job_description: "Descripción del Trabajo",
			qualifications: "Calificaciones",
			responsibilities: "Responsabilidades",
			posted_on: "Publicado",
		},
		company_ratings: {
			overall: "General",
			health_safety: "Salud y Seguiridad",
			work_env: "Ambiente de Trabajo",
			benefits: "Beneficios",
			manager_relation: "Relaciones con Supervisores",
			recommend: "Recomendado",
			average_num: "Numero promedio de",
			months_worked: "meses trabajados",
		},
		jobscomponent: {
			jobs_available: "Trabajo(s) Disponible(s)",
		},
		overview_tab: {
			apply_now: "Aplica Ahora",
			hour: " Por Hora",
			job_description: "Descripción del Trabajo",
			no_reviews: "No hay evaluaciones para mostrar en este momento",
			no_jobs: "No hay trabajos para mostrar en este momento",
			no_salaries: "No hay salarios para mostrar en este momento",
			overview: "Resumen",
			reviews: "Evaluaciones",
			add_review: "Agregar Evaluación",
			see_all_reviews: "Ver Todas las Evaluaciones",
			job_salary: "Salario de Trabajo",
			job_salaries: "Salarios de Trabajo",
			add_salary: "Agregar Salario",
			see_all_salaries: "Ver Todos los Salarios",
			see_all_jobs: "Ver Todos los Trabajos",
			jobs_available: "Trabajo(s) Disponibles",
		},
		review_tab: {
			reviews: "Evaluaciones",
			add_review: "Agregar Evaluación",
		},
		salary_tab: {
			job_salary: "Salario de Trabajo",
			job_salaries: "Salarios de Trabajo",
			salary: "Salario",
			salaries: "Salarios",
			add_salary: "Agregar Salario",
		},
		showjob: {
			apply_now: "Aplica Ahora",
			hour: " Pesos Por Hora",
			day: " Pesos Por Dia",
			week: " Pesos Por Semana",
			month: " Pesos Por Mes",
			year: " Pesos Por Año",
			job_description: "Descripción del Trabajo",
			qualifications: "Calificaciones",
			responsibilities: "Reponsabilidades",
			posted_on: "Publicado",
		},
		CompanySearchResult: {
			reviews: "Evaluaciones",
			salaries: "Salarios",
			jobs: "Trabajos",
		},
		companyprofile: {
			loading: "Cargando...",
			notfound: "La empresa no fue encontrada",
			overview: "Resumen",
			reviews: "Evaluaciones",
			jobs: "Trabajos",
			salaries: "Salarios",
			contact: "Contacto",
			feel_free: "No dude en",
			reach_us: "Comunícate con nosotros",
			add_review: "Agregar Evaluación",
		},
	},
};

import React from "react";

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
		add_review_button: "Agregar una Evaluación",
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
		companies: "Empresas",
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
			"Regístrese o inicie una sesión para escribir una evaluación",
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
				label: "Titulo del Trabajo",
				placeholder:
					"Ingrese el nombre del puesto que ocupó en esta empresa",
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
				label: "Titulo del Trabajo",
				placeholder: "Díganos su título de trabajo en la empresa",
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
	resourcesWorkers: {
		readMore: "Leer Más →",
		here: "aquí",
		publishArticleMessage:
			"¿Le gustaría publicar un artículo en nuestro sitio? Envíenos un correo electrónico con su artículo a ",
		trainingProgramsTitle: "Programas de entrenamiento en la UABC ",
		trainingProgramsDesc:
			"Volver a la escuela y obtener un título puede ser una gran oportunidad para aumentar tu conjunto de habilidades y tu salario, pero muchas personas no tienen el tiempo ni el dinero para terminar un programa completo.",
		trainingProgramsArticle:
			"Volver a la escuela y obtener un título puede ser una gran oportunidad para aumentar tu conjunto de habilidades y tu salario, pero muchas personas no tienen el tiempo ni el dinero para terminar un programa completo. Un título puede tardar años en completarse y costar miles de dólares. Si trabajas a tiempo completo, esto puede parecer casi imposible. Hay otra opción, programas de entrenamiento a corto plazo. Estos cursos pueden brindarle una experiencia en contabilidad, administración, redacción o mucho más. En general, solo duran alrededor de 1 mes y son una fracción del costo de un título completo. Si está interesado en encontrar un curso que se adapte a su trabajo y le da la oportunidad de aumentar sus salarios, puede encontrar los programas de UABC ",
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
			"Averiguar qué piensan y quieren sus empleados de su empresa puede ser muy difícil. Muchas veces tienen miedo de molestar a sus gerentes porque no quieren perder sus trabajos o ser castigados. En cambio, muchos empleados preferirían irse por una empresa diferente. Entonces, ¿cómo se entera de lo que sus empleados quieren para asegurarse de que permanezcan y no se conviertan en otra estadística de facturación? Nosotros en Vize queremos ayudar. Creamos una plataforma para que los empleados le digan qué es bueno y qué podría mejorarse en su fábrica. Puede leer sus calificaciones sobre diversos aspectos de su empresa, como salarios, beneficios, relación con el gerente y salud y seguridad. Con este conocimiento general, puede leer sus evaluaciones para obtener una comprensión más profunda de sus empleados. Si se contacta con el equipo de Vize, también podemos ayudarlo a analizar esas evaluaciones y darle una evaluación directa sobre las preocupaciones más profundas de sus empleados y cómo utilizar estas ideas para reducir la tasa de rotación. Si desea ponerse en contacto con el equipo de Vize, envíenos un correo electrónico a ",
		AllianceTitle: "La Alianza Empresarial Responsable",
		AllianceDesc:
			"La Alianza Empresarial Responsable (RBA) es una asociación de empresas de la industria electrónica, minorista, automotriz y de juguetes que se han unido para mejorar las condiciones de sus empleados.",
		AllianceArticlePt1:
			"La Alianza Empresarial Responsable (RBA) es una asociación de empresas de la industria electrónica, minorista, automotriz y de juguetes que se han unido para mejorar las condiciones de sus empleados. Como resultado, ha aumentado la retención en las empresas a las que asisten. Se cree que estas mejoras conducen a una mayor productividad y rentabilidad, ya que los empleados están mejor capacitados y más motivados. El personal de RBA ayuda a estas empresas a realizar evaluaciones de su fuerza laboral y a capacitar a la administración sobre la mejor manera de abordar los desafíos que encuentran. Una lista completa de sus servicios se puede encontrar ",
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
			noCompaniesMatch: "No hay empresas que coincidan",
			placeholder: "Busquar una empresa...",
			button: "Buscar",
		},
		reviewSubmitted: {
			contributing: "¡Gracias por contribuir a su comunidad!",
			reviewSubmitted:
				"Su evaluación se envió con éxito y ha sido agregada al perfil de la empresa.",
			earnedReward: "¡Has ganado una recompensa!",
			phoneFaiure: "Error: su número de teléfono ya ha sido registrado",
			phoneSuccess:
				"Su número de teléfono ha sido registrado exitosamente",
			phoneSuccess2: "Le enviaremos su recompensa dentro de 24 horas",
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
					src: "/images/example-job-post-square-es.png",
					alt: "",
				},
				analyticsDashboard: {
					src: "/images/analytics-dashboard-es.png",
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
			manager_relation: "Relaciones del Gerente",
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
			manager_relation: "Relaciones del Gerente",
			recommend: "Recomendado",
			average_num: "Numero promedio de",
			months_worked: "meses trabajados",
		},
		jobscomponent: {
			jobs_available: "Trabajo(s) Disponible(s)",
		},
		overview_tab: {
			display_text: "No hay evaluaciones para mostrar en este momento",
			apply_now: "Aplica Ahora",
			hour: " Por Hora",
			job_description: "Descripción del Trabajo",
			display_jobs: "No hay trabajos para mostrar en este momento",
			salaries_text: "No hay salarios para mostrar en este momento",
			overview: "Resumen",
			reviews: "Evaluaciones",
			add_review: "Agregar una Evaluación",
			see_all_reviews: "Ver Todas las Evaluaciones",
			job_salaries: "Salario(s) de Trabajo(s)",
			add_salary: "Agregar un Salario",
			see_all_salaries: "Ver todos los Salarios",
			see_all_jobs: "Ver Todos los Trabajos",
			jobs_available: "Trabajo(s) Disponibles",
		},
		review_tab: {
			reviews: "Evaluaciones",
			add_review: "Agregar una Evaluación",
		},
		salary_tab: {
			job_salaries: "Salario(s) de Trabajo(s)",
			add_salary: "Agregar un Salario",
		},
		showjob: {
			apply_now: "Aplica Ahora",
			hour: " Por Hora",
			week: " Por Semana",
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
			add_review: "Agregar una Evaluación",
		},
	},
};

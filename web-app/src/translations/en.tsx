import React from "react";

import exampleJobPostSquareEn from "src/images/example-job-post-square-en.png";
import analyticsDashboardEn from "src/images/analytics-dashboard-en.png";

export default {
	homePage: {
		mainBanner: "Find a Great Job Near You in Tijuana",
		searchButton: "SEARCH",
		placeholder: "Search for a Company...",
		findjob_title: "Know The Job Before You Get It",
		commonLine: "",
		rewardText:
			"Earn $100 pesos by sharing your work experience anonymously",
		rewardText2:
			"Your voice will help other workers find a great job, in Tijuana, at a factory that respects them",
		findjob_text:
			"Don't waste your time going from factory to factory, search job posts and read reviews from other employees to find the best job for you",
		jobsButton: "Jobs",
		findemp_title: (
			<>
				Find an Employer
				<br />
				That Treats You Right
			</>
		),
		findemp_text:
			"Vize helps you discover employers based on different industries, job types, and company sizes. The feedback and rating system holds companies accountable for creating rich work environments and safe working conditions",
		companiesButton: "Companies",
		hear: "Hear From Your",
		community: "Community",
		hear_text:
			"See anonymous reviews and ratings of companies from people in your Community. Add value to the community by sharing your work experience.",
		add_review_button: "Add a Review",
		get_fair_salary: "Get a Fair Salary For",
		your_work: "Your Work",
		fairsalary_text:
			"Find hundreds of salaries for different job positions by gender. Share your salary anonymously to make sure others are getting fairly compensated.",
		salary_button: "Add a Salary",
		discover_employers: "Start discovering new employers now",
		signup_button: "SIGN UP",
	},
	companiesSearchBar: {
		placeholder: "Search for a Company...",
	},
	header: {
		companies: "Companies",
		write_review: "Write Review",
		jobs: "Jobs",
		resources: "Resources",
		my_company: "My Company",
		post_a_job: "Post a Job",
		for_employers: "For Employers",
		login: "LOG IN",
		signup: "SIGN UP",
		signup_or_login: "SIGN UP OR LOGIN",
		logout: "LOG OUT",
		myaccount: "MY ACCOUNT",
	},
	myAccount: {
		myAccount: "My Account",
		username: "Username",
		changePassword: "Change Password",
	},
	needToBeLoggedInToView: {
		youNeedToBeLoggedInToView: "You have to be logged in to use this page.",
		login: "Log In",
	},
	footer: {
		aboutUs: "About Us",
		contactUs: "Contact Us",
		help: "Help",
		allRightsReserved: "All rights reserved",
	},
	loginRegister: {
		login: "Login",
		noAccount: "Don't have an account? ",
		register: "Register",
		username: { label: "Username", placeholder: "Username" },
		loginId: {
			label: "Email or username",
			placeholder: "Email or username",
		},
		password: { label: "Password", placeholder: "Password" },
		registrationSuccess: "Registration successful!",
		companyName: { label: "Company Name", placeholder: "Company Name" },
		alreadyAccount: "Already have an account? ",
		employee: "Employee",
		employer: "Employer",
		email: { label: "Email", placeholder: "Email" },
		createAccount: "Create Account",
		registerOrLogin: "Register or login to write a review",
		mustBeLoggedIn: "You must be logged in to view this page.",
		errors: {
			usernameRequired: "Username is a required field",
			usernameNotFound: "User not found",
			emailRequired: "Email is a required field",
			emailValid: "Email must be a valid email",
			passwordRequired: "Password is a required field",
			passwordIncorrect: "Incorrect password",
			companyNameRequired: "Company Name is a required field",
		},
	},
	createCompany: {
		formTitle: "Create a New Profile",
		fields: {
			companyName: {
				label: "Company Name",
				placeholder: "Enter the name of your company",
			},
			contactEmail: {
				label: "Contact Email",
				placeholder:
					"Provide an email we can reach your company at (example@email.com)",
			},
			yearEstablished: { label: "Year Established" },
			numEmployees: { label: "Number of Employees" },
			industry: {
				label: "Industry",
				placeholder: "Tell us your company's primary industry",
			},
			locations: {
				label: "Locations",
				addElement: ({ array }: { array: unknown[] }) =>
					`Add ${array.length > 0 ? "another" : "a"} location`,
				city: {
					label: "City",
					placeholder: "Enter the city for your location",
				},
				address: {
					label: "Address",
					placeholder: "Enter the street address for your location",
				},
				industrialHub: {
					label: "Industrial Park",
					placeholder:
						"Enter the industrial park for your location (e.g. Florido, Pacífico, etc.)",
				},
			},
			contactPhoneNumber: {
				label: "Contact Phone Number",
				placeholder: "###-###-####",
			},
			websiteURL: {
				label: "Website URL",
				placeholder:
					"Please enter the URL of your company's website, if it has one",
			},
			descriptionOfCompany: {
				label: "Description of Company",
				placeholder:
					"Enter a brief description of your company for others to see on its profile page, if you'd like",
			},
		},
		messages: {
			nameTaken: "The name you provided is already taken",
		},
		submit: "Submit",
	},
	createReview: {
		formTitle: "Write a Review",
		formSubTitle1:
			"Your anonymous review will help other workers find a great job, in Tijuana, at a factory that respects them.",
		formSubTitle2: "Claim your $100 pesos with Swap or Paypal.",
		formSubTitle3:
			" Privacy Notice: Your identity will be hidden to make this review anonymous. Your username and any fields that have a shield icon will not be displayed in your review.",
		formSalaryNotice:
			"Salary data will not be displayed in this review. To protect your identity, this data will be aggregated with other salaries to create a summary.",
		fields: {
			companyName: {
				label: "Company Name",
				placeholder: "Enter the name of the company you're reviewing",
			},
			reviewTitle: {
				label: "Review Title",
				placeholder: "Please choose a title for your review",
			},
			location: {
				label: "Location",
				city: {
					label: "City",
					placeholder: "Enter the city for your location",
				},
				address: {
					label: "Address",
					placeholder: "Enter the street address for your location",
				},
				industrialHub: {
					label: "Industrial Park",
					placeholder:
						"Enter the industrial park for your location (e.g. Florido, Pacífico, etc.)",
				},
			},
			jobTitle: {
				label: "Job Title",
				placeholder:
					"Enter the name of the position you held at this company",
			},
			numberOfMonthsWorked: {
				label: "Number of Months Worked",
			},
			contractType: {
				label: "Contract Type",
				fullTime: "Full time",
				partTime: "Part time",
				internship: "Internship",
				temporary: "Temporary",
				contractor: "Contractor",
			},
			employmentStatus: {
				label: "Employment Status",
				former: "Former",
				current: "Current",
			},
			pros: {
				label: "Pros",
				placeholder:
					"What did you love about this company and why would you recommend it to someone else? What are some of the benefits that this company offers?",
			},
			cons: {
				label: "Cons",
				placeholder:
					"What did you not like about this company? What do you think they could do to be better?",
			},
			wouldRecommendToOtherJobSeekers: {
				label: "Would Recommend to Other Job Seekers",
				yes: "Yes",
				no: "No",
			},
			healthAndSafety: {
				label: "Health and Safety",
			},
			managerRelationship: {
				label: "Manager Relationship",
			},
			workEnvironment: {
				label: "Work Environment",
			},
			benefits: {
				label: "Benefits",
			},
			overallSatisfaction: {
				label: "Overall Satisfaction",
			},
			additionalComments: {
				label: "Additional Comments",
				placeholder:
					"Enter any additional thoughts or comments you may have on your experience working for this company. Do you have any advice for the management of the company?",
			},
			incomeType: {
				label: "Income Type (in Pesos)",
				yearlySalary: "Yearly Salary",
				monthlySalary: "Monthly Salary",
				weeklySalary: "Weekly Salary",
				dailySalary: "Daily Salary",
				hourlyWage: "Hourly Wage",
			},
			incomeAmount: {
				label: "Income Amount",
			},
		},
		submit: "Submit",
	},
	createSalary: {
		formTitle: "Submit Salary Data",
		header1: "Share your salary anonymously to make ",
		header2: "sure others are getting compensated fairly.",
		fields: {
			companyName: {
				label: "Company Name",
				placeholder: "Tell us the name of the company you worked for",
			},
			reviewTitle: {
				label: "Review Title",
				placeholder: "Please choose a title for your review",
			},
			location: {
				label: "Location",
				city: {
					label: "City",
					placeholder: "Enter the city for your location",
				},
				address: {
					label: "Address",
					placeholder: "Enter the street address for your location",
				},
				industrialHub: {
					label: "Industrial Park",
					placeholder:
						"Enter the industrial park for your location (e.g. Florido, Pacífico, etc.)",
				},
			},
			jobTitle: {
				label: "Job Title",
				placeholder: "Tell us your job title there",
			},
			incomeType: {
				label: "Income Type (in Pesos)",
				yearlySalary: "Yearly Salary",
				monthlySalary: "Monthly Salary",
				weeklySalary: "Weekly Salary",
				dailySalary: "Daily Salary",
				hourlyWage: "Hourly Wage",
			},
			incomeAmount: {
				label: "Income Amount",
			},
			gender: {
				label: "Gender",
				male: "Male",
				female: "Female",
			},
		},
		submit: "Submit",
	},
	createJobAd: {
		formTitle: "Post a Job",
		header1: "Reach hundreds of workers instantly with our job posts",
		fields: {
			jobTitle: {
				label: "Job Title",
				placeholder:
					"Tell us the title of the position you are advertising",
			},
			locations: {
				label: "Locations",
				addElement: ({ array }: { array: unknown[] }) =>
					`Add ${array.length > 0 ? "another" : "a"} location`,
				city: {
					label: "City",
					placeholder: "Enter the city for your location",
				},
				address: {
					label: "Address",
					placeholder: "Enter the street address for your location",
				},
				industrialHub: {
					label: "Industrial Park",
					placeholder:
						"Enter the industrial park for your location (e.g. Florido, Pacífico, etc.)",
				},
			},
			salaryExplanation:
				"Enter a range with the minimum and maximum salary you are willing to offer for this job. You can also set the minimum and maximum to the same value.",
			salaryMin: {
				label: "Minimum Salary (in Pesos)",
				placeholder: "e.g. 2000",
			},
			salaryMax: {
				label: "Maximum Salary (in Pesos)",
				placeholder: "e.g. 2200",
			},
			salaryType: {
				label: "Income Type (in Pesos)",
				yearlySalary: "Yearly Salary",
				monthlySalary: "Monthly Salary",
				weeklySalary: "Weekly Salary",
				dailySalary: "Daily Salary",
				hourlyWage: "Hourly Wage",
			},
			jobSchedule: {
				labelStartDay: "Start Day",
				labelEndDay: "End Day",
				labelStartTime: "Start Time",
				labelEndTime: "End Time",
				monday: "Monday",
				tuesday: "Tuesday",
				wednesday: "Wednesday",
				thursday: "Thursday",
				friday: "Friday",
				saturday: "Saturday",
				sunday: "Sunday",
			},
			contractType: {
				label: "Contract Type",
				fullTime: "Full time",
				partTime: "Part time",
				internship: "Internship",
				temporary: "Temporary",
				contractor: "Contractor",
			},
			jobDescription: {
				label: "Job Description",
				placeholder: "Enter a formal description of this job",
			},
			responsibilities: {
				label: "Responsibilities",
				placeholder: "Summarize the responsibilities of this position",
			},
			qualifications: {
				label: "Qualifications",
				placeholder:
					"Summarize the qualifications needed for this position",
			},
		},
		submit: "Submit",
	},
	applyToJobAd: {
		formTitle: "Apply for a Job",
		fields: {
			fullName: {
				label: "Full Name",
				placeholder: "Please enter your full name here",
			},
			email: {
				label: "Email",
				placeholder: "example@email.com",
			},
			phoneNumber: {
				label: "Phone Number",
				placeholder: "###-###-####",
			},
			coverLetter: {
				label: "Cover Letter/Additional Comments",
				placeholder:
					"Use this space to describe why you would be best suited for this position. You may also include any additional comments you would like to send to the company along with your application",
			},
		},
		submit: "Submit",
	},
	resources: {
		featuredResources: "Featured Resources",
		topics: "Topics",
		recentResources: "Recent Resources",
		contact: {
			title: "Contact",
			phone: "Phone",
			email: "Email",
			website: "Website",
			location: "Location",
		},
		read: "Read",
	},
	legacyTranslationsNeedsRefactor: {
		passwordChanger: {
			oldPassword: "Current password",
			newPassword: "New password",
			repeatNewPassword: "Repeat new password",
			submit: "Change Password",
			error: {
				"Incorrect password": "Incorrect password",
				"New passwords do not match": "New passwords do not match",
			},
			success: "Password reset successful!",
		},
		search: {
			loading: "Loading...",
			noCompaniesMatch: "Your search did not match any companies",
			placeholder: "Search for a Company...",
			button: "SEARCH",
		},
		reviewSubmitted: {
			contributing: "Thank you for contributing to your community!",
			reviewSubmitted:
				"Your review was successfully submitted and has been added to the company's profile",
			reachingOutSoon: "We will be reaching out to you soon",
			referralOffer:
				"For a limited time, we are also offering $40 pesos for each person you refer. Share this link and for each person that writes a review using this link, we will send you $40 pesos",
			inviteFriends:
				"Invite your friends to write a review about their experience working at a factory so that their contriubtion can help improve the working conditions in Tijuana.",
			phoneFaiure: "Error: Your phone number has already been registered",
			phoneSuccess: "Your phone number was registered successfully",
			phoneSuccess2: "We will be sending you your reward within 24 hours",
			earnedReward: "You have earned a reward!",
			rewardYou:
				"We would like to reward you for taking the time to write a review.",
			rewardOptions: "Please select from the following reward options:",
			paypalCash: "Receive $100 pesos through PayPal",
			swapCash: "Receive $100 pesos through Swap in less than 24 hours",
			minutesReward: "Receive $100 pesos worth of minutes",
			getReward: "Get Reward",
			enterPhone: "Please enter your phone number",
			phoneNumberUsed: "Phone number already used",
			rewardAlreadyClaimed: "Reward has already been claimed",
			invalidPhoneNumber: "Invalid phone number",
			submit: "Submit",
		},
		jobsearch: {
			loading: "Loading...",
			nojobs: "No Jobs Available right now.",
			jobsAvailable: "Employment Offer(s) Available",
		},
		jobApplicationSubmitted: {
			jobApplicationSubmitted:
				"Your job application was successfully submitted to ",
			companyWillReachOut:
				" will reach out to you soon if there is any interest. We will inform you when no new applications are being accepted.",
			contactUs:
				"Please message us through WhatsApp if you have any questions or issues: ",
			readReviews:
				"Read reviews written by other employees that work at this company to gather more information about what it is like to work there.",
			readReviewsButton: "Leer Evaluaciones",
			viewMoreJobs: "View More Jobs From Other Companies",
			referralMessage:
				"Do you know someone that is looking for a job? You can share the link below or use one of the buttons below to share the jobs page to WhatsApp or Facebook.",
		},
		aboutUs: {
			about: "About",
			the_problem: "The Problem",
			noLeverage: "EMPLOYEES DON'T HAVE LEVERAGE",
			problem_text:
				"To fill large orders in a timely manner and get enough business to survive as a company, factories cuts corners, working their employees beyond their limits and not taking the time to ensure that the job is safe. In highly developed legal systems this would be stopped by the police and enforced with legislation that protects workers' labor rights. In most developing countries, such legislation either doesn't exist or they lack the capacity to enforce it. In short, factories have every incentive to cut corners, and no incentive to be held accountable to their employees. So how do we increase the leverage that workers have in this circumstance?",
			our_solution: "Our Solution",
			reviews_accountability: "REVIEWS ARE A FORM OF ACCOUNTABILITY",
			solution_text:
				"To provide employees in developing countries with more leverage, we're creating a platform for workers to share reviews of their working conditions with all other workers in their region. This will give workers the information they need to avoid factories with terrible working conditions. Factories with poor reviews will get fewer workers, thus be unable to fill large orders from buyers, and lose profits. This will create a direct incentive for factories to improve conditions based on feedback coming directly from the workers themselves.",
			reach_us: "Feel free to reach out to us",
			submit_button: "Submit",
			placeholder_name: "Your Name",
			placeholder_email: "Eg. example@email.com",
			placeholder_comments: "Please enter your comments...",
		},
		forEmployers: {
			resourcesPageText:
				"Learn how you can lower turnover rates, decrease recruiting costs, improve your recruiting practices, and much more with our resources",
			resources: "Resources",
			headerText:
				"Recruit and retain the best workforce in Tijuana with Vize",
			getStarted: "Get Started",
			heading1: "The Problem",
			card1part1: "Many factories like yours face turnover rates of",
			card1part2: " of their workforce",
			card1part3: " every year",
			card2part1:
				"High turnover rates force you to spend more time and money on",
			card2part2: " recruiting and training",
			card3part1: "Losing 1 worker can cost you at least",
			card3part2: " $615 every month",
			heading2: "The Solution",
			recruitingHeading: "Recruiting",
			recruitingText:
				"We help you recruit the best employees with affordable and effective job posts.",
			retainmentHeading: "Retainment",
			retainmentText:
				"We then give you actionable insights on how to retain these employees using data directly from workers all across Tijuana.",
			heading3: "Pricing",
			pricingText1: "The first 10 customers get full",
			pricingText2: "premium access",
			pricingText3: " to our services",
			pricingText4: "FOR FREE",
			pricingText5: "for the first 90 days.",
			businessHeading: "Buisness",
			businessText1: "5 Job Posts",
			businessText2: "Data Analytics Dashboard",
			businessText3: "Buisiness Resources",
			premiumHeading: "Premium",
			premiumText1: "10 Job Posts",
			premiumText2: "Data Analytics Dashboard",
			premiumText3: "Buisiness Resources",
			premiumText4: "Individualized Analysis and Consulting",
			img: {
				exampleJobPost: {
					src: exampleJobPostSquareEn,
					alt: "",
				},
				analyticsDashboard: {
					src: analyticsDashboardEn,
					alt: "",
				},
			},
		},
		companyreview: {
			recommend: "Recommended",
			reviews: "Reviews",
			review: "Review",
			not_recommend: "Not Recommended",
			overall: "Overall",
			health_safety: "Health & Safety",
			work_env: "Work Environment",
			benefits: "Benefits",
			manager_relation: "Manager Relationships",
			report: "Report",
			pros: "Pros",
			cons: "Cons",
			additional_comments: "Additional Comments",
		},
		flags: {
			choose_reason: "Choose a Reason",
			false: "False Information",
			in_comment: "Inappropriate Comment",
			please_choose_reason: "Please complete all fields",
			other: "Other",
			thanks: "Thank you! The message was sent.",
			explanation: "Please provide an explanation",
			submit: "Submit",
			report_review: "Report Review",
		},
		jobpostings: {
			apply_now: "Apply Now",
			hour: "Pesos Per Hour",
			day: "Pesos Per Day",
			week: "Pesos Per Week",
			month: "Pesos Per Month",
			year: "Pesos Per Year",
			job_description: "Job Description",
			qualifications: "Qualifications",
			responsibilities: "Responsibilities",
			posted_on: "Posted on",
		},
		company_ratings: {
			overall: "Overall",
			health_safety: "Health & Safety",
			work_env: "Work Environment",
			benefits: "Benefits",
			manager_relation: "Manager Relationships",
			recommend: "Recommended",
			average_num: "Average number",
			months_worked: "of months worked",
		},
		jobscomponent: {
			jobs_available: "Job(s) Available",
		},
		overview_tab: {
			apply_now: "Apply Now",
			hour: "/Hour",
			no_reviews: "No reviews to show right now",
			no_jobs: "No Jobs to show right now",
			no_salaries: "No Salaries to display right now",
			job_description: "Job Description",
			overview: "Overview",
			reviews: "Reviews",
			add_review: "Add a Review",
			see_all_reviews: "See All Reviews",
			job_salary: "Job Salary",
			job_salaries: "Job Salaries",
			add_salary: "Add a Salary",
			see_all_salaries: "See All Salaries",
			see_all_jobs: "See All Jobs",
			jobs_available: "Job(s) Available",
		},
		review_tab: {
			review: "Review",
			reviews: "Reviews",
			add_review: "Add a Review",
			have_you_worked_at: "Have you worked at ",
			first_review: "Be the first to add a review!",
		},
		salary_tab: {
			job_salary: "Job Salary",
			job_salaries: "Job Salaries",
			salary: "Salary",
			salaries: "Salaries",
			add_salary: "Add a Salary",
			have_you_worked_at: "Have you worked at ",
			first_salary: "Be the first to add a salary!",
		},
		showjob: {
			apply_now: "Apply Now",
			hour: "Pesos / Hour",
			day: "Pesos / Day",
			week: "Pesos / Week",
			month: "Pesos / Month",
			year: "Pesos / Year",
			job_description: "Job Description",
			qualifications: "Qualifications",
			responsibilities: "Responsibilities",
			posted_on: "Posted",
			fullTime: "Full time",
			partTime: "Part time",
			contractor: "Contractor",
			internship: "Internship",
			temporary: "Temporary",
			monday: "M",
			tuesday: "Tu",
			wednesday: "W",
			thursday: "Th",
			friday: "F",
			saturday: "Sa",
			sunday: "Su",
			day_ago: "day ago",
			days_ago: "days ago",
			month_ago: "month ago",
			months_ago: "months ago",
		},
		CompanySearchResult: {
			reviews: "Reviews",
			salaries: "Salaries",
			jobs: "Jobs",
		},
		companyprofile: {
			loading: "Loading...",
			notfound: "That company was not found",
			overview: "Overview",
			reviews: "Reviews",
			add_review: "Add a Review",
			jobs: "Jobs",
			salaries: " Salaries",
			contact: "Contact",
			feel_free: "Feel free to",
			reach_us: "reach out to us",
		},
	},
};

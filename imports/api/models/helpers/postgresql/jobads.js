import { castToNumberIfDefined } from "./misc.js";

export default class PgJobAdFunctions {
	static async getJobAdById(client, id) {
		let jobAdResults = { rows: [] };
		let locationResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE jobadid=$1",
			[id]
		);

		locationResults = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[id]
		);

		return {
			jobad: jobAdResults.rows[0],
			locations: locationResults.rows,
		};
	}

	static async getAllJobAds(client, skip, limit) {
		let jobAdResults = { rows: [] };
		let locationResults = {};

		jobAdResults = await client.query(
			"SELECT * FROM jobads OFFSET $1 LIMIT $2",
			[skip, limit]
		);

		for (let jobad of jobAdResults.rows) {
			let locations = await client.query(
				"SELECT * FROM job_locations WHERE jobadid=$1",
				[jobad.jobadid]
			);
			locationResults[jobad.jobadid] = locations.rows;
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	}

	static async getJobAdsByCompany(client, companyName, skip, limit) {
		let jobAdResults = { rows: [] };
		let locationResults = {};

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[companyName, skip, limit]
		);

		for (let jobad of jobAdResults.rows) {
			let locations = await client.query(
				"SELECT * FROM job_locations WHERE jobadid=$1",
				[jobad.jobadid]
			);
			locationResults[jobad.jobadid] = locations.rows;
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	}

	static async getJobAdCountForCompany(client, name) {
		let countResults = { rows: [{ count: undefined }] };

		countResults = await client.query(
			"SELECT * FROM job_post_counts WHERE companyname=$1",
			[name]
		);

		return countResults.rows[0] === undefined
			? undefined
			: Number(countResults.rows[0].count);
	}

	static async postJobAd(client, jobad) {
		let newJobAd = { rows: [] };
		let newLocations = { rows: [] };

		newJobAd = await client.query(
			"INSERT INTO jobads " +
				"(companyname,companyid,jobtitle,pesosperhour," +
				"contracttype,jobdescription,responsibilities,qualifications) " +
				"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
				"RETURNING *",
			[
				jobad.companyName,
				jobad.companyId,
				jobad.jobTitle,
				jobad.pesosPerHour,
				jobad.contractType,
				jobad.jobDescription,
				jobad.responsibilities,
				jobad.qualifications,
			]
		);

		// this bit could probably be refactored out into a
		// function and used for both companies and jobads
		const id = newJobAd.rows[0].jobadid;
		let insertValues = [];
		let insertValueString = "";
		let index = 0;
		for (let location of jobad.locations) {
			insertValues.push(id, location);
			insertValueString =
				insertValueString +
				"($" +
				(index + 1) +
				",$" +
				(index + 2) +
				"),";
			index += 2;
		}
		insertValueString = insertValueString.slice(0, -1);

		newLocations = await client.query(
			"INSERT INTO job_locations (jobadid,joblocation) " +
				"VALUES " +
				insertValueString +
				" RETURNING *",
			insertValues
		);

		return {
			jobad: newJobAd.rows[0],
			locations: newLocations.rows,
		};
	}

	static processJobAdResults(jobAdResults) {
		/*
			Expect input object to have fields:
			jobad or jobads for single ad or array of ads
			locations
		*/
		if (jobAdResults.jobad !== undefined) {
			const jobad = jobAdResults.jobad;
			return {
				_id: Number(jobad.jobadid),
				companyName: jobad.companyname,
				companyId: castToNumberIfDefined(jobad.companyid),
				jobTitle: jobad.jobtitle,
				locations: jobAdResults.locations.map(loc =>
					JSON.parse(loc.joblocation)
				),
				pesosPerHour: jobad.pesosperhour,
				contractType: jobad.contracttype,
				jobDescription: jobad.jobdescription,
				responsibilities: jobad.responsibilities,
				qualifications: jobad.qualifications,
				datePosted: jobad.dateadded,
			};
		} else if (jobAdResults.jobads !== undefined) {
			return jobAdResults.jobads.map(jobad => {
				return {
					_id: Number(jobad.jobadid),
					companyName: jobad.companyname,
					companyId: castToNumberIfDefined(jobad.companyid),
					jobTitle: jobad.jobtitle,
					locations: jobAdResults.locations[
						String(jobad.jobadid)
					].map(loc => JSON.parse(loc.joblocation)),
					pesosPerHour: jobad.pesosperhour,
					contractType: jobad.contracttype,
					jobDescription: jobad.jobdescription,
					responsibilities: jobad.responsibilities,
					qualifications: jobad.qualifications,
					datePosted: jobad.dateadded,
				};
			});
		}
	}

	//	editJobAd
	//	deleteJobAd
}

import pool from "./connection-pool.js";

export default class JobAdConnector {
	static async getJobAdById(id) {
		const client = await pool.connect();
		let jobAdResults = { rows: [] };
		let locationResults = { rows: [] };
		try {
			await client.query("START TRANSACTION READ ONLY");
			jobAdResults = await client.query(
				"SELECT * FROM jobads WHERE jobadid=$1",
				[id]
			);
			locationResults = await client.query(
				"SELECT joblocation FROM job_locations WHERE jobadid=$1",
				[id]
			);
			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			client.query("ROLLBACK");
		} finally {
			client.release();
		}

		return {
			jobAd: jobAdResults.rows[0],
			locations: locationResults.rows,
		};
	}

	static async getAllJobAds(skip, limit) {
		const client = await pool.connect();
		let jobAdResults = { rows: [] };
		let locationResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");
			jobAdResults = await client.query(
				"SELECT * FROM jobads OFFSET $1 LIMIT $2",
				[skip, limit]
			);

			for (let jobad of jobAdResults.rows) {
				let locations = await client.query(
					"SELECT joblocation FROM job_locations WHERE jobadid=$1",
					[jobad.jobadid]
				);
				locationResults[jobad.jobadid] = locations.rows;
			}

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	}

	static async getJobAdsByCompany(companyName, skip, limit) {
		const client = await pool.connect();
		let jobAdResults = { rows: [] };
		let locationResults = {};
		try {
			await client.query("START TRANSACTION READ ONLY");
			jobAdResults = await client.query(
				"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
				[companyName, skip, limit]
			);

			for (let jobad of jobAdResults.rows) {
				let locations = await client.query(
					"SELECT joblocation FROM job_locations WHERE jobadid=$1",
					[jobad.jobadid]
				);
				locationResults[jobad.jobadid] = locations.rows;
			}

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	}

	static async postJobAd(jobad) {
		const client = await pool.connect();
		let newJobAd = { rows: [] };
		let newLocations = { rows: [] };

		try {
			await client.query("START TRANSACTION");

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

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return {
			jobad: newJobAd.rows[0],
			locations: newLocations.rows,
		};
	}

	//	editJobAd

	//	deleteJobAd
}

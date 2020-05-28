import { QueryConfig } from "pg";

/**
 * A parametarized SQL statement.
 * Can be used in place of a QueryConfig from pg.
 */
class SqlStatement implements QueryConfig {
	/** Must always be one element longer than _values */
	private readonly _strings: string[];
	/** Must always be one element shorter than _strings */
	private readonly _values: unknown[];

	public constructor(strings: string[], ...values: unknown[]) {
		this._strings = strings;
		this._values = values;

		// Flatten nested SqlStatements. This allows us to compose SqlStatements
		// in the same way we can compose strings in string templates. For
		// example, just as the expressions `foo ${`bar`} baz` and `foo bar baz`
		// are equivalent, sql`SELECT ${sql`price`} FROM orders` and sql`SELECT
		// price FROM orders` are also equivalent.

		for (let i = 0; i < this._values.length; ++i) {
			const value = this._values[i];
			if (value instanceof SqlStatement) {
				// The value is annother SqlStatement object.
				// Splice its strings and values into ours.

				// I have not thought of a good name for this var.
				// Suggestions would be appreciated.
				let zulu;
				if (value._strings.length > 1) {
					zulu = [
						this._strings[i] + value._strings[0],
						...value._strings.slice(1, -1),
						value._strings[value._strings.length - 1] +
							this._strings[i + 1],
					];
				} else if (value._strings.length === 1) {
					zulu = [
						this._strings[i] +
							value._strings[0] +
							this._strings[i + 1],
					];
				} else {
					zulu = [this._strings[i] + this._strings[i + 1]];
				}

				// Replace the spliced SqlStatement (the value at i) and the
				// strings around it with the results of the splice.
				this._strings.splice(i, 2, ...zulu);
				this._values.splice(i, 1, ...value._values);

				// this._values[i] was just replaced.
				// Decrement i so that the new value will be processed.
				--i;
			}
		}
	}

	/**
	 * The string representation of this statement as a parametarized
	 * PostgreSQL query. For use with the pg client.
	 */
	public get text(): string {
		return this._strings.reduce((acc, cur, idx) => `${acc}$${idx}${cur}`);
	}

	/**
	 * The values used in this statement.
	 * These are the parameters of parametarized queries.
	 */
	public get values(): unknown[] {
		// Return a copy to avoid breaking encaptulation.
		return this._values.slice();
	}
}

/** Make a parametarized SQL statement from a string template. */
function sql(
	strings: TemplateStringsArray,
	...values: unknown[]
): SqlStatement {
	return new SqlStatement(strings.slice(), ...values);
}

/**
 * Convert a raw string to a SQL statement.
 * Be carful to avoid SQL injections!
 */
sql.raw = function(string: string) {
	return new SqlStatement([string]);
};

export default sql;
export { SqlStatement };

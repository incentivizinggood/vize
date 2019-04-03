class SqlStatement {
	private readonly _strings: string[];
	private readonly _values: any[];

	constructor(strings: string[], ...values: any[]) {
		this._strings = strings;
		this._values = values;

		for (let i = 0; i < this._values.length; ++i) {
			const value = this._values[i];
			if (value instanceof SqlStatement) {
				// The value is annother SqlStatement object.
				// Splice its strings and values into ours.
				if (value._strings.length > 1) {
					this._strings.splice(
						i,
						2,
						this._strings[i] + value._strings[0],
						...value._strings.slice(1, -1),
						value._strings[value._strings.length - 1] +
							this._strings[i + 1]
					);

					this._values.splice(i, 1, ...value._values);
					--i;
				} else if (value._strings.length === 1) {
					this._strings.splice(
						i,
						2,
						this._strings[i] +
							value._strings[0] +
							this._strings[i + 1]
					);

					this._values.splice(i, 1);
					--i;
				} else {
					this._strings.splice(
						i,
						2,
						this._strings[i] + this._strings[i + 1]
					);

					this._values.splice(i, 1);
					--i;
				}
			}
		}
	}

	get text() {
		return this._strings.reduce((acc, cur, idx) => `${acc}$${idx}${cur}`);
	}

	get values() {
		return this._values.slice();
	}
}

function sql(strings: TemplateStringsArray, ...values: any[]) {
	return new SqlStatement(strings.slice(), ...values);
}

sql.raw = function(string: string) {
	return new SqlStatement([string]);
};

/* TODO: Make unit tests.
const baseQuery = sql`SELECT test FROM stuff`;
console.log(baseQuery.toPg());
console.log(sql.raw("SELECT hgf FROM things").toPg());
console.log(sql`SELECT test FROM stuff WHERE foo=${5}, bar<${"a"}`.toPg());
console.log(sql`${baseQuery} WHERE foo=${5}, bar<${"a"}`.toPg());
*/

export default sql;
export { SqlStatement };

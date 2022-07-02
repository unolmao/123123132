module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": `eslint:recommended`,
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"indent": [
			`error`,
			`tab`
		],
		"linebreak-style": [
			`error`,
			`unix`
		],
		"quotes": [
			`error`,
			`backtick`
		],
		"semi": [
			`error`,
			`never`
		],
		"no-unused-vars": `off`,
		"no-useless-escape": `off`,
		"no-constant-condition": `off`
	}
}
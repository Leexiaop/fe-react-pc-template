module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:react/jsx-runtime'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1 }],
		'import/prefer-default-export': 'off',
		'comma-dangle': ['error', {
			arrays: 'never',
			objects: 'never',
			imports: 'never',
			exports: 'never',
			functions: 'never'
		}],
		'react/jsx-indent-props': [0, 0],
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'class-methods-use-this': 'off',
		'no-useless-constructor': 'off',
		'no-console': 'off',
		'no-empty-function': 'off',
		'guard-for-in': 'off',
		'no-restricted-syntax': 'off',
		'no-unused-vars': 'off',
		'arrow-body-style': ['error', 'always'],
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'max-len': ['error', { code: 180 }],
		'no-param-reassign': 'off',
		'global-require': 0
	}
};

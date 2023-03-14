module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'indent': ['error', 'tab'],
        'brace-style': ['error', 'stroustrup'],
        'no-tabs': ['off'],
        'arrow-body-style': ['error', 'always']
    }
}

module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "func-names": ["error", "never"],
        "no-param-reassign": ["error", { "props": false }],
        "no-plusplus": "off",
        "no-restricted-syntax": "off",
        "no-undef": "off",
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "quotes": ["error", "double"]
    },
    "globals": {
        "angular": true,
    }
}
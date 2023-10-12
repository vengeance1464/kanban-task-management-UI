module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended","plugin:react-hooks/recommended"],
    rules: {
      // Add custom rules here
    },
    settings: {
      react: {
        version: "detect" // Automatically detect the react version
      }
    }
  };
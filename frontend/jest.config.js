module.exports = {
  transform: {
    "^.+\\.js?$": "js-jest"
  },
  testEnvironment: "node",
  testRegex: "./src/.*\\.(test|spec)?\\.(js|js)$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"]
};

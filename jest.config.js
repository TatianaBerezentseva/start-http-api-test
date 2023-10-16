export default {
  testMatch: ['**/src/index.spec.js'],
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  reporters: [
    "default", 
    [
      "jest-html-reporters", {
        "publicPath": "./jest-html-report",
        "filename": "report.html"
      }
    ]
  ]
}
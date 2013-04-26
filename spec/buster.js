var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        //"lib/mylib.js",
        //"client/default/js/**/*.js"
    ],
    tests: [
      //"spec/SubmitFormSpec.js"
      "spec/*Spec.js"
    ]
}
// config["Tests"] = {
//     tests: ["test/**/*.js"]
// };

// config["Browser tests"] = {
//     extends: "Tests",
//     environment: "browser",
//     sources: ["lib**/*.js"]
// };

config["Node tests"] = {
  extends: "My tests",
  environment: "node",
  rootPath: "../cloud/",
  tests: [
    "spec/SubmitFormSpec.js"
  ]

};

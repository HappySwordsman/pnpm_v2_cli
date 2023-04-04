const dedent = require("dedent");
const { runTask } = require("../helper");

/** @type {TaskRegister} */
module.exports = {
  name: "build",
  description: "打包工程",
  register(options) {
    return runTask(options, "build");
  },
  options: {
    doc: "打包文档",
    mode: "打包的服务：test、testb、testc、testd、teste、uat、prod",
  },
  examples: dedent`
    gtask build
    gtask build --doc
    gtask build --mode=test
    gtask build --doc --mode=test
  `,
};

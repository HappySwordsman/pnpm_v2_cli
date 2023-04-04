const dedent = require("dedent");
const { runTask } = require("../helper");

/** @type {TaskRegister} */
module.exports = {
  name: "start",
  description: "启动工程",
  register(options) {
    return runTask(options);
  },
  options: {
    doc: "启动文档",
    mode: "启动的服务：test、testb、testc、testd、teste、uat、prod",
  },
  examples: dedent`
    gtask start
    gtask start --doc
    gtask start --mode=test
    gtask start --doc --mode=test
  `,
};

const { sh } = require("tasksfile");
const dedent = require("dedent");

/** @type {TaskRegister} */
module.exports = {
  name: "appStart",
  description: "启动工程应用",
  register(options) {
    const { mode, doc } = options;
    return sh(
      `vue-cli-service serve --mode ${process.env.MODE || mode || ""}`,
      {
        async: true,
        nopipe: true,
        env: {
          NODE_ENV: process.env.NODE_ENV || "development",
          PRO_DOCS: process.env.PRO_DOCS || Number(doc),
        },
      }
    );
  },
  options: {
    doc: "启动文档",
    mode: "启动的服务：test、testb、testc、testd、teste、uat、prod",
  },
  examples: dedent`
    gtask appStart
    gtask appStart --doc
    gtask appStart --mode=test
    gtask appStart --doc --mode=test
  `,
};

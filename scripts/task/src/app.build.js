const { sh } = require("tasksfile");
const dedent = require("dedent");

/** @type {TaskRegister} */
module.exports = {
  name: "appBuild",
  description: "打包工程应用",
  register(options) {
    const { mode, doc } = options;
    return sh(
      `vue-cli-service build --mode ${process.env.MODE || mode || ""}`,
      {
        async: true,
        nopipe: true,
        env: {
          NODE_ENV: process.env.NODE_ENV || "production",
          PRO_DOCS: process.env.PRO_DOCS || Number(doc),
        },
      }
    );
  },
  options: {
    doc: "打包文档",
    mode: "打包的服务：test、testb、testc、testd、teste、uat、prod",
  },
  examples: dedent`
    gtask appBuild
    gtask appBuild --doc
    gtask appBuild --mode=test
    gtask appBuild --doc --mode=test
  `,
};

const { readFile } = require("fs-extra");
const { load: yamlLoad } = require("js-yaml");
const path = require("path");
const { sh } = require("tasksfile");
const inquirer = require("inquirer");
const { IGNORE_WORKSPACE, serviceListMap } = require("../config");

/**
 * @description Read Workspace
 * @returns {Promise<string[]>}
 */
async function readWorkspace() {
  const workspace = yamlLoad(
    await readFile(path.resolve(process.cwd(), "./pnpm-workspace.yaml"), {
      encoding: "utf8",
    }),
    {
      json: true,
    }
  );
  return workspace.packages;
}
async function filterWorkspace() {
  // eslint-disable-next-line no-useless-catch
  try {
    const filterArgv = (await readWorkspace()).filter(
      (wr) => !IGNORE_WORKSPACE.includes(wr)
    );
    return filterArgv
      .map((argv) => ["--filter", `./"${argv}"`])
      .flatMap((argv) => argv);
  } catch (e) {
    throw e;
  }
}
async function getWorkspacePackages(filterArgv = []) {
  const stdout = await sh(
    `pnpm ls -r --depth -1 --json ${filterArgv.join(" ")}`,
    {
      async: true,
      nopipe: false,
      silent: true,
    }
  );
  if (!stdout) return [];
  return JSON.parse(stdout);
}

/**
 * @description 运行任务
 * @param options {object}
 * @param [command=start] {string}
 * @returns {Promise<void>}
 */
async function runTask(options, command = "start") {
  let { mode, doc } = options;
  const questions = [];
  if (!doc) {
    questions.push({
      type: "confirm",
      name: "isDoc",
      message: "是否启动文档",
      default: false,
    });
  }
  if (!mode) {
    questions.push({
      type: "list",
      name: "devService",
      message: "开发服务器节点",
      choices: Object.values(serviceListMap).map((option) => ({
        name: option.name,
        value: option.mode,
        checked: option.checked,
      })),
    });
  }
  const filterArgv = (await filterWorkspace()) || [];
  const workspacePackages = await getWorkspacePackages(filterArgv);
  if (workspacePackages.length > 0) {
    const choices = workspacePackages.map((item) => ({
      title: item.name,
      value: item.name,
    }));
    questions.push({
      type: "checkbox",
      message: `选择要运行的包 ${command} 脚本: `,
      name: "packages",
      choices,
      validate: function (val) {
        if (val && val.length) return true;
        return "请至少选择一个: ";
      },
    });
  } else {
    return console.log("暂无项目可启动");
  }
  const { devService, isDoc, packages } = await inquirer.prompt(questions);

  mode = mode || devService;
  doc = !!doc || isDoc;
  // console.log(mode, doc, packages);
  const scriptArgv = packages
    .map((argvItem) => ["--filter", argvItem])
    .flatMap((argvItem) => argvItem);

  await sh(`pnpm -w run turbo:${command} ${scriptArgv.join(" ")}`, {
    async: true,
    nopipe: true,
    env: {
      MODE: mode,
      NODE_ENV: command === "start" ? "development" : "production",
      PRO_DOCS: Number(doc),
    },
  });
}

module.exports = {
  filterWorkspace,
  getWorkspacePackages,
  runTask,
};

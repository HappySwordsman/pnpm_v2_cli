const serviceListMap = {
  test: {
    name: "test服",
    mode: "development",
    checked: true,
  },
  uat: {
    name: "uat服",
    mode: "uat",
  },
  prod: {
    name: "prod服",
    mode: "production",
  },
};
const IGNORE_WORKSPACE = ["packages/*", "configs/*", "scripts/*", "docs/*"];

module.exports = {
  serviceListMap,
  IGNORE_WORKSPACE,
};

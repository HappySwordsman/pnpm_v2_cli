# task

## 使用说明

```shell
# 帮助
npx task --help
```

### Commands:

* appBuild   - 打包工程应用
* appStart   - 启动工程应用
* build      - 打包工程
* start      - 启动工程


## 配置

scripts/task/config/index.js

### serviceListMap

用于多服务启动部署，当项目由多团队多功能并行时，项目是无法单服务开发（单服务会导致并行功能部署会覆盖对方功能），所以可以在 `serviceListMap` 中配置不同服务器的启动标识。

新增服务后需要在应用下新增对应 `mode` 值的 `.env.*` 文件，`process.env.VUE_APP_ENV` 是该工程中的应用针对不同服务的标识符，在应用的启动过程和业务代码中可以获取该标识符用于区分不同服务。

eg.

`@apps/demo`应用新增了一个 [uat](https://juejin.cn/post/7173244935552892942) 服务器环境，那么在 `serviceListMap` 中新增 [uat](https://juejin.cn/post/7173244935552892942) 的配置

```javascript
const serviceListMap = {
//...
  uat: {
    name: "uat服",
    mode: "uat",
    checked: true,
  },
 //...
};
```

接着到`@apps/demo`应用中新增 `.env.uat` 文件配置 `VUE_APP_ENV`

```
# .env.uat

VUE_APP_ENV = 'uat'
```


## 使用

应用的启动、编译和部署都由 `task` 接管

在工程应用（apps/*） `package.json` 中的 `scripts` 新增启动、编译和部署，如下

```json
{
  "scripts": {
    "start": "task appStart",
    "build": "task appBuild",
    "publish": "task publish"
  }
}
```

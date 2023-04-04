# pnpm_v2_cli

使用 pnpm 管理的 monorepo，工程使用[turbo](https://turbo.build/)管理任务脚本，该工程可以快速构建vue-cli3的项目

## 工程起源

本项目的项目结构和任务管理灵感来源于[vben3](https://github.com/vbenjs/vben3)


## Features

- git hooks
- turbo 多任务管理
- code style lint（eslint + prettier）


## 项目提交规范

* build : 改变了build工具 如 webpack
* ci : 持续集成新增
* chore : 构建过程或辅助工具的变动
* feat : 新功能
* docs : 文档改变
* fix : 修复bug
* perf : 性能优化
* refactor : 某个已有功能重构
* revert : 撤销上一次的 commit
* style : 代码格式改变
* test : 增加测试

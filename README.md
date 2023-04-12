# assignment-todo-react-ts

本次 assignment 是完成一个纯前端的 React + Typescript 版本 todo Web App

## 需求说明
需求说明请查看 [需求说明.md](需求说明.md) 

## 技术实现要求
- React + Typescript
- 组件内部状态管理使用 React Hooks （不要求像 Step8 的 assignment 一样使用 context）
 
## 录屏要求
**特别提醒：**

本次 assignment 无需录制编码过程视频，请在编码完成后录制 15 分钟以内的讲解视频

讲解视频可包括：
- 简要介绍 tasking 结果
- 介绍代码结构，实现思路

## 提交要求
- 请在建议的完成时间内提交，提交时请确保录屏也已完成；
- 通过金数据表单提交 assignment，提交成功后会收到系统通知；
- 批改 assignment 会使用提交时间点所对应的版本，请务必在确认无误后再进行提交；
- 获取录屏的具体方式请写在 RECORDING.md 文件中，确保 buddy/coach 能够访问；
- 本次 assignment 录屏时长在 15 分钟以内；
- **因为录屏时间有限，无法体现编码过程，buddy 只能通过 commit 和代码来判断大家是否按照 TDD 实现需求，所以大家一定要做好小步提交**

## 评分标准
Buddy 会根据以下指导规则对大家本次的 assignment 进行评级。

### Level-0
1. 无法满足 Level-1 的所有要求时，则为 Level-0。

### Level-1
1. 在录屏的开始展示并简要介绍 tasking 结果
2. 正确通过 npm 安装依赖，启动前端服务和 json-server
3. 至少完成 list、add 功能
4. 符合技术实现要求一节所列要求
5. 小步提交
6. 正确使用 React 状态管理，数据流，生命周期

### Level-2
1. 完成所有要求的功能：list、add、update、delete
2. 有组件测试，单元测试

### Level-3
1. 明确的体现出了频繁的 “快速实现” 和 “重构” 两个阶段的交替过程
2. 组件测试，JS单元测试覆盖 case 较全，且测试 case 得到有效验证
3. 代码基本符合 Clean Code 要求

## 前端环境准备

### 下载依赖

```bash
npm install
```

### 运行网站

请执行如下代码运行网站并打开页面：

```bash
npm dev
```
之后在浏览器中访问：http://localhost:1234

### 启动 Json Server

```
npm run server
```
启动 json server 后可以，可以使用以下 API
- 获取 tasks 数据:
```
  URL: 'http://localhost:8080/tasks'
  Method: GET
  Response status: 200
  Response body 示例: [{id: 1, name: 'xx', completed: false}, {id: 2, name: 'xx', completed: false}]
```
- 创建 task:
```
  URL: 'http://localhost:8080/tasks'
  Method: POST
  Request body 示例: {name: 'xx', completed: false}
  Response status: 201
  Response body 示例: {id: 1, name: 'xx', completed: false}
```
- 删除指定 id 的 task:
```
  URL: 'http://localhost:8080/tasks/${id}'
  Method: DELETE,
  Response status: 204
  Response body 示例: {}
```
- 修改指定 id 的 task:
```
  URL: 'http://localhost:8080/tasks/${id}'
  Method: PUT,
  Request body 示例: {name: 'xx', completed: false}
  Response status: 200
  Response body 示例: {id: 1, name: 'xx', completed: false}
```

### 检查代码

```
npm run lint
```

### 格式化代码

```
npm run format
```
# 使用 ES dataSources 与 GraphQL Server
## 启动 docker
```bash
cd docker && docker-compose up -d
```
### 启动 Apollo Server
```shell
cd server && ts-node-esm server.ts
```
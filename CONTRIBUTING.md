# Contributing Guide

## 分支

1. 主分支master

   正式版本所在的分支，不允许直接push（如果是一些比较紧急的小push，可以放宽限制，但要保证安全）

2. 功能分支

   要开发的时候自己开一个分支，完成后pull request到主分支，然后删除该功能分支

## 大致架构

* 对`/api/xxx/xxx` 的访问，服务器将请求route到对应的中间件，每个中间件尽可能简单，较复杂的逻辑在通过调用service完成
* 对`/` 的访问，则作为主页访问对应`front-end/dist` 下编译好的vue应用

## 开发

### front-end

* 通过`npm run dev` 自动生成打开一个带hotreload功能的网页（在`localhost:8080` 下），就在这里直接看运行效果
* 前端对`/api` 以及其子路径的请求，自动转发到对应的服务器（`localhost:8009/api` 下，见下一节）
* vue部分，style节中可以使用css，也可以使用scss，只要在该标签上加入lang属性就行了（详见`App.vue`)
  * scss优点：
    * 完全向下兼容css
    * 带变量声明和选择器嵌套
    * see： https://www.sass.hk/guide/ (sass和scss算是一个东西)

### back-end

* 通过`npm run dev` 运行一个带hotreload的服务器，监听8009端口
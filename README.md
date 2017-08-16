#  node.js 项目
## CMS 内容管理系统

## 使用的技术
```
	bootstarp	
	node.js
	express
	mongodb
	mongoose	
```

## 使用 MVC 开发模式

## 项目目录 
```
--| bin						项目启动目录
--| configs					配置文件的目录
--| --| db_config.js		数据库的配置文件
--| --| imgUpload_config.js	图片上传的配置文件
--| controller				控制器的目录
--| models					数据库模型文件的目录
--| --| www					项目启动文件
--| node_modules			模块的目录
--| uploads					上传图片保存的目录
--| public					静态资源目录
--| --| images				图片目录
--| --| js					js 目录
--| --| css					css 目录
--| --| fonts				bootstarp 所依赖的字体目录	
--| routes 					路由文件目录
--| --| admin.js			后台路由文件	
--| --| index.js			前台路由文件	
--| views					模版目录
--| --| admin 				管理员模版目录
--| --| index.ejs 			网站首页模块	
--| app.js 					项目入口文件
--| package.json 			项目的配置文件
--| readme.md 				项目介绍

```

## 要求
```
	前台:
		浏览 文章 和 分类  分页 
		所有的文章应该关联在 分类下。
		可以申请友情链接


	后台（管理员页面）:
		管理员可以查看、添加、修改、删除 分类和文章、友情链接...。
		所有的文章和分类要有一个封面。

```

##  数据库设计

### 分类的集合 category
```
	_id			ObjectId		分类 ID
	name 		String			分类名称
	imgUrl		String			分类图片的链接
	info		String			分类介绍
	ctime		Date			创建的时间
	order		Number			排序
```

### 文章集合 article
```
	_id  			ObjectId		文章 ID
	catId  			ObjectId		关联分类 ID
	title 			String			标题
	author 			String			作者
	keywords 		String			关键词
	description		String			描述
	content 		String 			内容
	ctime			Date			创建时间	
	imgUrl			String			封面
```

### 管理员集合 admin
```
	_id 			ObjectId      管理 ID
	name				
	passwrod		密码

```

### 友情连接集合
```
	id_...

```
### 使用 

```
前台页面依赖于数据库中内容（文章分类、文章具体内容等），需先向数据库中添加 文章类型、文章 再访问前台页面

```

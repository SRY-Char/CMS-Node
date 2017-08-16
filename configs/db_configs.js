// 引入 mongoose 模块
var mongoose = require('mongoose');

// 数据库地址
var  dbUrl = 'mongodb://localhost:27017/CMS';

// 连接模块
mongoose.connect(dbUrl,function(err){
	if (err) {
		console.log('连接数据库失败hahah ');
	};
})

// 暴露
module.exports = mongoose;
// 引入数据库模块
var mongoose = require('../configs/db_configs');

// 定义分类的骨架
var frePleSchema = new mongoose.Schema({
	// 用 骨架来约束 集合的属性
	// 分类名称
	name: {
		type: String,
		default:'',
		// unique: true,
	},
	address:{
		type: String,
		default:'',
	},
	// 创建时间
	ctime:{
		type: Date,
		default: new Date(),	
	}
});

// 创建模型对象来操作集合 goods
// 在数据库里创建的时候 会 自动变成 复数 创建集合
var frePleModel = mongoose.model('frePle',frePleSchema);


// 暴露操作数据的模型
module.exports = frePleModel;
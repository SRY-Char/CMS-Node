// 声明控制器的对象
var indexController = {};

// 引入分类数据库的模型
var catModel = require('../models/catModel');

// 引入文章数据库的模型
var arcModel = require('../models/arcModel');

// 引入文章数据库的模型
var freModel = require('../models/freModel');

// 引入文章数据库的模型
var frePleModel = require('../models/frePleModel');

// 引入图片上传的配置文件
var imgUpload = require('../configs/imgUpload_config');

// // 分类管理
// indexController.index = function(req, res, next) {
// 	res.render('index/index');
// }

// 申请友情链接
indexController.arcList = function(req, res) {
	// 每页显示多少
	var pageSize = 3;
	// 查询文章总数
	arcModel.find().count(function(err,total){
		// 当前的页数默认第1页
  	var page = req.query.page?req.query.page:1;
		// 计算总页数
		var pageMax = Math.ceil(total/pageSize);
		// 判断边界
		if (page<1) page=1;
		if (page>pageMax) page=pageMax;
		// 计算偏移量
		var pageOffset = (page-1)*pageSize;
		// 查询文章数据
		arcModel.find().populate('catId').limit(pageSize).skip(pageOffset).exec(function (err,data){
			test(0);
			function test(i){
        if(i<data.length-1){
          test(++i);
        }else{
         res.render('index/arcList',{datalist:data,pageMax:pageMax,page:page})
        }
			}
		})
	})
}

// 查看文章页面
indexController.arc = function(req, res, next) {
	arcModel.find({_id:req.params._id},function(err,data){
		if (err) {
			console(' ');
		}else{
			// res.send('okokok')
			res.render('index/arc',{data:data[0]});
			console.log(data);
		}
	})
}

// 申请友情链接
indexController.frePleAdd = function(req, res, next) {
	res.render('index/frePleAdd');
}

// 添加友情链接申请的操作
indexController.frePleInsert = function(req,res,next){
  var upload = imgUpload().single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	console.log(req.body);
	// 把图片放到req.body里
  	frePleModel.create(req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			console.log('您的申请已提交')
  			res.redirect('/');
  		}

  	})
  })
}

// 首页
indexController.getindex = function(req, res, next) {
	// 链接
	freModel.find(function(err,data){
		// 分类
		catModel.find(function(err1,data1){
			// console.log(data1[4]._id);
			// 文章
			getData(0);
			function getData(i){
				arcModel.find({catId:data1[i]._id},function(err2,data2){
					data1[i].arc = data2
					if (i<data1.length-1) {
						getData(++i);
					}else{
						res.render('index/index',{datalist:data,catList:data1,arcList:data2});
					}
				})
			}
		})
	})
}

// 对外暴露 后台控制器的对象
module.exports = indexController;
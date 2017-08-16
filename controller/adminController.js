// 声明控制器的对象
var adminController = {};

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

// 分类管理
adminController.cat = function(req, res, next) {
	res.render('admin/cat');
}

// 添加分类
adminController.catAdd = function(req,res,next){
	res.render('admin/catAdd');
}

// 修改分类页面
adminController.catEdit = function(req,res,next){
	catModel.find({_id:req.params._id},function(err,data){
		if (err) {
			console(' ');
		}else{
			res.render('admin/catEdit',{data:data[0]});
			console.log(data);
		}
	})
}

// 删除分类
adminController.catDel = function(req,res,next){
	catModel.remove({_id:req.params._id},function(err,data){
		if (err) {
			console('');
		}else{
			res.redirect('/admin/catList');
		}
	})
}

// 修改分类数据
adminController.catUpdate = function(req,res,next){
	// 上传图片保存的位置
	var imgPath = './uploads';
	// 定义允许上传的文件类型
	var imgType = ['image/gif','image/png','image/jpeg'];
	// 限制文件大小
	var fileSize = 1024*1024*5;

  var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	
	// 把图片放到req.body里
		console.log(req.file);
  	req.body.imgUrl = req.file.filename;
  	var _id = req.body._id;
  	delete req.body._id;
  	catModel.update({_id:_id},req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/catList');
  			// res.send(req.body);
  		}
  	})
  })
}

// 添加分类数据的操作
adminController.catInsert = function(req,res,next){
	// 上传图片保存的位置
	var imgPath = './uploads';
	// 定义允许上传的文件类型
	var imgType = ['image/gif','image/png','image/jpeg'];
	// 限制文件大小
	var fileSize = 1024*1024*5;

  var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	
	// 把图片放到req.body里
		console.log(req.body);
  	req.body.imgUrl = req.file.filename;
  	catModel.create(req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/catList');
  		}
  	})
  })
}
// 分类列表
adminController.catList = function(req,res,next){
	// res.send('okok')
	// 查询分类列表
	catModel.find(function(err,data){
		res.render('admin/catList',{datalist:data});
	})
}

// 文章管理
adminController.arc = function(req,res){
	res.render('admin/arc');
}

// 添加文章
adminController.arcAdd = function(req,res,next){
	// 查询分类列表
	catModel.find(function(err,data){
		res.render('admin/arcAdd',{datalist:data});
	})
}

// 添加文章数据的操作
adminController.arcInsert = function(req,res,next){
	// 上传图片保存的位置
	var imgPath = './uploads';
	// 定义允许上传的文件类型
	var imgType = ['image/gif','image/png','image/jpeg'];
	// 限制文件大小
	var fileSize = 1024*1024*5;

  var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	
	// 把图片放到req.body里
  	req.body.imgUrl = req.file.filename;
  	arcModel.create(req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/arcList');
  		}
  	})
  })
}
// 文章列表
adminController.arcList = function(req,res){
	// // 当前页码
	// var page = 1;

	// 每页显示多少
	var pageSize = 20;
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
         res.render('admin/arcList',{datalist:data,pageMax:pageMax,page:page})
        }
			}
		})
	})
}
// 修改文章页面
adminController.arcEdit = function(req,res,next){
	arcModel.find({_id:req.params._id},function(err,data){
		console.log(data);
		if (err) {
			console(' ');
		}else{
			catModel.find(function(err,catData){
				res.render('admin/arcEdit',{data:data[0],catData:catData});
			})
		}
	})
}

// 删除文章
adminController.arcDel = function(req,res,next){
	arcModel.remove({_id:req.params._id},function(err,data){
		if (err) {
			console('');
		}else{
			res.redirect('/admin/arcList');
		}
	})
}

// 修改文章数据
adminController.arcUpdate = function(req,res,next){
	// 上传图片保存的位置
	var imgPath = './uploads';
	// 定义允许上传的文件类型
	var imgType = ['image/gif','image/png','image/jpeg'];
	// 限制文件大小
	var fileSize = 1024*1024*5;

  var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	
	// 把图片放到req.body里
  	req.body.imgUrl = req.file.filename;
  	// console.log(req.body);
  	var _id = req.body._id;
  	delete req.body._id;
  	arcModel.update({_id:_id},req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/arcList');
  			// res.send(req.body);
  		}
  	})
  })
}

// 友情链接
adminController.fre = function(req, res, next) {
	res.render('admin/fre');
}

// 添加友情链接
adminController.freAdd = function(req, res, next) {
	res.render('admin/freAdd');
}

// 添加友情链接的操作
adminController.freInsert = function(req,res,next){
	// 上传图片保存的位置
	var imgPath = './uploads';
	// 定义允许上传的文件类型
	var imgType = ['image/gif','image/png','image/jpeg'];
	// 限制文件大小
	var fileSize = 1024*1024*5;
  var upload = imgUpload(imgPath,imgType,fileSize).single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
	// 把图片放到req.body里
  	freModel.create(req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/freList');
  		}
  	})
  })
}

// 友情链接列表
adminController.freList = function(req, res, next) {
	freModel.find(function(err,data){
		res.render('admin/freList',{datalist:data});
	})
}


// 修改友情链接页面
adminController.freEdit = function(req,res,next){
	freModel.find({_id:req.params._id},function(err,data){
		if (err) {
			console(' ');
		}else{
			res.render('admin/freEdit',{data:data[0]});
			console.log(data);
		}
	})
}

// 删除友情链接
adminController.freDel = function(req,res,next){
	freModel.remove({_id:req.params._id},function(err,data){
		if (err) {
			console('');
		}else{
			res.redirect('/admin/freList');
		}
	})
}

// 修改友情列表数据
adminController.freUpdate = function(req,res,next){
  var upload = imgUpload().single('imgUrl');
  // 图片上传
  upload(req,res,function(err){
  	var _id = req.body._id;
  	delete req.body._id;
  	freModel.update({_id:_id},req.body,function(err){
  		if (err) {
  			res.send('插入失败');
  		}else{
  			res.redirect('/admin/freList');
  			// res.send(req.body);
  		}
  	})
  })
}

// 申请友情链接
adminController.frePle = function(req, res, next) {
	res.render('admin/frePleAdd');
}

// 友情链接申请列表
adminController.frePleList = function(req, res, next) {
	frePleModel.find(function(err,data){
		res.render('admin/frePleList',{dataPleList:data});
	})
}


// 删除友情链接申请
adminController.frePleNo = function(req,res,next){
	frePleModel.remove({_id:req.params._id},function(err,data){
		if (err) {
			console('');
		}else{
			res.redirect('/admin/frePleList');
		}
	})
}
// 同意友情链接申请
adminController.frePleYes = function(req,res,next){
	console.log(req.params._id);
	console.log('okoko')
	// 上传图片保存的位置
	
  // var upload = imgUpload().single('imgUrl');
  // 图片上传
  // upload(req,res,function(err){
  	frePleModel.find({_id:req.params._id},function(err,data){
  		req.body.name=data[0].name;
  		req.body._id=data[0]._id;
  		req.body.address=data[0].address;

  		freModel.create(req.body,function(err){
	  		if (err) {
	  			res.send('插入失败');
	  		}else{
	  			frePleModel.remove({_id:req.params._id},function(error){
	  				res.redirect('/admin/freList');
	  			});
	  		}
	  	})
  	})
  	
  // })
}
// 对外暴露 后台控制器的对象
module.exports = adminController;
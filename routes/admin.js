var express = require('express');
var router = express.Router();

// 引入 后台控制器模块
var adminController = require('../controller/adminController');

/* 后台的首页 */
router.get('/', function(req, res, next) {
	res.render('admin/index',{title:'Express'});
});
/* 后台首页的 top */ 
router.get('/top', function(req, res, next) {
	res.render('admin/top');
});
/* 后台首页的 left */ 
router.get('/left', function(req, res, next) {
	res.render('admin/left');
});
/* 后台首页的 main */ 
router.get('/main', function(req, res, next) {
	res.render('admin/main');
});
/* 后台首页的 swich */ 
router.get('/swich', function(req, res, next) {
	res.render('admin/swich');
});
/* 后台首页的 bottom */ 
router.get('/bottom', function(req, res, next) {
	res.render('admin/bottom');
});

/* 分类管理 */ 
router.get('/cat',adminController.cat);

/* 添加分类  */ 
router.get('/catAdd', adminController.catAdd);

/* 添加分类数据  */ 
router.post('/catInsert', adminController.catInsert);

/* 分类列表  */ 
router.get('/catList', adminController.catList);

/* 修改分类数据  */ 
router.get('/catEdit/:_id', adminController.catEdit);

/* 删除分类数据  */ 
router.get('/catDel/:_id', adminController.catDel);

/* 修改分类数据  */ 
router.post('/catUpdate', adminController.catUpdate);

/* 文章管理 */
router.get('/arc', adminController.arc);

/* 添加文章  */ 
router.get('/arcAdd', adminController.arcAdd);

/* 添加文章数据  */ 
router.post('/arcInsert', adminController.arcInsert);

/* 文章列表  */ 
router.get('/arcList', adminController.arcList);

/* 修改文章数据  */ 
router.get('/arcEdit/:_id', adminController.arcEdit);

/* 删除文章数据  */ 
router.get('/arcDel/:_id', adminController.arcDel);

/* 修改文章数据  */ 
router.post('/arcUpdate', adminController.arcUpdate);

/* 友情链接  */ 
router.get('/fre', adminController.fre);

/* 添加友情链接  */ 
router.get('/freAdd', adminController.freAdd);

/* 添加分类数据  */ 
router.post('/freInsert', adminController.freInsert);

/* 友情链接列表  */ 
router.get('/freList', adminController.freList);

/* 友情链接修改页面  */ 
router.get('/freEdit/:_id', adminController.freEdit);

/* 删除友情链接数据  */ 
router.get('/freDel/:_id', adminController.freDel);

/* 修改友情链接数据  */ 
router.post('/freUpdate', adminController.freUpdate);

/* 申请友情链接  */ 
router.get('/frePle', adminController.frePle);

/* 申请友情链接页面  */ 
// router.get('/frePleAdd', adminController.frePleAdd);

/* 友情链接申请列表  */ 
router.get('/frePleList', adminController.frePleList);

/* 通过删除友情链接申请  */ 
router.get('/frePleYes/:_id', adminController.frePleYes);

/* 不通过删除友情链接申请  */ 
router.get('/frePleNo/:_id', adminController.frePleNo);





module.exports = router;

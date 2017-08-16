var express = require('express');
var router = express.Router();

// 引入 控制器模块
var indexController = require('../controller/indexController');

/* 首页 */
router.get('/',indexController.getindex);

// 友情链接申请页面
router.get('/index/frePleAdd',indexController.frePleAdd);

// 首页文章列表
router.get('/index/arcList',indexController.arcList);

// 查看文章页面
router.get('/index/arc/:_id',indexController.arc);

router.post('/index/frePleInsert',indexController.frePleInsert);

module.exports = router;

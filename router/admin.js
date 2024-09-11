const express = require('express');
const router = express.Router()
const admin_handle = require('../router_handles/admin')

// 申请租赁(生成租赁纪录)接口
router.post('/application', admin_handle.application)

// 超级管理员获取租赁纪录接口
router.post('/pullapplication', admin_handle.pullapplication)

// 管理员同意租赁接口
router.post('/agree', admin_handle.agree)

module.exports = router
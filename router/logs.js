const express = require('express');
const router = express.Router()
const logs_handle = require('../router_handles/logs')

// 登录验证接口
router.post('/login', logs_handle.login)

// 注册验证接口
router.post('/register', logs_handle.register)

module.exports = router
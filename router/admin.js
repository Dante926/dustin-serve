const express = require('express');
const router = express.Router()
const admin_handle = require('../router_handles/admin')

// 登录验证接口
router.post('/application', admin_handle.application)

module.exports = router
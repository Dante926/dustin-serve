const express = require('express');
const router = express.Router()
const balance_handle = require('../router_handles/balance')

// 登录验证接口
router.post('/rechange', balance_handle.rechange)

module.exports = router
const express = require('express');
const router = express.Router()
const equipment_handle = require('../router_handles/equipment')

// 登录验证接口
router.post('/pulleqstatus', equipment_handle.pulleqstatus)

module.exports = router
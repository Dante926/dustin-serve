const express = require('express');
const router = express.Router()
const equipment_handle = require('../router_handles/equipment')

// 获取设备状态
router.post('/pulleqstatus', equipment_handle.pulleqstatus)

// 补给剩余容量
router.post('/supply', equipment_handle.supply)

// 管理员更改机器状态
router.post('/changestatus', equipment_handle.changestatus)

module.exports = router
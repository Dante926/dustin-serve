const express = require('express');
const router = express.Router()
const pkup_handle = require('../router_handles/pkup')

// 确认取纸接口
router.post('/confirm_pkup', pkup_handle.confirm_pkup)

// 获取订单纪录接口
router.post('/pullorder', pkup_handle.pullorder)

module.exports = router
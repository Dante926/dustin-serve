const router = express.Router()
const logs_handle = require('../router_handles/logs')

// 登录验证接口
router.post('/login',logs_handle.login)

module.exports = router
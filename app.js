const express = require('express');
const app = express();

// 跨域中间件
const cors = require('cors');
app.use(cors());

// 解析中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));// 只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.json());


// 登录/注册 模块
const logsRouter = require('./router/logs')
app.use('/logs',logsRouter)

// 用户余额管理模块
const balanceRouter = require('./router/balance')
app.use('/balance',balanceRouter)

// 设备管理接口
const equipmentRouter = require('./router/equipment')
app.use('/equipment',equipmentRouter)

// 取纸接口
const pkupRouter = require('./router/pkup')
app.use('/pkup',pkupRouter)

// 超级管理员接口

app.listen(8088, () => {
    console.log('Server is running http://127.0.0.1:8088')
})
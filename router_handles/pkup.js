const mysql = require('mysql2/promise'); // 使用 mysql2 的 promise 版本

// 假设 db 是通过 mysql2 创建的连接池
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'dustin-db'
});


const pkup_handle = {
    confirm_pkup: async (req, res) => {
        const { phone, pickup_id, price } = req.body;
        console.log(phone, pickup_id, price);

        const date = new Date();
        const connection = await db.getConnection(); // 获取数据库连接

        try {
            await connection.beginTransaction(); // 开始事务

            // 执行第一个数据库操作 生成此次订单纪录
            const sqlStr1 = 'INSERT INTO ordertable (phone, pickup_id, date, paymone) VALUES (?, ?, ?, ?)';
            const [result1] = await connection.query(sqlStr1, [phone, pickup_id, date, price]);

            if (result1.affectedRows !== 1) {
                throw new Error('生成纪录失败'); // 抛出错误，如果第一步失败
            }

            // 执行第二个数据库操作 修改用户金额
            const sqlStr2 = 'UPDATE usermanagetable SET mone = mone - ? WHERE phone = ?';
            const [result2] = await connection.query(sqlStr2, [price, phone]);

            if (result2.affectedRows !== 1) {
                throw new Error('修改用户金额失败'); // 抛出错误，如果第二步失败
            }

            // 执行第三个数据库操作 修改机器库存
            const sqlStr3 = 'UPDATE eq_status SET total = total - 1 WHERE pickup_id = ?';
            const [result3] = await connection.query(sqlStr3, [pickup_id]);

            if (result3.affectedRows !== 1) {
                throw new Error('修改机器容量失败'); // 抛出错误，如果第三步失败
            }

            await connection.commit(); // 提交事务，保存所有更改
            return res.send({ message: 'Success' }); // 成功响应

        } catch (err) {
            console.log(err);
            await connection.rollback(); // 回滚事务，撤销所有更改
            return res.send({ message: err.message }); // 错误响应
        } finally {
            connection.release(); // 释放连接，无论成功或失败都需要执行
        }
    },

    pullorder: async (req, res) => {
        const { phone, power,manage_eq_id } = req.body;
        if (power === 2) {
            const sqlStr = 'SELECT * FROM ordertable ORDER BY date DESC';
            const [result] = await db.query(sqlStr);
            return res.send(result);
        } else if (power === 1) {
            const sqlStr = 'SELECT * FROM ordertable WHERE pickup_id = ? OR phone = ? ORDER BY date DESC';
            const [result] = await db.query(sqlStr, [manage_eq_id,phone]);
            return res.send(result);
            
        } else {
            const sqlStr = 'SELECT * FROM ordertable WHERE phone = ? ORDER BY date DESC';
            const [result] = await db.query(sqlStr, [phone]);
            return res.send(result);
        }
    }

}

module.exports = pkup_handle
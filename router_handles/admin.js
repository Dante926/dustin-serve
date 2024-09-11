const mysql = require('mysql2/promise'); // 使用 mysql2 的 promise 版本

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'dustin-db'
});

const admin_handle = {
    application: async (req, res) => {
        const { phone, name, manage_eq_id, pay_mone } = req.body;

        const connection = await db.getConnection(); // 获取数据库连接
        const date = new Date();

        try {
            await connection.beginTransaction(); // 开始事务

            // ①查找是否存在申请租赁的手机号
            const sqlStr1 = 'SELECT * FROM UserManageTable WHERE Phone = ?';
            const [userResult] = await connection.query(sqlStr1, [phone]);

            if (userResult.length === 0) {
                return res.send({ code: 404, message: '手机号不存在' }); // 如果手机号不存在，返回错误
            }

            // ②判断是否已经申请过
            const sqlStr2 = 'SELECT * FROM Application WHERE Phone = ?';
            const [applicationResult] = await connection.query(sqlStr2, [phone]);

            if (applicationResult.length > 0) {
                return res.send({ message: '该手机号已经申请租赁设备，请勿重复操作' }); // 如果已经申请过，返回消息
            }

            // ③插入申请信息
            const sqlStr3 = 'INSERT INTO application(phone, name, pickup_id, pay_mone, date) VALUES (?, ?, ?, ?, ?)';
            const [insertResult] = await connection.query(sqlStr3, [phone, name, manage_eq_id, pay_mone, date]);

            if (insertResult.affectedRows !== 1) {
                throw new Error('申请失败'); // 抛出错误，如果插入失败
            }

            await connection.commit(); // 提交事务，保存所有更改
            return res.send({ message: '申请成功' }); // 成功响应

        } catch (err) {
            console.log(err);
            await connection.rollback(); // 回滚事务，撤销所有更改
            return res.send({ code: 500, message: err.message }); // 错误响应
        } finally {
            connection.release(); // 释放连接，无论成功或失败都需要执行
        }
    },

    pullapplication: async (req, res) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const result = await connection.query('SELECT * FROM application');
            await connection.commit();
            return res.send({ code: 200, message: 'Success', data: result });
        } catch (err) {
            await connection.rollback();
            return res.send({ code: 500, message: err.message });
        } finally {
            connection.release();
        }


    },

    agree: async (req, res) => {
        const { phone, name, manage_eq_id } = req.body;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            // ①查找是否存在申请租赁的手机号
            const sqlStr1 = 'SELECT * FROM UserManageTable WHERE Phone = ?';
            const [userResult] = await connection.query(sqlStr1, [phone]);

            if (userResult.length === 0) {
                return res.send({ code: 404, message: '手机号不存在' }); // 如果手机号不存在，返回错误
            } else if (userResult[0].mone < 100) {
                return res.send({ code: 404, message: '余额不足' });
            }

            // ②如果用户存在，且余额足够
            const sqlStr2 = `
                            UPDATE usermanagetable 
                            SET mone = mone - 100, 
                            name = ?, 
                            power = 1,
                            manage_eq_id = ? 
                            WHERE phone = ?
                            `;
            const [updataResult] = await connection.query(sqlStr2, [name, manage_eq_id, phone]);
            if (updataResult.affectedRows !== 1) {
                return res.send({ code: 500, message: '更新数据失败' });
            }

            // 删除租赁申请表中的纪录
            const sqlStr3 = `DELETE FROM application WHERE phone = ?`;
            const [deleteResult] = await connection.query(sqlStr3, [phone]);
            if (deleteResult.affectedRows !== 1) {
                return res.send({ code: 500, message: '删除数据失败' });
            }

            await connection.commit();
            return res.send({ code: 200, message: '申请成功' });
        } catch (err) {
            console.log(err);
            await connection.rollback(); // 回滚事务，撤销所有更改
            return res.send({ code: 500, message: err.message }); // 错误响应
        } finally {
            connection.release(); // 释放连接，无论成功或失败都需要执行
        }

    },
}

module.exports = admin_handle
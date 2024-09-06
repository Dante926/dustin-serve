const db = require('../mysql/config');

const balance_handle = {
    rechange: (req, res) => {
        const { phone, mone } = req.body;
        // 根据手机号查询用户
        const sqlStr = 'SELECT * FROM UserManageTable WHERE phone = ?';
        db.query(sqlStr, phone, (err, result) => {
            if (err) {
                console.error('查询失败:', err);
                return res.status(500).send({ code: 500, msg: '查询失败' });
            }

            // 判断用户是否存在
            if (result.length === 0) {
                return res.status(404).send({ code: 404, msg: '用户不存在' });
            }

            // 更新用户余额
            const sqlStr2 = 'UPDATE UserManageTable SET mone = ? WHERE phone = ?';
            db.query(sqlStr2, [mone, phone], (err, updateResult) => {
                if (err) {
                    console.error('更新失败:', err);
                    return res.status(500).send({ code: 500, msg: '更新失败', err });
                }

                if (updateResult.affectedRows !== 1) {
                    return res.status(500).send({ code: 500, msg: '更新失败，受影响行数不符' });
                }

                res.send({ code: 200, msg: '更新成功', result: updateResult });
            });
        });
    }

}

module.exports = balance_handle
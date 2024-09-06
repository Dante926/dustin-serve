const db = require('../mysql/config');

const logs_handle = {
    login: (req, res) => {
        const { Phone } = req.body;
        console.log(Phone);
        const sqlStr = 'select * from UserManageTable where Phone = ?'
        db.query(sqlStr, [Phone], (err, result) => {
            if (err) return res.send({ code: 500, data: err })
            if (result.length === 0) return res.send({ code: 2, msg: '用户名不存在' })
            res.send({ data: result })
        })
    },

    register: (req, res) => {
        console.log(req.body);
        const { Phone, Password } = req.body
        const sqlStr = 'SELECT * FROM UserManageTable WHERE Phone=?'
        db.query(sqlStr, Phone, (err, result) => {
            if (err) return res.send({ code: 500, data: err }) // 查询失败
            if (result.length > 0) return res.send({ data: 'error' })
            const sqlStr = 'INSERT INTO UserManageTable(Phone, Password, mone, power, name) VALUES(?, ?, ?, ?, ?)';
            db.query(sqlStr, [Phone, Password, 0, 0, '用户昵称'], (err, result) => {
                if (err) return res.send({ code: 500, data: err });
                res.send({ message: 'register_success' });
            });
        })
    }
}

module.exports = logs_handle
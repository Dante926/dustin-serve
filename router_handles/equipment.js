const db = require('../mysql/config');

const equipment_handle = {
    pulleqstatus: (req, res) => {
        const { pickup_id } = req.body;
        const sqlStr = 'SELECT * FROM eq_status WHERE pickup_id = ?';
        db.query(sqlStr, pickup_id, (err, result) => {
            if (err) {
                return res.status(500).send({ err });
            } else {
                res.send({ data: result });
            }
        });
    },

    supply: (req, res) => {
        const { pickup_id, total } = req.body;
        const sqlStr = 'UPDATE eq_status SET total = 50 WHERE pickup_id = ?';
        db.query(sqlStr, pickup_id, (err, result) => {
            if (err) {
                return res.status(500).send({ err });
            } else {
                res.send({ message: `此次补给数为${50 - total}` });
            }
        });
    },

    changestatus: (req, res) => {
        const { pickup_id, ispay_flag, set_mone, paper_fre } = req.body;
        console.log(pickup_id, ispay_flag, set_mone, paper_fre);

        // 修正了 SQL 语句的语法
        const sqlStr = `
            UPDATE eq_status 
            SET ispay_flag = ?, set_mone = ?, paper_fre = ? 
            WHERE pickup_id = ?
        `;

        db.query(sqlStr, [ispay_flag, set_mone, paper_fre, pickup_id], (err, result) => {
            if (err) {
                return res.status(500).send({ err });
            } else {
                res.send({ message: 'Success' });
            }
        });
    }
}

module.exports = equipment_handle
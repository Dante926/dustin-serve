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
                res.send({message:`此次补给数为${50-total}`});
            }
        });
    }

}

module.exports = equipment_handle
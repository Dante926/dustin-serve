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
    }

}

module.exports = equipment_handle
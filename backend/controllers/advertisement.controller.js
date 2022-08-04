const Model = require("../models/advertisement.model");
class Catalog {
  index(req, res) {
    const sql = "SELECT * FROM advertisement";
    Model.advertisementModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  updateAdvertisement(req, res) {
    const sql =
      "UPDATE advertisement SET ad1 = ?, ad2 = ?, ad3 = ?, ad4 = ? , ad5 = ? , discount = ? WHERE id = ?";
    Model.advertisementModel.query(
      sql,
      [
        req.body.ad1,
        req.body.ad2,
        req.body.ad3,
        req.body.ad4,
        req.body.ad5,
        req.body.discount,
        req.params.id,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
}

module.exports = new Catalog();

const db = require("./db");
const config = require("./config");

async function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

async function getRacks() {
  const rows = await db.query(`SELECT * FROM tbl_rack`);
  const data = await emptyOrRows(rows);
  return {
    data,
  };
}

async function getSKU() {
  const rows = await db.query(`SELECT * FROM tbl_sku`);
  const data = await emptyOrRows(rows);
  return {
    data,
  };
}

async function checkSKU(id) {
  const rows = await db.query(`SELECT * FROM tbl_sku where name='` + id + `'`);
  const data = await emptyOrRows(rows);
  if (data.length > 0) {
    return data;
  } else {
    return false;
  }
}

async function capacityRank() {
  const rows = await db.query(
    `select tr.*, ((IF(ts.ttl,tr.capacity-ts.ttl,tr.capacity)*0.3) + (tr.order_no*0.7) ) as S, IF(ts.ttl,tr.capacity-ts.ttl,tr.capacity) as fttl from tbl_rack as tr LEFT JOIN (select rack_id,SUM(total) as ttl from tbl_storage GROUP by rack_id ORDER by total ASC) as ts on ts.rack_id=tr.id order by S ASC`
  );
  const data = await emptyOrRows(rows);
  return data;
}

async function addToStore(data) {
  const rows = await db.query(
    `insert into tbl_storage (rack_id, sku_id, quantity, total) VALUES(` +
      data.rack_id +
      `,` +
      data.sku_id +
      `, ` +
      data.quantity +
      `, '` +
      data.total +
      `' )`
  );
  return rows.insertId;
}

module.exports = {
  getRacks,
  getSKU,
  checkSKU,
  capacityRank,
  addToStore,
};

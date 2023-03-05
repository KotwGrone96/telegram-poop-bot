const xl = require('excel4node');
const moment = require('moment');

const getExcel = (arr = [], callback) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Hoja 1');
  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
  });
  const date = moment(new Date()).format('DD-MM-YYYY-hhmmssa');
  ws.cell(1, 1).string('id').style(style);
  ws.cell(1, 2).string('tlg_username').style(style);
  ws.cell(1, 3).string('tlg_user_id').style(style);
  ws.cell(1, 4).string('poops').style(style);

  arr.forEach((item, index) => {
    const row = index + 2;
    ws.cell(row, 1).string(String(item.id)).style(style);
    ws.cell(row, 2).string(String(item.tlg_username)).style(style);
    ws.cell(row, 3).string(String(item.tlg_user_id)).style(style);
    ws.cell(row, 4).number(item.poops).style(style);
  });
  wb.write(`${date}.xlsx`, callback);
  return `${date}.xlsx`;
};

module.exports = getExcel;

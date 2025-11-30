// src/data/index.js
const lg = require("./lg.json");
const arcelik = require("./arcelik.json");
const daikin = require("./daikin.json");
const toshiba = require("./toshiba.json");
const samsung = require("./samsung.json");
const hisense = require("./hisense.json");

// Tüm marka dosyalarındaki faults dizilerini tek diziye topluyoruz
const faults = [
  ...(lg.faults || []),
  ...(arcelik.faults || []),
  ...(daikin.faults || []),
    ...(toshiba.faults || []),
    ...(samsung.faults || []),
  ...(hisense.faults || []),
];

module.exports = {
  faults,
};

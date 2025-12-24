
const faultsData = require("../data"); 

function getAllFaults(req, res) {
  const { marka, cihaz_tipi, q } = req.query;

  // index.js içindeki export: { faults: [...] }
  let results = faultsData.faults || [];

  if (marka) {
    results = results.filter(
      (f) => f.marka.toLowerCase() === marka.toLowerCase()
    );
  }

  if (cihaz_tipi) {
    results = results.filter(
      (f) => f.cihaz_tipi.toLowerCase() === cihaz_tipi.toLowerCase()
    );
  }

  if (q) {
    const qLower = q.toLowerCase();
    results = results.filter((f) => {
      const tanimMatch = f.tanım.toLowerCase().includes(qLower);
      const nedenMatch = (f.olasi_nedenler || []).some((n) =>
        n.toLowerCase().includes(qLower)
      );
      return tanimMatch || nedenMatch;
    });
  }

  res.json({
    count: results.length,
    data: results,
  });
}

// GET /api/v1/faults/search?marka=LG&kod=53-1
function searchFaultByMarkaKod(req, res) {
  const { marka, kod } = req.query;

  if (!marka || !kod) {
    return res.status(400).json({
      error: "marka ve kod parametreleri zorunludur",
    });
  }

  const fault = (faultsData.faults || []).find(
    (f) =>
      f.marka.toLowerCase() === marka.toLowerCase() &&
      f.kod.toLowerCase() === kod.toLowerCase()
  );

  if (!fault) {
    return res.status(404).json({
      error: "Arıza kodu bulunamadı",
    });
  }

  res.json(fault);
}

module.exports = {
  getAllFaults,
  searchFaultByMarkaKod,
};

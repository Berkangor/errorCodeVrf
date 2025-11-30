/**
 * @param {Array} faults - Arıza kayıtları listesi
 * @param {Object} filters
 * @param {string} [filters.marka]
 * @param {string} [filters.cihaz_tipi]
 * @param {string} [filters.arama_metni]
 * @returns {Array}
 */
export function filterFaults(faults, { marka, cihaz_tipi, arama_metni }) {
  let result = [...faults];

  if (marka && marka !== "Tümü") {
    result = result.filter(
      (f) => f.marka.toLowerCase() === marka.toLowerCase()
    );
  }

  if (cihaz_tipi && cihaz_tipi !== "Tümü") {
    result = result.filter(
      (f) => f.cihaz_tipi.toLowerCase() === cihaz_tipi.toLowerCase()
    );
  }

  if (arama_metni && arama_metni.trim() !== "") {
    const q = arama_metni.toLowerCase();

    result = result.filter((f) => {
      const tanimMatch = f.tanım.toLowerCase().includes(q);
      const nedenMatch = (f.olasi_nedenler || []).some((n) =>
        n.toLowerCase().includes(q)
      );
      return tanimMatch || nedenMatch;
    });
  }

  return result;
}

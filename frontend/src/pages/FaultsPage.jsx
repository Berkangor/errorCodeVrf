import { useEffect, useMemo, useState } from "react";
import { fetchAllFaults } from "../api/faultsApi";
import { filterFaults } from "../utils/filterFaults";
import FaultSearchBar from "../components/FaultSearchBar";
import FaultCard from "../components/FaultCard";
import NoResults from "../components/NoResults";

export default function FaultsPage() {
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [marka, setMarka] = useState("Tümü");
  const [cihazTipi, setCihazTipi] = useState("Tümü");
  const [aramaMetni, setAramaMetni] = useState("");

  useEffect(() => {
    async function loadFaults() {
      try {
        setLoading(true);
        const data = await fetchAllFaults();
        setFaults(data);
      } catch (err) {
        console.error(err);
        setError("Veriler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    loadFaults();
  }, []);

  const filteredFaults = useMemo(() => {
    return filterFaults(faults, {
      marka,
      cihaz_tipi: cihazTipi,
      arama_metni: aramaMetni,
    });
  }, [faults, marka, cihazTipi, aramaMetni]);

  const handleClearFilters = () => {
    setMarka("Tümü");
    setCihazTipi("Tümü");
    setAramaMetni("");
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto bg-red-50 border border-red-200 text-red-800 text-sm p-4 mt-6 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <FaultSearchBar
        marka={marka}
        setMarka={setMarka}
        cihazTipi={cihazTipi}
        setCihazTipi={setCihazTipi}
        aramaMetni={aramaMetni}
        setAramaMetni={setAramaMetni}
        onClear={handleClearFilters}
      />

      <div className="max-w-4xl mx-auto mb-2 text-xs text-gray-500">
        Toplam kayıt: {faults.length} • Filtrelenmiş sonuç:{" "}
        {filteredFaults.length}
      </div>

      {filteredFaults.length === 0 ? (
        <NoResults onReset={handleClearFilters} />
      ) : (
        filteredFaults.map((fault) => (
          <FaultCard key={fault.id || `${fault.marka}-${fault.kod}`} fault={fault} />
        ))
      )}
    </div>
  );
}

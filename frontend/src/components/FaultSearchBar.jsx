export default function FaultSearchBar({
  marka,
  setMarka,
  cihazTipi,
  setCihazTipi,
  aramaMetni,
  setAramaMetni,
  onClear,
}) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 md:p-6 mb-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Marka Select */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marka
          </label>
          <select
            value={marka}
            onChange={(e) => setMarka(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tümü">Tümü</option>
            <option value="LG">LG</option>
            <option value="Arçelik">Arçelik</option>
            <option value="Daikin">Daikin</option>
                      <option value="Toshiba">Toshiba</option>
                      <option value="Hisense">Hisense</option>
                      <option value="Samsung">Samsung</option>
          </select>
        </div>

        {/* Cihaz Tipi Select */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cihaz Tipi
          </label>
          <select
            value={cihazTipi}
            onChange={(e) => setCihazTipi(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tümü">Tümü</option>
            <option value="İç Ünite">İç Ünite</option>
            <option value="Dış Ünite">Dış Ünite</option>
          </select>
        </div>
      </div>

      {/* Arama Metni */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arama (tanım veya olası nedenler)
          </label>
          <input
            type="text"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            placeholder="Örn: haberleşme, akım sensörü, pcb..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Temizle Butonu */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onClear}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 active:scale-95 transition"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </div>
  );
}

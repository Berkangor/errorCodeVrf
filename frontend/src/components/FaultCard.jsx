function getDifficultyColor(level) {
  switch (level) {
    case 1:
    case 2:
      return "bg-green-100 text-green-800 border-green-300";
    case 3:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case 4:
    case 5:
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export default function FaultCard({ fault }) {
  const {
    marka,
    kod,
    cihaz_tipi,
    tanım,
    olasi_nedenler = [],
    cozum_adimlari = [],
    zorluk_seviyesi,
    model_serisi,
    guvenlik_uyarisi,
  } = fault;

  return (
    <article className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 mb-4">
      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-semibold px-3 py-1">
              {marka} • {kod}
            </span>
            {cihaz_tipi && (
              <span className="text-xs md:text-sm text-gray-600">
                {cihaz_tipi}
                {model_serisi ? ` • ${model_serisi}` : ""}
              </span>
            )}
          </div>
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            {tanım}
          </h2>
        </div>

        {/* Zorluk Rozeti */}
        <div
          className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs md:text-sm font-medium ${getDifficultyColor(
            zorluk_seviyesi
          )}`}
        >
          Zorluk: {zorluk_seviyesi || "?"}/5
        </div>
      </div>

      {/* Olası Nedenler */}
      {olasi_nedenler.length > 0 && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Olası Nedenler
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {olasi_nedenler.map((neden, idx) => (
              <li key={idx}>{neden}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Çözüm Adımları */}
      {cozum_adimlari.length > 0 && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            Önerilen Çözüm Adımları
          </h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            {cozum_adimlari.map((adim, idx) => (
              <li key={idx}>{adim}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Güvenlik Uyarısı */}
      {guvenlik_uyarisi && (
        <div className="mt-2 p-2 rounded-md bg-orange-50 border border-orange-200 text-xs text-orange-800">
          ⚠️ <span className="font-semibold">Güvenlik Uyarısı:</span>{" "}
          {guvenlik_uyarisi}
        </div>
      )}
    </article>
  );
}

export default function NoResults({ onReset }) {
  return (
    <div className="w-full max-w-xl mx-auto text-center py-10 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <span className="text-3xl">🔍</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Sonuç Bulunamadı
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Aradığınız marka, kod veya açıklama ile eşleşen bir arıza kaydı
        bulunamadı.
      </p>

      <ul className="text-sm text-gray-500 text-left max-w-md mx-auto mb-6 space-y-1">
        <li>• Yazdığınız kodun doğruluğunu kontrol edin (ör. 53-1, 23-1).</li>
        <li>• Sadece marka seçerek daha geniş bir arama yapmayı deneyin.</li>
        <li>• Arama kutusuna kısa bir kelime yazın (ör. “haberleşme”).</li>
      </ul>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition"
        >
          Filtreleri Sıfırla
        </button>
      )}
    </div>
  );
}

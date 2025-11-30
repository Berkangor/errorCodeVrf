import FaultsPage from "./pages/FaultsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white py-3 shadow-md">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold">
              VRF Arıza Kodu Asistanı
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Marka, cihaz tipi ve arızaya göre hızlı arama
            </p>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400">
            by Berkan – test sürümü
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <FaultsPage />
      </main>
    </div>
  );
}

export default App;

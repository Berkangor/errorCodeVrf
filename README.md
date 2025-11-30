# VRF Arıza Kodu Asistanı

LG, Samsung, Hisense, Daikin, Arçelik ve diğer VRF markalarının **arıza kodlarını tek bir yerde** toplayan,
teknik servislere sahada hızlı çözüm bulmayı hedefleyen bir web uygulaması.

- Marka + cihaz tipi + arama metni ile filtreleme  
- Ayrıntılı arıza tanımı, olası nedenler ve çözüm adımları  
- Mobil uyumlu, dokunmatik dostu arayüz  
- Dosya tabanlı (JSON) çok markalı veri yapısı  

---

## 🔧 Teknolojiler

**Backend**

- Node.js
- Express.js
- CORS
- JSON tabanlı veri deposu (markalara göre dosyalanmış)

**Frontend**

- React (Vite)
- Tailwind CSS
- React Hooks (useState, useEffect, useMemo)
- Fetch API ile REST çağrıları

---

## 📁 Proje Yapısı

```bash
errorCodeVrf/
  backend/
    src/
      controllers/
        faultsController.js
      data/
        lg.json
        arcelik.json
        samsung.json
        hisense.json
        daikin.json
        toshiba.json
        index.js        # Tüm markaları tek bir listeye birleştirir
      routes/
        faultsRoutes.js # /api/v1/faults endpoint'leri
      server.js         # Express sunucusu
    package.json

  frontend/
    src/
      api/
        faultsApi.js    # Backend ile konuşan fonksiyonlar
      components/
        FaultCard.jsx   # Tek arıza kaydını gösteren kart
        EmptyState.jsx  # Sonuç bulunamadı ekranı
      pages/
        FaultsPage.jsx  # Filtreleme + liste ekranı
      App.jsx
      main.jsx
    index.css
    vite.config.js
    package.json
🌐 Canlı Ortam
Backend (API):
https://errorcodevrf.onrender.com

Örnek endpoint’ler:

GET /api/v1/faults

GET /api/v1/faults?marka=LG&cihaz_tipi=Dış%20Ünite

GET /api/v1/faults/search?marka=LG&kod=53-1

Frontend (Vercel):
(Buraya Vercel linkini yazabilirsin, örn:)
https://errorcodevrf.vercel.app

🗂 Backend Detayları
Veri Modeli (JSON)
Her marka için ayrı bir dosya (lg.json, samsung.json vb.) ve her kayıtta şu alanlar bulunur:

json
Kodu kopyala
{
  "id": "lg-outdoor-53-1",
  "kod": "53-1",
  "marka": "LG",
  "cihaz_tipi": "Dış Ünite",
  "model_serisi": "Multi V 5",
  "tanım": "İç Ünite ile Dış Ünite Haberleşme Hatası",
  "olasi_nedenler": [
    "Haberleşme kablosunda kopukluk veya gevşek bağlantı.",
    "Yanlış kablolama veya polarite hatası."
  ],
  "cozum_adimlari": [
    "Cihazın tüm enerjisini kesin ve 5 dakika bekleyin.",
    "Haberleşme hattını görsel olarak kontrol edin."
  ],
  "zorluk_seviyesi": 3,
  "guvenlik_uyarisi": "Yüksek gerilim tehlikesi! Ölçüm yapmadan önce enerjiyi kesin."
}
src/data/index.js tüm marka dosyalarını birleştirir:

js
Kodu kopyala
const lg = require("./lg.json");
const arcelik = require("./arcelik.json");
const samsung = require("./samsung.json");
const hisense = require("./hisense.json");
const daikin = require("./daikin.json");
const toshiba = require("./toshiba.json");

const faults = [
  ...(lg.faults || []),
  ...(arcelik.faults || []),
  ...(samsung.faults || []),
  ...(hisense.faults || []),
  ...(daikin.faults || []),
  ...(toshiba.faults || []),
];

module.exports = { faults };
API Endpoint’leri
GET /api/v1/faults

Query parametreleri:

marka (opsiyonel) – Örn: LG, Samsung

cihaz_tipi (opsiyonel) – Örn: İç Ünite, Dış Ünite

q (opsiyonel) – Tanım ve olası nedenler içinde arama

Örnek:

h
Kodu kopyala
GET /api/v1/faults?marka=LG&cihaz_tipi=Dış%20Ünite&q=haberleşme
GET /api/v1/faults/search?marka=LG&kod=53-1

Belirli bir marka + arıza kodu ile tek kayıt döndürür.

▶️ Backend’i Lokalde Çalıştırma
bash
Kodu kopyala
cd backend
npm install
npm run dev
Varsayılan olarak:

text
Kodu kopyala
http://localhost:3000
üzerinden ayakta olur.

💻 Frontend Detayları
API Katmanı (src/api/faultsApi.js)
js
Kodu kopyala
const API_ORIGIN = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const BASE_URL = `${API_ORIGIN}/api/v1`;

export async function fetchAllFaults() {
  const res = await fetch(`${BASE_URL}/faults`);
  if (!res.ok) throw new Error("Arıza listesi alınamadı");
  const json = await res.json();
  return json.data || json.faults || [];
}

export async function searchFaultByMarkaKod(marka, kod) {
  const params = new URLSearchParams({ marka, kod });
  const res = await fetch(`${BASE_URL}/faults/search?` + params.toString());
  if (!res.ok) throw new Error("Arıza kodu bulunamadı");
  return res.json();
}
Çevre Değişkenleri
Lokal geliştirme için frontend/.env:

env
Kodu kopyala
VITE_API_BASE_URL=http://localhost:3000
Production (Vercel) için:

env
Kodu kopyala
VITE_API_BASE_URL=https://errorcodevrf.onrender.com
Frontend’i Lokalde Çalıştırma
bash
Kodu kopyala
cd frontend
npm install
npm run dev
Varsayılan:

text
Kodu kopyala
http://localhost:5173
🧩 Öne Çıkan Özellikler
Marka bazlı JSON dosya yapısı (LG, Samsung, Hisense, Daikin, Arçelik, Toshiba…)

Tek endpoint üzerinden tüm markalara erişim

Marka, cihaz tipi ve serbest metin (q) ile gelişmiş filtreleme

Her arıza için:

Tanım

Olası nedenler

Adım adım çözüm planı

Zorluk seviyesi (1–5)

Güvenlik uyarıları

"Sonuç bulunamadı" ekranı ve kullanıcıyı yönlendiren mesajlar

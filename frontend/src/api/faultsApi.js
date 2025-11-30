const BASE_URL = "http://localhost:3000/api/v1";

export async function fetchAllFaults() {
  const res = await fetch(`${BASE_URL}/faults`);
  if (!res.ok) {
    throw new Error("Arıza listesi alınamadı");
  }

  // backend'de { count, data } dönüyordu
  const json = await res.json();
  return json.data || json.faults || [];
}

// İstersen tek kod aramak için:
export async function searchFaultByMarkaKod(marka, kod) {
  const params = new URLSearchParams({ marka, kod });
  const res = await fetch(`${BASE_URL}/faults/search?` + params.toString());
  if (!res.ok) {
    throw new Error("Arıza kodu bulunamadı");
  }
  return res.json();
}

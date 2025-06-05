export const genres = [
  { id: 28, name: "Akcija" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Komedija" },
  { id: 53, name: "Triler" },
  { id: 14, name: "Fantazija" },
  { id: 27, name: "Horor" },
  { id: 878, name: "Naučna fantastika" },
  { id: 10749, name: "Romansa" },
  { id: 16, name: "Animacija" },
  { id: 99, name: "Dokumentarni" },
];

export const ratings = ["10", "9+", "8+", "7+", "6+"];

export const decades = ["2020", "2010", "2000", "1990", "1980", "1970", "1960"];

export const languages = [
  { code: "sr", name: "Srpski" },
  { code: "en", name: "Engleski" },
  { code: "fr", name: "Francuski" },
  { code: "ja", name: "Japanski" },
  { code: "ko", name: "Korejski" },
  { code: "de", name: "Nemački" },
  { code: "es", name: "Španski" },
  { code: "it", name: "Italijanski" },
];

// funkcija koja iz decenije napravi opseg datuma
export const getDecadeRange = (decade: string) => {
  const startYear = parseInt(decade);
  const endYear = startYear + 9;

  return {
    gte: `${startYear}-01-01`,
    lte: `${endYear}-12-31`,
  };
};

export const getCombinedDateRange = (selectedDecades: string[]) => {
  if (selectedDecades.length === 0) return null;
  const decadesRanges = selectedDecades.map(getDecadeRange);

  // minimalni početak decenije
  const minGte = decadesRanges.reduce(
    (min, curr) => (curr.gte < min ? curr.gte : min),
    "9999-12-31"
  );

  // maksimalni kraj decenije
  const maxLte = decadesRanges.reduce(
    (max, curr) => (curr.lte > max ? curr.lte : max),
    "0000-01-01"
  );
  return { gte: minGte, lte: maxLte };
};

// Helper funkcija za pravljenje query stringa iz filter objekta
export const buildQueryString = (baseParams: Record<string, string>) => {
  const queryParts = Object.entries(baseParams).map(
    ([key, value]) => `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );
  return queryParts.join("");
};

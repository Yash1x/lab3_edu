// ё → е и неразрывный дефис (U+2011) из документа → обычный, чтобы поиск был «прощающим»
function normalize(text) {
  return text.toLowerCase().replaceAll('ё', 'е').replaceAll('‑', '-');
}

function searchIndex(lecturer) {
  const parts = [lecturer.fullName, lecturer.degree ?? '', lecturer.education.university, lecturer.education.speciality];
  for (const discipline of lecturer.disciplines) {
    parts.push(discipline.title, discipline.description);
    for (const topic of discipline.topics) parts.push(topic.title);
  }
  return normalize(parts.join(' '));
}

export function filterLecturers(list, query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((lecturer) => {
    const index = searchIndex(lecturer);
    return words.every((word) => index.includes(word));
  });
}

// Первый тариф в документе у всех лекторов — «Индивидуальное занятие (60 мин)»
export const lessonPrice = (lecturer) => lecturer.tariffs[0].price;

export const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'experience', label: 'Сначала опытные' },
  { value: 'price', label: 'Сначала дешевле' },
];

export function sortLecturers(list, sort) {
  if (sort === 'experience') return [...list].sort((a, b) => b.experienceYears - a.experienceYears);
  if (sort === 'price') return [...list].sort((a, b) => lessonPrice(a) - lessonPrice(b));
  return list;
}

export function getStats(list) {
  const years = list.map((l) => l.experienceYears);
  return {
    lecturers: list.length,
    courses: list.reduce((sum, l) => sum + l.disciplines.length, 0),
    withDegree: list.filter((l) => l.degree).length,
    minYears: Math.min(...years),
    maxYears: Math.max(...years),
  };
}

export function allDisciplines(list) {
  return list.flatMap((l) => l.disciplines.map((d) => d.title));
}

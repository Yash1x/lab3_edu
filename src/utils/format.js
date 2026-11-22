export function formatPrice(value, from = false) {
  return `${from ? 'от ' : ''}${value.toLocaleString('ru-RU')} ₽`;
}

// plural(5, ['год', 'года', 'лет']) → 'лет'
export function plural(n, [one, few, many]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function initials(fullName) {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

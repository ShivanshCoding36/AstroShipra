export function getZodiacSign(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Tropical zodiac (common for UI). If you want Vedic/sidereal, swap ranges.
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  return null;
}

export function zodiacEmoji(sign) {
  switch (sign) {
    case 'Aries':
      return '♈';
    case 'Taurus':
      return '♉';
    case 'Gemini':
      return '♊';
    case 'Cancer':
      return '♋';
    case 'Leo':
      return '♌';
    case 'Virgo':
      return '♍';
    case 'Libra':
      return '♎';
    case 'Scorpio':
      return '♏';
    case 'Sagittarius':
      return '♐';
    case 'Capricorn':
      return '♑';
    case 'Aquarius':
      return '♒';
    case 'Pisces':
      return '♓';
    default:
      return '✦';
  }
}


export function numeratorTerm(number) {
  switch (number) {
    case 1:
      return 'once';
    case 2:
      return 'twice';
    case 3:
      return 'thrice';
    case 4:
      return 'four times';
    case 5:
      return 'five times';
    case 6:
      return 'six times';
    case 7:
      return 'seven times';
  }

  throw new Error(`${number} is outside the range for a numerator term`);
}

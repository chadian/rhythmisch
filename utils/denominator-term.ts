export function denominatorTerm(number) {
  switch (number) {
    case 1:
      return 'day ';
    case 2:
      return 'two days';
    case 3:
      return 'three days';
    case 4:
      return 'four days';
    case 5:
      return 'five days';
    case 6:
      return 'six days';
    case 7:
      return 'week';
    case 8:
      return 'eight days';
    case 9:
      return 'nine days';
    case 10:
      return 'ten days';
    case 11:
      return 'eleven days';
    case 12:
      return 'twelve days';
    case 13:
      return 'thirteen days';
    case 14:
      return 'two weeks';
  }

  throw new Error(`${number} is outside the range for a numerator term`);
}

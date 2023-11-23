export const getWordForm = (number, oneForm, twoForm, fiveForm) => {
  if (number % 100 >= 11 && number % 100 <= 20) {
    return fiveForm;
  }
  if (number % 10 === 1) {
    return oneForm;
  }
  if (number % 10 >= 2 && number % 10 <= 4) {
    return twoForm;
  }
  return fiveForm;
};

export const checkStringNull = (stringCheck: string) => {
  return !stringCheck.split(' ').join('').length;
}

export const checkMultiCount = (numberEl: number, stringEl: string) => {
  return numberEl > 1 ? numberEl + ' ' + stringEl + 's' : numberEl + ' ' + stringEl;
}
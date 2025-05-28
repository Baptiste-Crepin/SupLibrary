export const getCurrentDateParts = (date: Date) => {

  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
  };
};
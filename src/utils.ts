export const getCurrentDateParts = (date: Date) => {

  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
  };
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};


export const extractIdFromKeyUrl = (url: string) => {
  // type, key, ...rest
  const [_, key] = url.split('/');
  return key;
};
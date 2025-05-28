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
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString();
};

export const getLifeSpan = (birth_date?: string, death_date?: string) => {
  const birth = formatDate(birth_date);
  const death = formatDate(death_date);

  if (birth && death) {
    return `${birth} - ${death}`;
  } else if (birth) {
    return `Born ${birth}`;
  } else if (death) {
    return `Died ${death}`;
  }
  return null;
};

export const extractIdFromKeyUrl = (url: string) => {
  // type, key, ...rest
  const [_, key] = url.split('/');
  return key;
};
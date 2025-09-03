export const formatDate = (input: string | Date | { toDate: () => Date }) => {
  let jsDate: Date;

  if (typeof input === 'string') {
    jsDate = new Date(input.replace(' at ', ' '));
  } else if (input instanceof Date) {
    jsDate = input;
  } else {
    jsDate = input.toDate();
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(jsDate);
};

export const isPastDate = (date) => {

  const currentDate = new Date();

  return date < currentDate;

}
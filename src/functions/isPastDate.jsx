export const isPastDate = (date, time) => {

  const appointmentDate = new Date(date + "T" + time);
  const currentDate = new Date();

  return appointmentDate < currentDate;

}
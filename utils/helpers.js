export function getDate() {
  const currentDate = new Date();
  let date = "";

  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  date += Object.keys(months)[currentDate.getMonth()] + " ";
  date += currentDate.getDate() + ", ";
  date += currentDate.getFullYear();

  return date;
}

export function getTime() {
  const currentTime = new Date();
  let time = "";
}

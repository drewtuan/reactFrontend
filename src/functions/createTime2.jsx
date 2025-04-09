export function createTime2(timeString) {

  var hour = parseInt(timeString.split(":")[0]);
  console.log(hour);
  var minutes= parseInt(timeString.split(":")[1]);
  console.log(minutes);
  
  var timeOfDayString = "";

  if(hour < 12) {
    timeOfDayString = "AM";
  } if(hour > 12) {
    hour = hour % 12;
    timeOfDayString = "PM";
  } if(hour == 12) {
    timeOfDayString = "PM";
  }

  var minuteString = "";
  if (minutes < 10) {
    minuteString = "0" + minutes;
  } else {
    minuteString = minuteString + minutes;
  }
  
  const finalTimeString = `${hour}:${minuteString} ${timeOfDayString}`

  return finalTimeString;
}
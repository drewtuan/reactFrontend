
export function createTime(item) {

  var hour = parseInt(item.time.split(":")[0]);
  var minutes= parseInt(item.time.split(":")[1]);
  
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





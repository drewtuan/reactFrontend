/* eslint-disable react/prop-types */
import ListItem from "./ListItem"

// use filter method in js to filter based on past date and time
// eslint-disable-next-line react/prop-types
export default function ScheduleAppointmentList({appointments}) {
  return (
    <ul>
      {appointments.map((item, index) => (<ListItem key={item.id} index={index} item={item}/>))}
    </ul>
  )
}

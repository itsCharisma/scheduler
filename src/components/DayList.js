import React from "react";
import DayListItem from "components/DayListItem";



export default function DayList(props) {
      const dayObjs = props.days.map(dayObj => {
        return (
        <DayListItem
          name={dayObj.name}
          spots={dayObj.spots}
          setDay={props.setDay}
          selected={props.day === dayObj.name}
        />
        )}
        );
    return <ul> {dayObjs} </ul>
}

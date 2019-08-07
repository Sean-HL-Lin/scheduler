import React from "react";

import DayListItem from "components/DayListItem"
// import classnames from "classnames";

export default function DayList(props) {
  let result = ''
  if (props.days) {
    result = props.days.map((day) => {
      return  <DayListItem key={day.id} name={day.name} setDay={() => props.setDay(day.name)} spots={day.spots} selected={day.name === props.day} />
    })
  } else {
    result = <></>
  }
  return result

}
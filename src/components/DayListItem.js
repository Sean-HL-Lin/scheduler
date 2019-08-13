import React from "react";

import "components/DayListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {
  const dayListClass = classnames('day-list__item', {
    'day-list__item--selected' : props.selected,
    'day-list__item--full' : (props.spots === 0)
  })

  let remaining = ''
  if (props.spots === 0) {
    remaining = 'no spots'
  } else if (props.spots === 1) {
    remaining = '1 spot'
  } else {
    remaining = props.spots + ' spots'
  }

  return (
    <div 
      className={dayListClass} 
      onClick={ props.setDay}
      data-testid='day'
    >
      <h1>{props.name}</h1>
      <p>{remaining} remaining</p>
    </div>)
}
import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  //apply classes conditionally
  const classes = classnames("interviewers__item" , {
    "interviewers__item--selected" : props.selected
  })
  return (
    <li 
      className={classes}
      onClick= {props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src= {props.avatar}
        alt= {props.name}
      />
      { props.selected && props.name}
    </li>
  )
}

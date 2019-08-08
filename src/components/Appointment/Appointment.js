import "components/Appointment/styles.scss"
import React, {useEffect}from "react";

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import {useVisualMode} from 'hooks/useVisualMode'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  // const mode = useVisualMode("SHOW")
  // console.log('props.interview')
  // console.log(props.interview)
  // if (!props.interview) {
  //   mode.transition("EMPTY")
  // }
  
  // console.log(props.interview)
  
  // const mode = useVisualMode("SHOW")


  // useEffect(() => {

  //     console.log(mode)
  //     mode.transition('EMPTY31323')
  //     console.log(mode)
    
  // }, [])


  const mode = useVisualMode(props.interview ? SHOW: EMPTY)

  return (
    <>
    <Header time={props.time} />
    {mode.mode === EMPTY && <Empty />}
    {mode.mode === SHOW && (
      <Show interviewer={props.interview.interviewer} student={props.interview.student }/>
    )}
    </>
  )
}
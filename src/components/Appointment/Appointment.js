import "components/Appointment/styles.scss"
import React from "react";

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import {useVisualMode} from 'hooks/useVisualMode'
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const ERROR_DELETE = "ERROR_DELETE"
  const ERROR_SAVING = "ERROR_SAVING"

  const bookInterview = props.bookInterview;

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

  const onSave = function(name, interviewer, id) {
    if (name && interviewer) {
      const interview = {
        student:name,
        interviewer
      }
      mode.transition("SAVING")
      bookInterview(id, interview).then(() => {mode.transition("SHOW")}).catch(error => mode.transition(ERROR_SAVING, true));
    }
  }
  
  const onDelete = function () {
    mode.transition(CONFIRM)
  }

  const toDelete = function () {
    mode.transition("SAVING")
    props.cancelInterview(props.id)
      .then(() => {
      mode.transition("EMPTY")
    })
      .catch(error => mode.transition(ERROR_DELETE, true));
  }

  const onEdit = function () {
    mode.transition("CREATE")
    // editInterview
  }
  return (
    <>
    <Header time={props.time} />
    {mode.mode === EMPTY && <Empty onAdd={ () => {
      mode.transition('CREATE')
      }}/>}
    {mode.mode === SHOW && (
      <Show onEdit={onEdit} onDelete={onDelete} interviewer={props.interview.interviewer} student={props.interview.student }/>
      
    )}
    {mode.mode === CREATE && (
      <Form interviewers={props.interviewers} 
        onCancel={ () => {
          mode.transition('EMPTY')
        }}
        onSave={onSave}
        id={props.id}
        name={props.interview ? props.interview.student : null}
        interviewer={props.interview ? props.interview.interviewer : null}
        />
    )}
    {mode.mode === SAVING && (
      <Status message={'Processing'}/>
    )}

    {mode.mode === CONFIRM && (
      <Confirm 
        message={"Are you sure you would like to delete?"}
        toDelete={toDelete}
        toCancelDelete={() => {
          mode.transition("SHOW")
        }}
      />
    )}

    {mode.mode === ERROR_DELETE && (
      <Error 
        message={"Could not delete appointment"}
        onClose={mode.back}
      />
    )}

    {mode.mode === ERROR_SAVING && (
      <Error 
        message={"Could not save appointment"}
        onClose={mode.back}
      />
    )}
    </>
  )
}

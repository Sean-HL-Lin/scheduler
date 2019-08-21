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

  const mode = useVisualMode(props.interview ? SHOW: EMPTY)

  //save data to state and sql database
  const onSave = function(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student:name,
        interviewer
      }
      mode.transition("SAVING")
      bookInterview(props.id, interview).then(() => {mode.transition("SHOW")}).catch(error => {
        console.log(error)
        mode.transition(ERROR_SAVING, true)
      });
    }
  }
  
  //switch to confirm mode before delete
  const onDelete = function () {
    mode.transition(CONFIRM)
  }

  // delete data from state and sql database
  const toDelete = function () {
    mode.transition("SAVING")
    props.cancelInterview(props.id)
      .then(() => {
      mode.transition("EMPTY")
    }).catch(error => mode.transition(ERROR_DELETE, true));
  }

  //switch to form mode 
  const onEdit = function () {
    mode.transition("CREATE")
  }
  return (
    <article
     data-testid="appointment"
    >

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
          mode.back()
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
    </article>
  )
}

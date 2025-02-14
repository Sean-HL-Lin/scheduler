import "components/Appointment/styles.scss"
import React from "react";

import Button from "components/Button"


export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Are you sure you would like to delete?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.toDelete} >Confirm</Button>
        <Button danger onClick={props.toCancelDelete} >Cancel</Button>
      </section>
    </main>
  )
}
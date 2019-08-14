import React from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/Appointment"

import {useApplicationData} from "helpers/useApplicationData"

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"


export default function Application(props) {


  const {
    state,
    dispatch,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();
  

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day) ///
  const schedule = appointments.map((appointment) => {
    let interview = '';
    if (appointment.interview) {
      interview = getInterview(state, appointment.interview);
    } else {
      interview = appointment.interview;
    }
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
         <>
         <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <DayList days={state.days} day={state.day} setDay={(day) => { dispatch({type:"SET_DAY", day:day}) }} />
          <nav className="sidebar__menu" />
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
          </>

      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

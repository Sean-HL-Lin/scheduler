import React, {useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/Appointment"
import axios from "axios"
import {getAppointmentsForDay, getInterview} from "helpers/selectors"
import {useVisualMode} from 'hooks/useVisualMode'


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get(' /api/interviewers'))
    ]
    ).then((all) => {
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      
    })
  }
  , [])

  const appointments = getAppointmentsForDay(state, state.day);
  
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
          <DayList days={state.days} day={state.day} setDay={(day) => {setState(prev => ({...prev, day}))}} />
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

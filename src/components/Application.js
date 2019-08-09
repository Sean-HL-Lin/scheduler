import React from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/Appointment"

import {useApplicationData} from "helpers/useApplicationData"

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors"


export default function Application(props) {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(axios.get('/api/days')),
  //     Promise.resolve(axios.get('/api/appointments')),
  //     Promise.resolve(axios.get(' /api/interviewers'))
  //   ]
  //   ).then((all) => {
  //     setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  //   })
  // }
  // , [])

  // console.log(state)
  // const bookInterview = function (id, interview) {
  //   return axios({
  //     url: `api/appointments/${id}`,
  //     method: "put",
  //     data: {
  //       interview:interview
  //     }
  //    }).then(() => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };
  
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //    })
  //   }

  // const cancelInterview = function (id, interview) {
  //   return axios({
  //     url: `api/appointments/${id}`,
  //     method: "delete",
  //     data: {
  //     }
  //    }).then( () => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: null
  //     };
  
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  
  //     setState({
  //       ...state,
  //       appointments
  //     });
  
  //    });
  //   }


  // const editInterview = function (id, interview) {

  //   return axios({
  //     url: `api/appointments/${id}`,
  //     method: "put",
  //     data: {
  //       interview:interview
  //     }
  //    }).then( () => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: interview
  //     };
  
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //    });
  //   }

  const {
    state,
    // setState,
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
          {/* <DayList days={state.days} day={state.day} setDay={(day) => {setState(prev => ({...prev, day}))}} /> */}
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

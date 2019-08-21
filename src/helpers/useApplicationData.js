import { useEffect, useReducer } from "react";
import axios from "axios"


export function useApplicationData() {


const SET_DAY = "SET_DAY"
const SET_DAYS = "SET_DAYS"
const SET_APPLICATIONS = "SET_APPLICATIONS"
const SET_INTERVIEWERS = "SET_INTERVIEWERS"
const INIT_DATA = "INIT_DATA"

// create reducer
const reducer = function(state, action) {
  // type: "add", value: 3 }
  switch(action.type) {
    case SET_DAY: {

      return {...state, day:action.day}
    } 
    case SET_DAYS: {
      
      return {...state, days:action.days}
    }

    case SET_APPLICATIONS: {

      return {...state, appointments:action.appointments}
    }
    case SET_INTERVIEWERS: {

      return  {...state, interviewers:action.interviewers}
    }
    case INIT_DATA: {
      return {...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
    }
    default : {
      throw new Error('wrong type message')
    }

  }

}


const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})



//fetching data from database
useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get('/api/days')),
    Promise.resolve(axios.get('/api/appointments')),
    Promise.resolve(axios.get('/api/interviewers'))
  ]
  ).then((all) => {
    dispatch({type:"INIT_DATA", days:all[0].data, appointments: all[1].data, interviewers: all[2].data})
  })
}
, [])



//update and correct spots for each day
for (let stateDay of state.days) {
  const day = stateDay
  let spots = 0;
  for (let appId of day.appointments) {
    if (!state.appointments[appId].interview) {
      spots +=1
    }
  }
  day.spots = spots
}




//add new interview into database and state with 
const bookInterview = function (id, interview) {
  return axios.put(
    `api/appointments/${id}`,{interview}).then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({type: SET_APPLICATIONS, appointments:appointments})
    // setState({
    //   ...state,
    //   appointments
    // });

   })
  }

//delete interview from database and state with 
const cancelInterview = function (id, interview) {
  return axios.delete(`api/appointments/${id}`).then( () => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({type: SET_APPLICATIONS, appointments:appointments})
    // setState({
    //   ...state,
    //   appointments
    // });

   });
  }

// edit existing interview then update database and state
const editInterview = function (id, interview) {

  return axios({
    url: `api/appointments/${id}`,
    method: "put",
    data: {
      interview:interview
    }
   }).then( () => {
    const appointment = {
      ...state.appointments[id],
      interview: interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({type: SET_APPLICATIONS, appointments:appointments})
    // setState({
    //   ...state,
    //   appointments
    // });

   });
  }

  return {
    state,
    // setState,
    dispatch,
    bookInterview,
    cancelInterview,
    editInterview
  }

}
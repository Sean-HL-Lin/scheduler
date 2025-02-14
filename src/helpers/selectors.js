



// get appointments based on day
export function getAppointmentsForDay(state, day) {
  let appointmentArray = '';
  let result = []
  for (let targetday of state.days) {
    if (targetday.name === day) {
      appointmentArray = targetday.appointments
      for (let appNumber of appointmentArray) {
        result.push(state.appointments[appNumber])
      }
    }
  }
  return result
}

//get detailed interviewer informations
export function getInterview(state, interview) {

  const interviewerId = interview.interviewer
  const resultInterview = {...interview}
  resultInterview.interviewer = state.interviewers[interviewerId]
  
  return resultInterview 
}

// get interviewers based on day
export function getInterviewersForDay(state, day) {
  let result = [];
  for (let targetDay of state.days) {
    if (targetDay.name === day) {
      for (let personId of targetDay.interviewers) {
        result.push(state.interviewers[personId])
      }
    }
  }
  return result;
}
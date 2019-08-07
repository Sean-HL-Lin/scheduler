




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


export function getInterview(state, interview) {

  const interviewerId = interview.interviewer
  const resultInterview = {...interview}
  resultInterview.interviewer = state.interviewers[interviewerId]
  
  return resultInterview

  
}
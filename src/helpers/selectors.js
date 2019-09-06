export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return []
  }
  const returnedArray = selectedDay.appointments.map(id => state.appointments[id])
  return returnedArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  console.log("interview.student", interview.student);
  console.log("interview.interviewer", interview.interviewer);
  console.log(state.interviewers[interview.interviewer]);
  const interviewObj = {}
  interviewObj.student = interview.student
  interviewObj.interviewer = state.interviewers[interview.interviewer]
  return interviewObj
}

export function getInterviewersForDay(state, day) {
  let results = []
  const selectedDay = state.days.find(item => item.name === day);
  if (state.days.length === 0 || selectedDay === undefined) {
    return results
  }
  const returnedArray = selectedDay.interviewers.map(id => state.interviewers[id])
  return returnedArray;
}
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        interviewers: action.interviewers,
        appointments: action.appointments
      };
    case SET_INTERVIEW: {
      const newInterview = state["appointments"];
      const daysArray = state.days.map(day => {
        for (let appointment of day.appointments) {
          if (action.id === appointment) {
            if (action.interview && !state.appointments[action.id].interview) {
              return { ...day, spots: day.spots - 1 };
            } else if (
              !action.interview &&
              state.appointments[action.id].interview
            ) {
              return { ...day, spots: day.spots + 1 };
            }
          }
        }
        return day;
      });
      newInterview[action.id]["interview"] = action.interview;
      return { ...state, appointments: newInterview, days: daysArray };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

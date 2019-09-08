import { useEffect, useReducer } from "react";
import axios from "axios";


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, interviewers: action.interviewers, appointments: action.appointments }
    case SET_INTERVIEW: {
      const newInterview = state["appointments"];
      newInterview[action.id]["interview"] = action.interview;
      return { ...state, appointments: newInterview }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({type: SET_DAY, day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/interviewers'),
      axios.get('/api/appointments')
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, days: all[0].data, interviewers: all[1].data, appointments: all[2].data})
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put('/api/appointments/' + id, { interview })
    .then(() => {
      dispatch({type: SET_INTERVIEW, id, interview});
    });
  }

  function cancelInterview(id) {
    return axios.delete('/api/appointments/' + id)
    .then(() => {
      dispatch({type: SET_INTERVIEW, id, interview: null});
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
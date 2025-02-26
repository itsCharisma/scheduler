import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      history.pop();
    }
    history.push(mode);
    setMode(mode);
    setHistory(history);
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    } else {
      setMode(mode);
    }
  }
  return { mode, transition, back };
}

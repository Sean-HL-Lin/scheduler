import {useState} from "react";


export function useVisualMode(targetMode) {
  
  const [mode, setMode] = useState( {currentMode:targetMode, history:[targetMode]} )

  return {
    // get current mode 
    mode: mode.currentMode,

    // transfer mode
    transition: (newMode, boo = false) => {
      setMode((prev) => {

        if (boo) {
          prev.history.pop()
        }
        return {
          currentMode: newMode,
          history:[...prev.history, newMode]
        }

      })
    },

    // swith back to previous mode 
    back: () => {
      setMode((prev) => {
        let newHistory = [...prev.history]
        let newMode = '';
        if (prev.history.length > 2) {
          newMode= [...prev.history][prev.history.length-2]
          newHistory.pop()
        } else {
          newMode = [...prev.history][0]
        }

        return {
          currentMode: newMode,
          history: newHistory
        }
      }
      )
    }

}}
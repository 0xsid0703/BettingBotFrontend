import { useState, useMemo, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import HorseProfile from './pages/HorseProfile'

import { marketContext } from "./contexts/marketContext";
import { eventsContext } from "./contexts/eventsContext";
import { clockContext } from "./contexts/clockContext";

function App() {
  const [market, setMarket] = useState ('')
  const [events, setEvents] = useState ([])
  const [clock, setClock] = useState (new Date().getTime())

  const marketValue = useMemo(
    () => ({ market, setMarket }),
    [market]
  );

  const eventsValue = useMemo(
    () => ({ events, setEvents }),
    [events]
  );
  
  const clockValue = useMemo(
    () => ({ clock, setClock }),
    [clock]
  );

  useEffect(() => {
    const interval = setInterval(()=>setClock(new Date().getTime()), 15000)
    return () => clearInterval (interval)
  })

  return (
    <eventsContext.Provider value={eventsValue}>
      <marketContext.Provider value={marketValue}>
        <clockContext.Provider value={clockValue}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/horse/au/:id" element={<HorseProfile />} />
          </Routes>
        </clockContext.Provider>
      </marketContext.Provider>
    </eventsContext.Provider>
  )
}

export default App

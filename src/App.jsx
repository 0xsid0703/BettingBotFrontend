import { useState, useMemo } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'

import { marketContext } from "./contexts/marketContext";
import { eventsContext } from "./contexts/eventsContext";

function App() {
  const [market, setMarket] = useState ('')
  const [events, setEvents] = useState ([])

  const marketValue = useMemo(
    () => ({ market, setMarket }),
    [market]
  );

  const eventsValue = useMemo(
    () => ({ events, setEvents }),
    [events]
  );

  return (
    <eventsContext.Provider value={eventsValue}>
      <marketContext.Provider value={marketValue}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </marketContext.Provider>
    </eventsContext.Provider>
  )
}

export default App

import { useState, useMemo } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'

import { marketContext } from "./contexts/marketContext";

function App() {
  const [market, setMarket] = useState ('')

  const contextValue = useMemo(
    () => ({ market, setMarket }),
    [market]
  );

  return (
    <marketContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </marketContext.Provider>
  )
}

export default App

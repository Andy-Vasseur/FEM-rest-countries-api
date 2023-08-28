// Generals
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Homepage from "./pages/Homepage"
import Country from "./pages/Country"

// Components
import Navigation from "./components/Navigation"

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/countries/:alpha3code" element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

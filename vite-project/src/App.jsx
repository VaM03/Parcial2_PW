import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import QuizConfig from "./assets/pages/QuizConfig";

function App() {
  return (
      <Routes>
        <Route path="/" element={<QuizConfig />} />
      </Routes>
  );
}
export default App


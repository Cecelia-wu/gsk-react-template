import { BrowserRouter, Routes, Route } from "react-router-dom";

// 引入页面
import Home from "../pages/home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

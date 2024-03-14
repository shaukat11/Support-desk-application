// Importing browserrouter and all router and routes to make page changing possible in react
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // To use toast throughtout the Application
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

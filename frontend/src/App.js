// Importing browserrouter and all router and routes to make page changing possible in react
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // To use toast throughtout the Application
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute"; // getting the Private route
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NewTicket from "./Pages/NewTicket"; // getting the normal ticket page
import Tickets from "./Pages/Tickets";
import Ticket from "./Pages/Ticket";

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
            <Route path="/new-ticket" element={<PrivateRoute />}>
              {" "}
              {/* when creating private route use this type of nested struture*/}
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              {" "}
              {/* when creating private route use this type of nested struture*/}
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

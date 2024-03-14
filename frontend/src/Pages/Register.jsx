import { useState } from "react";
import { toast } from "react-toastify"; // to use toast we have to add toast container to the app.js file
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password Does not Match");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          {/* Name feild */}
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Your Name"
              className="form-control"
              required
            />
          </div>
          {/* Email Feild */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Your Email"
              className="form-control"
              required
            />
          </div>
          {/* Password Feild */}
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Password"
              className="form-control"
              required
            />
          </div>
          {/* Password Confirmation field */}
          <div className="form-group">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Your Password"
              className="form-control"
            />
          </div>
          {/* button */}
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;

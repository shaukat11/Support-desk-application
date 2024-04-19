import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // to use toast we have to add toast container to the app.js file
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logIn, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSucess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // using useEffect to make better user experience
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSucess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, user, isSucess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    dispatch(logIn(loginData));
  };


  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt style={{ paddingTop: "14px" }} /> Login
        </h1>
        <p>Please Login to Connect</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
          {/* button */}
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;

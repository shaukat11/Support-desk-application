import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/Tickets/ticketSlice";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";
import { isAllOf } from "@reduxjs/toolkit";

function NewTicket() {
  const { user } = useSelector((state) => state.auth); // Getting the user for the state
  const { isloading, isError, isSucess, message } = useSelector(
    (state) => state.ticket
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iphone");
  const [description, setDescription] = useState("");

  // intitializing
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirected when ticket is created
    if (isSucess) {
      dispatch(reset());
    }

    dispatch(reset());
  }, [dispatch, isError, isSucess, message]);

  const onSubmitTicketForm = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
    navigate("/tickets");
  };

  if (isloading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <br />
      <section className="heading">
        <h1>Create New Tickets</h1>
        <p>Please fill the form</p>
      </section>

      <section className="form" style={{ paddingBottom: "20px" }}>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmitTicketForm}>
          <div className="form-group">
            <label htmlFor="product">Select Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iphone">iphone</option>
              <option value="ipad">ipad</option>
              <option value="Macbook pro">Macbook pro</option>
              <option value="iMac">iMac</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description For the issue</label>
            <textarea
              type="text"
              className="form-control"
              rows="5"
              resize="disable"
              cols="3"
              required
              id="description"
              placeholder="Write Your Issue Here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;

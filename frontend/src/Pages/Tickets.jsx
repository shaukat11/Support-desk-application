import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/Tickets/ticketSlice";
import Spinner from "../Components/Spinner";
import BackButton from "../Components/BackButton";
import TicketItems from "../Components/TicketItems";
import { isAllOf } from "@reduxjs/toolkit";

function Tickets() {
  const { tickets, isloading, isSucess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSucess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSucess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isloading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <br />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Products</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItems key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;

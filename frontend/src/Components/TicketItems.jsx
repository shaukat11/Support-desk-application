import React from "react";
import { Link } from "react-router-dom";

function TicketItems({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>
        {ticket.status}
      </div>{" "}
      {/* Use of dynamic class */}
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        {" "}
        {/* Use of `` string to enter dynamci options */}
        View
      </Link>
    </div>
  );
}

export default TicketItems;

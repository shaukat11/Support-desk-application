import { useEffect, React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { getTicket, closeTicket } from "../features/Tickets/ticketSlice";
import {
  getNotes,
  reset as notesreset,
  createNotes,
} from "../features/Notes/noteSlice";
import NoteItem from "../Components/NoteItem";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maringRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  // Bringing items from redux state
  const { ticket, isloading, isSucess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const {
    notes,
    isError: noteError,
    isloading: notesisloading,
    message: noteMessage,
  } = useSelector((state) => state.notes);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  // initialzing params
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId]);

  if (isloading || notesisloading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went wrong</h3>;
  }

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const OpenModel = () => setModalIsOpen(true);
  const closeModel = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNotes({ noteText, ticketId }));
    closeModel();
  };

  if (noteError) {
    toast.error(noteMessage);
  }

  return (
    <>
      <div className="ticket-page" style={{}}>
        <header className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket ID : {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted :{" "}
            {new Date(ticket.createdAt).toLocaleString("en-US")}
          </h3>
          <hr />
          <div className="ticket-desc">
            <h2>Product Name</h2>
            <p>{ticket.product}</p>
            <br />
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </header>

        {ticket.status !== "closed" && (
          <button onClick={OpenModel} className="btn">
            <FaPlus />
            Add Notes
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModel}
          style={customStyles}
          contentLabel="Add Notes"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModel}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                required
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}

        {ticket.status !== "closed" && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
        <br />
      </div>
    </>
  );
}

export default Ticket;

import axios from "axios";

const API_URL = "/api/tickets/";

// Create Ticket
const createTicket = async (ticketData, token) => {
  // Getting the token and sending it with header as bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Sendiing the response to register the tickets
  const response = await axios.post(API_URL, ticketData, config);
  return response.data; // we are catching the respone data
};

// Get Tickets
const getTickets = async (token) => {
  // Getting the token and sending it with header as bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Getting the response from the desire url
  const response = await axios.get(API_URL, config);
  return response.data; // we are catching the respone data
};

// Get single Ticket
const getTicket = async (ticketId, token) => {
  // Getting the token and sending it with header as bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

// Close Single Ticket
const closeTicket = async (ticketId, token) => {
  // Getting the token and sending it with header as bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + ticketId,
    { status: "closed" },
    config
  );
  return response.data;
};

// exporting the function so it can bu used in ticketservice and dispatch
const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;

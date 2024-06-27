import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-black">
      <FaArrowCircleLeft /> Back
    </Link>
  );
};

export default BackButton;

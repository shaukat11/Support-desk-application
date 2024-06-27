import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // to get the user from the state to check wheather it is loged in or not

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIN] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIN(true);
    } else {
      setLoggedIN(false);
    }

    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

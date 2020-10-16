import React, { useContext } from "react";
import UsersContext from "../../../context/users/usersContext";

const Confirm = () => {
  const usersContext = useContext(UsersContext);
  const { confirm, clearConfirm, unfollowUser } = usersContext;
  return (
    <div className="confirm">
      <p>Unfollow {confirm.name}?</p>
      <div className="buttons">
        <button
          className="btn-secondary"
          onClick={() => unfollowUser(confirm.id)}
        >
          Unfollow
        </button>
        <button className="btn-primary" onClick={clearConfirm}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirm;

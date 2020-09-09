import React, { Fragment, useEffect, useContext } from "react";
import usersContext from "../../context/users/usersContext";
import Users from "./Users";

const Followers = ({ followers }) => {
  return (
    <Fragment>
      <div className="follow">{followers && <Users users={followers} />}</div>
    </Fragment>
  );
};

export default Followers;

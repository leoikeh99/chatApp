import React, { Fragment, useEffect, useContext } from "react";
import usersContext from "../../context/users/usersContext";
import Users from "./Users";

const Followers = () => {
  const UsersContext = useContext(usersContext);
  const { following, getFollowing } = UsersContext;

  useEffect(() => {
    getFollowing();
  }, [following]);
  return <Fragment>{following && <Users users={following} />}</Fragment>;
};

export default Followers;

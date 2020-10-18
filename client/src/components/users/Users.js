import React from "react";
import User from "../../components/users/User";

const Users = ({ users, _id }) => {
  return (
    <div className={users.length > 1 ? "grid" : "inline"}>
      {users.map((user) => (
        <User _id={_id} key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;

import React, { Fragment } from "react";
import User from "./User";

const Users = ({ users }) => {
  return (
    <Fragment>
      <div className="grid" style={{ margin: "20px 0px" }}>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </Fragment>
  );
};

export default Users;

import React, { Fragment } from "react";

import Users from "./Users";

const Following = ({ following }) => {
  return (
    <Fragment>
      <div className="follow">{following && <Users users={following} />}</div>
    </Fragment>
  );
};

export default Following;

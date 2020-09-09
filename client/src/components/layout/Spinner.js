import React, { Fragment } from "react";
import loader from "../../components/layout/img/loader.gif";
const Spinner = () => {
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <img src={loader} alt="" style={{ width: "100px" }} />
      </div>
    </Fragment>
  );
};

export default Spinner;

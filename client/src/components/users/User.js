import React from "react";

const User = ({ user }) => {
  const { username, bio, id } = user;
  return (
    <section className="card">
      <img
        className="avatar"
        src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg"
        alt=""
      />
      <div>
        <h5>@{username}</h5>
        <p>Bio: {bio}</p>
      </div>
    </section>
  );
};

export default User;

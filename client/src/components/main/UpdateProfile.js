import React, { Fragment, useContext, useState, useEffect } from "react";
import NavContext from "../../context/nav/navContext";
import UsersContext from "../../context/users/usersContext";

const UpdateProfile = ({ user }) => {
  const navContext = useContext(NavContext);
  const { setProfile } = navContext;

  const usersContext = useContext(UsersContext);
  const { updateProfile, updateStatus, clearUpdateStatus } = usersContext;

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    setTimeout(() => {
      clearUpdateStatus();
    }, 3000);
  }, [updateStatus]);

  const update = (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      bio,
    };
    if (username.trim() === "" && email.trim() === "" && bio.trim() === "") {
      console.log("Input cannot be empty");
    } else {
      updateProfile(data);
    }
  };

  return (
    <Fragment>
      <div className="update">
        <h2>
          <i className="fas fa-caret-left" onClick={setProfile}></i>
          Update Profile
        </h2>
        <form action="" onSubmit={update}>
          <label htmlFor="">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Bio: </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
        {updateStatus && <div className="alert3">{updateStatus}</div>}
      </div>
    </Fragment>
  );
};

export default UpdateProfile;

import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/users/usersContext";
import Spinner from "../../components/layout/Spinner";
import $ from "jquery";

const UpdateProfile = ({ user }) => {
  const usersContext = useContext(UsersContext);
  const {
    updateProfile,
    updateStatus,
    clearUpdateStatus,
    loader2,
  } = usersContext;

  const { username, email, bio } = user;
  const [update, setUpdate] = useState({ username, email, bio });
  const [avatar, setAvatar] = useState(null);

  const setData = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("data", JSON.stringify(update));
    updateProfile(formData);
  };

  useEffect(() => {
    const alert = $(".updateProfile .alert2");

    if (updateStatus) {
      alert.css("display", "block");

      setTimeout(() => {
        alert.css("animationName", "fadeOut");
      }, 2500);

      setTimeout(() => {
        alert.css("display", "none");
        alert.css("animationName", "none");
        clearUpdateStatus();
      }, 5400);
    }
    // eslint-disable-next-line
  }, [updateStatus]);

  return (
    <section className="updateProfile">
      <h2>Update Profile</h2>
      <form action="" onSubmit={submit} encType="multipart/form-data">
        <label htmlFor="">Username:</label>
        <input
          name="username"
          type="text"
          onChange={setData}
          value={update.username}
          required
        />
        <label htmlFor="">Email:</label>
        <input
          name="email"
          type="text"
          onChange={setData}
          value={update.email}
          required
        />
        <label htmlFor="">Bio:</label>
        <textarea
          name="bio"
          htmlFor=""
          onChange={setData}
          value={update.bio}
          maxLength={60}
        ></textarea>

        <input
          type="file"
          class="custom-file-input"
          name="avatar"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
        ></input>
        <label htmlFor="">{avatar ? avatar.name : "No image chosen"}</label>

        <input type="submit" value="Update" />

        <div className="alert2">
          {updateStatus && updateStatus} {loader2 && <Spinner />}
        </div>
      </form>
    </section>
  );
};

export default UpdateProfile;

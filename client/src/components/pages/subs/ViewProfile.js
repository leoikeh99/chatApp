import React, { useContext } from "react";
import UsersContext from "../../../context/users/usersContext";
import profile_pic from "../../layout/img/profilepic.png";
import moment from "moment";

const ViewProfile = () => {
  const usersContext = useContext(UsersContext);
  const { profile, clearProfile } = usersContext;
  return (
    <div className="viewProfile">
      <div onClick={clearProfile} className="close">
        X
      </div>
      {profile.avatar ? (
        <img src={`/api/auth/avatar/${profile.id}`} alt="" />
      ) : (
        <img src={profile_pic} alt="" />
      )}
      <p className="head">@{profile.username}</p>
      <p>Joined at: {moment(profile.joined).format("LL")}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
};

export default ViewProfile;

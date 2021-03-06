import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/users/usersContext";
import Users from "../../components/users/Users";
import Spinner from "../../components/layout/Spinner";

const SearchUsers = ({ user }) => {
  const [search, setSearch] = useState(null);
  const usersContext = useContext(UsersContext);
  const { users, searchUsers, clearUsers, loader } = usersContext;
  const submit = (e) => {
    e.preventDefault();
    if (search !== "") {
      searchUsers(search);
    } else {
      clearUsers();
    }
  };

  useEffect(() => {
    clearUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="search" onSubmit={submit}>
      <div className="cover">
        <form action="">
          <i className="fa fa-search" aria-hidden="true" onClick={submit}></i>
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value.trim())}
          />
        </form>
      </div>
      <div className="view">
        {users.length !== 0 && !loader ? (
          <Users _id={user._id} users={users} />
        ) : (
          <div></div>
        )}
        {loader && <Spinner />}
      </div>
    </section>
  );
};

export default SearchUsers;

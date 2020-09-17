import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/users/usersContext";
import Users from "../../components/users/Users";
import Spinner from "../../components/layout/Spinner";

const SearchUsers = () => {
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
  }, []);

  return (
    <section className="search" onSubmit={submit}>
      <div className="cover">
        <form action="">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value.trim())}
          />
        </form>
      </div>
      <div className="view">
        {users.length !== 0 && !loader ? <Users users={users} /> : <div></div>}
        {loader && <Spinner />}
      </div>
    </section>
  );
};

export default SearchUsers;

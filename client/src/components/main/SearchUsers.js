import React, { useContext, useState } from "react";
import usersContext from "../../context/users/usersContext";
import Users from "../../components/users/Users";
import Spinner from "../../components/layout/Spinner";

const SearchUsers = () => {
  const UsersContext = useContext(usersContext);
  const { loader, users, searchUsers } = UsersContext;

  const [search, setSearch] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (search !== "") {
      searchUsers(search);
    }
  };
  return (
    <section className="search">
      <div className="cover">
        <i className="fas fa-search fa-2x"></i>
        <form action="" onSubmit={submit}>
          <input
            type="text"
            placeholder="Search users..."
            onKeyUp={(e) => setSearch(e.target.value.trim())}
          />
        </form>
      </div>
      <div className="results">
        {users && !loader && <Users users={users} />}
      </div>
      {loader && <Spinner />}
    </section>
  );
};

export default SearchUsers;

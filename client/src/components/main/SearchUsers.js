import React, { useContext, useState } from "react";
import usersContext from "../../context/users/usersContext";

const SearchUsers = () => {
  const UsersContext = useContext(usersContext);
  const { users, searchUsers } = UsersContext;

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
    </section>
  );
};

export default SearchUsers;

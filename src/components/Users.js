import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log("res", response);
        setUsers(response.data);
      })
      .catch((error) => console.error("err", error));
  }, []);

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.length > 0 ? (
          users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default Users;

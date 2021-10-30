import { useEffect, useState } from "react";

import { api } from "src/api";

import { User } from "src/types/user.types";

export const UsersList = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.getUsers();

      setUsers(data);
    }

    getUsers();
  });

  return (
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

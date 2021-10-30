import { useEffect, useState } from "react";

import { api } from "src/api";

import { User } from "src/types/user.types";

import {
  List,
  ListElement,
  Title,
  Username,
  Wrapper,
} from "./UsersList.styles";

import { SearchBar } from "./components/SearchBar";

export const UsersList = () => {
  const [users, setUsers] = useState<Array<Partial<User>>>([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.getUsers();

      const filteredData = data.map(({ id, name, username }) => ({
        id,
        name,
        username,
      }));

      setUsers(filteredData);
    }

    getUsers();
  });

  return (
    <Wrapper>
      <Title>Users list</Title>
      <SearchBar />
      <List>
        {users.map(({ id, name, username }) => (
          <ListElement key={id}>
            {name}
            <Username>{`@${username}`}</Username>
          </ListElement>
        ))}
      </List>
    </Wrapper>
  );
};
